import joi from 'joi'

export const deleteUserAccountSchema = joi.object({
    userId: joi.string().required
})