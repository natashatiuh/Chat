import joi from 'joi'

export const signInUserSchema = joi.object({
    nickName: joi.string().required(),
    phoneNumber: joi.string().required(),
    code: joi.number().required()
})