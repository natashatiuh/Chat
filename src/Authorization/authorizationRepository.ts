import { v4 } from "uuid"
import { pool } from "../connection/mysql.connection"
import twilio from 'twilio'

class AuthorizationRepository {
    authorizationCode: Record<string, number> = {}

    async getExpectedCodeByPhoneNumber(phoneNumber: string) {
        return this.authorizationCode[phoneNumber]
    }

    async setCodeByPhoneNumber(phoneNumber: string, code: number) {
        this.authorizationCode[phoneNumber] = code
    }

    async createUser(nickName: string, phoneNumber: string) {
        const connection = await pool.getConnection()

        const query = `
            INSERT INTO users (id, nickName, phoneNumber) 
            VALUES (?, ?, ?, ?)
        `
        const params = [v4(), nickName, phoneNumber]

        await connection.query(query, params)
    }

    async sendCodeInSms(phoneNumber: string, code: number) {
        const accountSid = process.env.TWILIO_SID
        const accountToken = process.env.TWILIO_TOKEN
        const client = twilio(accountSid, accountToken)

        await client.messages.create({
            body: `Your authorization code is ${code}.`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        })
    }

    async generateAuthCode() {
        return Math.floor(1000 + Math.random() * 9000)
    }
}

export const authRepository = new AuthorizationRepository()
