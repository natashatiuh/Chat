import express from 'express'
import { authorizationService } from './authorizationService'

export const router = express.Router()

router.post('/send-code', async (req, res) => {
    try {
        const userPhoneNumber = req.body.userPhoneNumber
        await authorizationService.sendCode(userPhoneNumber)
        res.send('Code send')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})