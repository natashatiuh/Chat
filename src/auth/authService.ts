import { authRepository } from "./authRepository";

class AuthorizationService {
    async signUpUser(nickName: string, phoneNumber: string, code: number) {
        const expectedCode = await authRepository.getExpectedCodeByPhoneNumber(phoneNumber)
        if (expectedCode !== code) return

        await authRepository.createUser(nickName, phoneNumber)
        const user = await authRepository.getUser(nickName, phoneNumber)
        if(user) {
            const token = await authRepository.generateToken(user.id)
            await authRepository.deleteUsedCode(phoneNumber)
            return token
        } else {
            return
        }
    }

    async sendCode(userPhoneNumber: string) {
        const verificationCode = await authRepository.generateAuthCode()
        await authRepository.setCodeByPhoneNumber(userPhoneNumber, verificationCode)
        await authRepository.sendCodeInSms(userPhoneNumber, verificationCode)
    }

    async signInUser(nickName: string, phoneNumber: string, code: number) {
        const expectedCode = await authRepository.getExpectedCodeByPhoneNumber(phoneNumber)
        console.log(expectedCode)
        if(expectedCode != code) return

        const user = await authRepository.getUser(nickName, phoneNumber)
        if (user) {
            const token = await authRepository.generateToken(user.id)
            await authRepository.deleteUsedCode(phoneNumber)
            return token
        } else {
            return
        }
    }

    async deleteUserAccount(userId: string) {
        const deletedUser = await authRepository.deleteUser(userId)
        return deletedUser
    }

    async getUsers() {
        const users = await authRepository.getAllUsers()
        return users;
    }
}

export const authorizationService = new AuthorizationService
