import express from 'express'
import { authorizationService } from './authService'

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

router.post('/', async (req, res) => {
    try {
        const { nickName, phoneNumber, code } = req.body as any
        await authorizationService.signUpUser(nickName, phoneNumber, code)
        res.send('The user was signed up!')
    } catch(error) {
        console.log(error)
        res.send(error)
    }
})

