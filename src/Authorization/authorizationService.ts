import { authRepository } from "./authorizationRepository";

class AuthorizationService {
    async signUpUser(nickName: string, phoneNumber: string, code: number) {
        const expectedCode = await authRepository.getExpectedCodeByPhoneNumber(phoneNumber)
        if (expectedCode !== code) return

        await authRepository.createUser(nickName, phoneNumber)
    }

    async sendCode(userPhoneNumber: string) {
        const verificationCode = await authRepository.generateAuthCode()
        await authRepository.setCodeByPhoneNumber(userPhoneNumber, verificationCode)
        await authRepository.sendCodeInSms(userPhoneNumber, verificationCode)
    }
}

export const authorizationService = new AuthorizationService
