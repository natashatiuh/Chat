import joi from 'joi'

export const deleteMessageSchema = joi.object({
    messageId: joi.string().required(),
    chatId: joi.string().required()
})