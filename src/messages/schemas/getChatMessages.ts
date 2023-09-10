import joi from 'joi'

export const getChatMessagesSchema = joi.object({
    chatId: joi.string().required()
})