import joi from 'joi'

export const sendMessageSchema = joi.object({
    chatId: joi.string().required(),
    recipientId: joi.string().required(),
    message: joi.string().required()
})