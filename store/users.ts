import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import {
  logOut,
  sendVerifyMessage,
  verifyPhoneCode,
} from '@/lib/service/AuthService'
import User from '~/lib/type/User'
import { getById } from '~/lib/rank/Rank'
import { clearToken } from '~/lib/axios'

export enum AuthStep {
  UNREGISTERED = 'unregistered',
  PENDING_DETAILS = 'pending-details',
  // AWAITING_CODE = 'awaiting-code',
  VERIFIED = 'verified',
  REGISTERED = 'registered',
}

@Module({
  name: 'users',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  currentUser: User | null = null
  phoneVerificationLastSentAt: Date | null = null
  phoneCodeHasBeenSent: boolean = false
  private currentAuthStep: AuthStep | null = null
  accessToken = null
  disclaimerModalisShow: boolean = true

  currentPosition: number = 0

  get authStep() {
    if (this.currentUser && !this.currentAuthStep) {
      if (this.currentUser.verified) return AuthStep.VERIFIED
      if (!this.currentUser.age) return AuthStep.PENDING_DETAILS
      return AuthStep.VERIFIED
    }
    return this.currentAuthStep
  }

  @Mutation
  setDisclaimer() {
    this.disclaimerModalisShow = false
  }

  get showDisclaimerModal() {
    return this.disclaimerModalisShow
  }

  @Mutation
  setAuthStep(authStep: AuthStep | null) {
    this.currentAuthStep = authStep
  }

  @Mutation
  updateCurrentPosition(position: number) {
    this.currentPosition = position
  }

  get isLoggedIn(): boolean {
    return Boolean(this.currentUser)
  }

  @Mutation
  setAccessToken(accessToken: any) {
    this.accessToken = accessToken
  }

  @Mutation
  setCurrentUser(user: User | null) {
    if (!user) {
      this.currentUser = null
      return
    }
    const rankName = String(user.rank)
    this.currentUser = user
    this.currentUser.rank = getById(rankName)
  }

  @Mutation
  updateRankReference() {
    if (!this.currentUser) return
    if (!this.currentUser.rank) return

    if (this.currentUser.rank instanceof String) {
      const rankName = String(this.currentUser.rank)
      this.currentUser.rank = getById(rankName)
    } else {
      this.currentUser.rank = getById(this.currentUser.rank.name)
    }
  }

  @Mutation
  updateUserData(user: Partial<User>) {
    this.currentUser = { ...this.currentUser, ...user }
  }

  @Mutation
  setPhoneVerificationLastSentAt() {
    this.phoneVerificationLastSentAt = new Date()
    this.phoneCodeHasBeenSent = true
  }

  @Action({ rawError: true })
  logOut() {
    logOut().finally(() => {
      this.context.commit('setCurrentUser', null)
      this.context.commit('setAuthStep', null)
      this.context.commit('setAccessToken', null)
      clearToken()
    })
  }

  @Action({ rawError: true })
  logIn(user: User) {
    this.setCurrentUser(user)
  }

  @Mutation
  updateBoostAmount(amount: number) {
    this.currentUser.remainingBoosts = amount
  }

  @Mutation
  setBoostAvailableIn(time: number) {
    this.currentUser.boostAvailableIn = time
  }

  // @Action({ rawError: true })
  // sendPhoneCode() {
  //   if (!this.isLoggedIn)
  //     return Promise.reject(new Error('Debe iniciar sesión.'))
  //   const promise = sendVerifyMessage()
  //   return promise.then(this.setPhoneVerificationLastSentAt).then(() => {
  //     this.setAuthStep(AuthStep.AWAITING_CODE)
  //   })
  // }

  @Action({ rawError: true })
  verifyPhoneCode(code: string) {
    return verifyPhoneCode(code)
  }
}
