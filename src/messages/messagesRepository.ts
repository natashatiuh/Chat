import { pool } from "../common/mysql.connection";
import { v4 } from "uuid";

class MessagesRepository {
    async getCurrentDate() {
        const date = new Date();

        const dateOfPublishing = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        const timeOfPublishing = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        const dateTime: any = dateOfPublishing+ ' ' +timeOfPublishing

        return dateTime
    }

    async addMessage(chatId: string, senderId: string, recipientId: string, message: string, dateTime: string) {
        const connection = await pool.getConnection()

        const query = `
        INSERT INTO messages (id, chatId, senderId, recipientId, message, dateAndTime)
        VALUES (?, ?, ?, ?, ?, ?)
        `
        const params = [v4(), chatId, senderId, recipientId, message, dateTime]

        const [newMessage]: any = await connection.query(query, params)
        console.log(newMessage)
        if(newMessage.affectedRows > 0) return true

        return false
    }

    async getLastMessage(userId: string) {
        const connection = await pool.getConnection()

        const query = `
        SELECT * FROM messages 
        WHERE senderId = ? OR recipientId = ?
        ORDER BY dateAndTime DESC
        `
        const params = [userId, userId]

        const [messages] = await connection.query(query, params)
        return messages[0].message
    }

    async getChatInfo(chatId: string) {
        const connection = await pool.getConnection()

        const query = `
        SELECT * FROM chats
        WHERE id = ?
        `
        const params = [chatId]

        const [chatInfo] = await connection.query(query, params)
        return chatInfo[0].messagesAmount
    }

    async changeChatInfo(chatId: string, message: string) {
        const connection = await pool.getConnection()

        const query = `
        UPDATE chats 
        SET lastMessage = ?, messagesAmount = messagesAmount + 1
        WHERE id = ?
        `
        const params = [message, chatId]

        const [updatedChatInfo]: any = await connection.query(query, params)
        if(updatedChatInfo.affectedRows > 0) return true

        return false
    }

    async checkLastMessage(messageId: string) {
        const connection = await pool.getConnection()
        
        const query = `
        SELECT chats.lastMessage, messages.id, messages.message
        FROM chats
        INNER JOIN messages 
        ON chats.id = messages.chatId
        WHERE messages.id = ? AND chats.lastMessage = messages.message
        `
        const params = [messageId]
        
        const [chatLastMessage] = await connection.query(query, params)

        if (chatLastMessage) return true

        return false
    }

    async updateChatLastMessage(newLastMessage: string, chatId: string) {
        const connection = await pool.getConnection()

        const query = `
        UPDATE chats 
        SET lastMessage = ?
        WHERE id = ? 
        `
        const params = [newLastMessage, chatId]

        const [updatedChatInfo]: any = await connection.query(query, params)
        if (updatedChatInfo.affectedRows > 0) return true

        return false
    }

    async deleteSenderMessage(messageId: string, senderId: string, chatId: string) {
        const connection = await pool.getConnection()
        const isLastMessageTrue = await this.checkLastMessage(messageId)
        const message = 'NO MESSAGES'

        const query = `
        DELETE FROM messages 
        WHERE id = ? AND senderId = ?
        `
        const params = [messageId, senderId]


        const [deletedMessage]: any = await connection.query(query, params)
        console.log(deletedMessage)

        const newLastMessage = await this.getLastMessage(senderId)
        if(newLastMessage == true) {
            if (isLastMessageTrue === true) {
            await this.updateChatLastMessage(newLastMessage, chatId)
        }
        } else if (!newLastMessage) {
            if (isLastMessageTrue === true) {
                await this.updateChatLastMessage(message, chatId)
            }
        }

        if(deletedMessage.affectedRows > 0) return true

        return false
    }

    async editSenderMessage(messageId: string, senderId: string, message: string) {
        const connection = await pool.getConnection()

        const query = `
        UPDATE messages 
        SET message = ?, edited = 'TRUE'
        WHERE id = ? AND senderId = ?
        `
        const params = [message, messageId, senderId]

        const [editedMessage]: any = await connection.query(query, params)
        if (editedMessage.affectedRows > 0) return true

        return false
    }

}

export const messagesRepository = new MessagesRepository