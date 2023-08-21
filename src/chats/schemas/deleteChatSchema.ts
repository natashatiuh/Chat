import joi from 'joi'

export const deleteChatSchema = joi.object({
    chatId: joi.string().required()
})