import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { router as authorizationRouter } from './auth/authController'


async function main() {
    const app = express()

    app.use(express.json())

    app.use('/authorization', authorizationRouter)
    
    const port = 3000;
    
    app.listen(port, () => console.log(`Server listen on port ${port}`))
}


main()
