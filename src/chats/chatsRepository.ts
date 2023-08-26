import { pool } from "../common/mysql.connection"
import { v4 } from "uuid"

class ChatRepository {
    async addChat(creatorId: string, recipientId: string) {
        const connection = await pool.getConnection()

        const query = `
        INSERT INTO chats (id, chatCreatorId, recipientId, messagesAmount, lastMessage)
        VALUES (?, ?, ?, ?, ?)
        `
        const params = [v4(), creatorId, recipientId, 0, '-' ]

        await connection.query(query, params)
    }

    async checkChat(creatorId: string, recipientId: string) {
        const connection = await pool.getConnection()

        const query = `
        SELECT * FROM chats 
        WHERE chatCreatorId = ? AND recipientId = ?
        `
        const params = [creatorId, recipientId] 

        const [chat] = await connection.query(query, params)
        return chat[0]
    }

    async deleteChat(chatId: string, userId: string) {
        const connection = await pool.getConnection()

        const query = `
        DELETE FROM chats
        WHERE id = ? AND chatCreatorId = ?
        `
        const params = [chatId, userId]

        const [rows]: any = await connection.query(query, params)
        if(rows.affectedRows > 0) return true

        return false
    }

    async getUserChats(userId: string) {
        const connection = await pool.getConnection()

        const query = `
        SELECT * FROM chats 
        WHERE chatCreatorId = ? OR recipientId = ?
        `
        const params = [userId, userId]

        const [chats] = await connection.query(query, params)
        return chats
    }
}

export const chatRepository = new ChatRepository