import joi from 'joi';

export const signUpUserSchema = joi.object({
    nickName: joi.string().required(),
    phoneNumber: joi.string().required(),
    code: joi.number().required()
})