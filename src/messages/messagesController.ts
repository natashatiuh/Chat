import { messagesService } from "./messagesService";
import { auth } from "../common/auth";
import { validation } from "../common/validation";
import { sendMessageSchema } from "./schemas/sendMessageSchema";
import express from 'express';

export const router = express.Router()

router.post('/', auth(), validation(sendMessageSchema), async (req, res) => {
    try {
        const { chatId, recipientId, message } = req.body as any
        const newMessage = await messagesService.sendMessage(chatId, req.userId, recipientId, message);
        if (newMessage === true) {
            res.send('The message was sent SUCCESSFULLY!')
        } else {
            res.send('The message was NOT sent!')
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}) 