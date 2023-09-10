import joi from 'joi'

export const editedMessageSchema = joi.object({
    messageId: joi.string().required(),
    message: joi.string().required()
})