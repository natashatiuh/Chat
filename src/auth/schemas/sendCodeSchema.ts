import joi from 'joi';

export const sendCodeSchema = joi.object({
    userPhoneNumber: joi.string().required()
})