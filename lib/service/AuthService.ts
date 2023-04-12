import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import User from '../type/User'
import axios from '~/lib/axios'
import { users } from '~/store'

export interface SendPhoneRegisterDTO {
  phoneNumber: string
  email: string
  password: string
}

export interface SendCodeVerificationDTO extends SendPhoneRegisterDTO {
  code: string
}

export const registerUser = ({
  phoneNumber,
  email,
  password,
}: SendPhoneRegisterDTO) => {
  return axios.post(
    'auth/register',
    {
      phoneNumber,
      email,
      password,
    },
    { withCredentials: true }
  )
}

export const login = (email: string, password: string) => {
  return axios.post('/auth/login/email', { email, password })
}

export const resetPassword = (password: string) => {
  return axios.post('/auth/reset-password', { password })
}

export const forgotPassword = (email: string) => {
  return axios.post('/auth/forgot-password', { email })
}

export const magic = (magic: string) => {
  const config: AxiosAuthRefreshRequestConfig = {
    skipAuthRefresh: true,
  }
  return axios.get('/auth/magic-link/' + magic, config)
}

export const sendVerifyMessage = () => {
  return axios.post('auth/send-code')
}

export const verifyPhoneCode = (code: string) => {
  const promise = axios.post('auth/verify-code', {
    code,
  })

  return promise
}

export const logOut = () => {
  return axios.post('auth/logout')
}

export interface IsLoggedInInterface {
  loggedIn: boolean
  user?: User
}

export const isLoggedIn = async (): Promise<IsLoggedInInterface> => {
  try {
    const response = await axios.get('auth/is-logged-in')

    return {
      loggedIn: response.data.status === 'OK',
      user: response.data.user,
    }
  } catch (err) {
    return {
      loggedIn: false,
    }
  }
}
