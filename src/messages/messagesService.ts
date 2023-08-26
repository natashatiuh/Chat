import { messagesRepository } from "./messagesRepository";

class MessagesService {
    async sendMessage(chatId: string, senderId: string, recipientId: string, message: string) {
        const dateAndTime = await messagesRepository.getCurrentDate()
        const newMessage = await messagesRepository.addMessage(chatId, senderId, recipientId, message, dateAndTime)
        await messagesRepository.changeChatInfo(chatId, message)
        return newMessage;
    }
}

export const messagesService = new MessagesService