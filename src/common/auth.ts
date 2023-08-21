import jwt from 'jsonwebtoken'

export const auth = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization
            if (!token) throw new Error('Unauthorized!')

            const secretKey: any = process.env.SECRET_KEY
            const tokenInfo: any = jwt.verify(token, secretKey)
            const userId = tokenInfo.userId
            console.log(tokenInfo)

            req.userId = userId
        } catch (error) {
            console.log(error)
            res.send('Unauthorized!')
        }
        next()
    }
}