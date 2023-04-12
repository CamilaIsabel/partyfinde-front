import Vue from 'vue'
import Component from 'vue-class-component'
import { secondsBetween } from '../misc/DateUtils'
import Toaster from '../toaster/Toaster'
import { registerUser } from '../service/AuthService'
import User from '../type/User'
import { users } from '~/store'
import { AuthStep } from '~/store/users'

const authStepRoutes: Map<AuthStep, string> = new Map()
// authStepRoutes.set(AuthStep.AWAITING_CODE, '/register/verify-phone-code')
authStepRoutes.set(AuthStep.PENDING_DETAILS, '/register/details')
authStepRoutes.set(AuthStep.REGISTERED, '/register/upload-your-photos')
authStepRoutes.set(AuthStep.VERIFIED, '/')

@Component
export default class AuthMixin extends Vue {
  get phoneVerificationLastSentAt() {
    return new Date(users.phoneVerificationLastSentAt ?? new Date())
  }

  get codeHasBeenSent() {
    return users.phoneCodeHasBeenSent
  }

  get secondsSincePhoneVerificationWasSent() {
    return 60 - secondsBetween(this.phoneVerificationLastSentAt, new Date())
  }

  created() {
    const currentAuthStep = users.authStep || AuthStep.UNREGISTERED

    const route = authStepRoutes.get(currentAuthStep) || '/register'

    this.$router.push(route)
  }

  private showSendCodeToast(promise: Promise<any>) {
    Toaster.promise(promise, {
      error: () => 'Error al enviar código',
      success: () => 'Código enviado',
      loading: 'Enviando código',
      width: 250,
    })
  }

  private showRegisterToast(promise: Promise<any>) {
    Toaster.promise(promise, {
      error: (err) => err?.response?.data?.message || 'Error inesperado',
      success: 'Usuario registrado',
      width: 250,
    })
  }

  registerUser(email: string, phoneNumber: string, password: string) {
    const promise = registerUser({ phoneNumber, email, password })
    this.showRegisterToast(promise)

    promise.then((response) => {
      const user: User = response.data.user
      if (!user) throw new Error('User not found')

      users.logIn(user)
      users.setAuthStep(AuthStep.PENDING_DETAILS)
    })

    return promise
  }

  // sendPhoneCode() {
  //   const promise = users.sendPhoneCode()
  //   this.showSendCodeToast(promise)
  //   return promise
  // }

  // resendPhoneCode() {
  //   const promise = users.sendPhoneCode()
  //   this.showSendCodeToast(promise)
  //   return promise
  // }

  verifyPhoneCode(code: string) {
    const promise = users.verifyPhoneCode(code)

    promise.then(() => {
      users.setAuthStep(AuthStep.VERIFIED)
    })

    return promise
  }
}
