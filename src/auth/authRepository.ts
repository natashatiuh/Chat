import { v4 } from "uuid"
import { pool } from "../common/mysql.connection"
import twilio from 'twilio'
import jwt from 'jsonwebtoken'

class AuthorizationRepository {
    authorizationCode: Record<string, number> = {}

    async getExpectedCodeByPhoneNumber(phoneNumber: string) {
        return this.authorizationCode[phoneNumber]
    }

    async setCodeByPhoneNumber(phoneNumber: string, code: number) {
        this.authorizationCode[phoneNumber] = code
    }

    async deleteUsedCode(phoneNumber: string) {
        delete this.authorizationCode[phoneNumber]
    }

    async createUser(nickName: string, phoneNumber: string) {
        const connection = await pool.getConnection()

        const query = `
            INSERT INTO users (id, nickName, phoneNumber) 
            VALUES (?, ?, ?)
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

    async getUser(nickName: string, phoneNumber: string) {
        const connection = await pool.getConnection()
        
        const query = `
        SELECT * FROM users WHERE nickname = ? AND phoneNumber = ?
        `
        const params = [nickName, phoneNumber]

        const [rows] = await connection.query(query, params)
        return rows[0]
    }

    async generateToken(userId: string) {
        const secretKey: any = process.env.SECRET_KEY
        const token = await jwt.sign({userId}, secretKey)
        return token
    }

    async deleteUser(userId: string) {
        const connection = await pool.getConnection()

        const query = `
        DELETE FROM users
        WHERE id = ?
        `
        const params = [ userId ]

        const [rows]: any = await connection.query(query, params)
        console.log(rows)
        if (rows.affectedRows > 0) return true

        return false
    }

    async getAllUsers() {
        const connection = await pool.getConnection()

        const query = `
        SELECT * FROM users
        `
        const [rows] = await connection.query(query)
        console.log(rows)
        return rows;
    }
}

export const authRepository = new AuthorizationRepository()
