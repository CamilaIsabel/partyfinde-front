import axios from 'axios'
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh'

import { users } from '~/store'

let baseURL: string = process.env.PARTYFINDER_API
const getBaseURL = () => {
  return baseURL
}

axios.defaults.withCredentials = true
const instance = axios.create({ baseURL, withCredentials: true })

export const updateBaseURL = (newBaseURL: string) => {
  instance.defaults.baseURL = newBaseURL
  baseURL = newBaseURL
}

const getToken = () => {
  return users.accessToken
}

export const clearToken = () => {
  users.setAccessToken('')
}

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios
    .get('/auth/refresh_token', { baseURL: getBaseURL() })
    .then((tokenRefreshResponse) => {
      const token = tokenRefreshResponse.data.accessToken

      users.setAccessToken(token)
      failedRequest.response.config.headers.Authorization = 'Bearer ' + token
      return Promise.resolve()
    })
    .catch(() => failedRequest)

// Obtain the fresh token each time the function is called
function getAccessToken() {
  return users.accessToken
}

// Use interceptor to inject the token to requests
axios.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getAccessToken()}`
  return request
})

// Instantiate the interceptor
createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config

    if (
      (request as AxiosAuthRefreshRequestConfig) &&
      (request as AxiosAuthRefreshRequestConfig).skipAuthRefresh
    )
      throw error

    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      error.response.headers['token-expired']
    ) {
      return await instance(request)
    }

    throw error
  }
)

// Use interceptor to inject the token to requests
instance.interceptors.request.use((request) => {
  if (
    (request as AxiosAuthRefreshRequestConfig) &&
    (request as AxiosAuthRefreshRequestConfig).skipAuthRefresh
  )
    return request

  request.headers.Authorization = `Bearer ${getToken()}`
  return request
})

export default instance
