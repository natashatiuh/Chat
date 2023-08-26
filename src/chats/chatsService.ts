import { chatRepository } from "./chatsRepository";

class ChatsService {
    async createChat(creatorId: string, recipientId: string) {
        const isChatExist = await chatRepository.checkChat(creatorId, recipientId)
        if (!isChatExist) {
            await chatRepository.addChat(creatorId, recipientId)
            return true
        } else {
            return false
        }
    }

    async deleteChat(chatId: string, userId: string) {
        const deletedChat = await chatRepository.deleteChat(chatId, userId)
        console.log(deletedChat)
        return deletedChat
    }

    async getUserChats(userId: string) {
        const userChats = await chatRepository.getUserChats(userId)
        return userChats
    }
}

export const chatsService = new ChatsService