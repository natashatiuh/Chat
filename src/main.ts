import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { router as authorizationRouter } from './auth/authController'
import { router as chatsRouter } from './chats/chatsController'
import { router as messagesRouter } from './messages/messagesController'


async function main() {
    const app = express()

    app.use(express.json())

    app.use('/authorization', authorizationRouter)
    app.use('/chats', chatsRouter)
    app.use('/messages', messagesRouter)
    
    const port = 3000;
    
    app.listen(port, () => console.log(`Server listen on port ${port}`))
}


main()
