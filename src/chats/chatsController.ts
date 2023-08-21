import express from 'express'
import { auth } from '../common/auth'
import { validation } from '../common/validation'
import { createChatSchema } from './schemas/createChatSchema'
import { chatsService } from './chatsService'
import { deleteChatSchema } from './schemas/deleteChatSchema'


export const router = express.Router()

router.post('/', auth(), validation(createChatSchema), async (req, res) => {
    try {
        const { recipientId } = req.body as any
        const newChat = await chatsService.createChat(req.userId, recipientId)
        if(newChat === true) {
            res.send('The chat was started!')
        } else {
            res.send('The chat is already EXIST!')
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}) 

router.delete('/', auth(), validation(deleteChatSchema), async (req, res) => {
    try {
        const { chatId } = req.body as any
        const chat = await chatsService.deleteChat(chatId, req.userId)
        if(chat === true) {
            res.send('The chat was successfully DELETED!')
        } else {
            res.send('The chat does NOT exist!')
        } 
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/', auth(), async (req, res) => {
    try{
        const userChats = await chatsService.getUserChats(req.userId)
        res.send(userChats)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

