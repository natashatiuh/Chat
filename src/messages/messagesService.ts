import { messagesRepository } from "./messagesRepository";

class MessagesService {
    async sendMessage(chatId: string, senderId: string, recipientId: string, message: string) {
        const dateAndTime = await messagesRepository.getCurrentDate()
        const newMessage = await messagesRepository.addMessage(chatId, senderId, recipientId, message, dateAndTime)
        await messagesRepository.changeChatInfo(chatId, message)
        return newMessage;
    }

    async deleteMessage(messageId: string, senderId: string, chatId: string) {
        const deletedMessage = await messagesRepository.deleteSenderMessage(messageId, senderId, chatId)
        return deletedMessage
    }

    async editMessage(messageId: string, senderId: string, message: string) {
        const editedMessage = await messagesRepository.editSenderMessage(messageId, senderId, message)
        return editedMessage
    }
}

export const messagesService = new MessagesService