import joi from 'joi'

export const createChatSchema = joi.object({
    recipientId: joi.string().required()
})