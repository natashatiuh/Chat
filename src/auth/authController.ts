import express from 'express'
import { authorizationService } from './authService'
import { auth } from '../common/auth'
import { validation } from '../common/validation'
import { sendCodeSchema } from './schemas/sendCodeSchema'
import { signUpUserSchema } from './schemas/signUpUserSchema'
import { signInUserSchema } from './schemas/signInUserSchema'
import { deleteUserAccountSchema } from './schemas/deleteUserAccountSchema'

export const router = express.Router()

router.post('/send-code', validation(sendCodeSchema), async (req, res) => {
    try {
        const userPhoneNumber = req.body.userPhoneNumber
        await authorizationService.sendCode(userPhoneNumber)
        res.send('Code send')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/', validation(signUpUserSchema), async (req, res) => {
    try {
        const { nickName, phoneNumber, code } = req.body as any
        const token = await authorizationService.signUpUser(nickName, phoneNumber, code)
        if(token) {
            res.send(`The user ${nickName} was authorized successfully! The token is ${token}`)
        } else {
            res.send("The user does NOT exist!")
        }
    } catch(error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/', validation(signInUserSchema), async (req, res) => {
    try {
        const { nickName, phoneNumber, code } = req.body as any
        const token = await authorizationService.signInUser(nickName, phoneNumber, code)
        console.log(token)
        if(token) {
            res.send(`The user ${nickName} was authorized successfully! The token is ${token}`)
        } else {
            res.send('The user does NOT exist!')
        }
    } catch(error) {
        console.log(error)
        res.send(error)
    }
})

router.delete('/', auth(), validation(deleteUserAccountSchema), async (req, res) => {
    try {
        const deletedUser = await authorizationService.deleteUserAccount(req.userId)
        if (deletedUser === true) {
            res.send('The user was DELETED!')
        } else {
            res.send('The user does NOT exist!')
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/all-users', async (req, res) => {
    try {
        const users = await authorizationService.getUsers()
        res.send(users)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
