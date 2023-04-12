import UsersService from '~/lib/service/UsersService'
import { users } from '~/store'

export default () => {
  window.onNuxtReady(attemptUpdateProfile)
}

const attemptUpdateProfile = async () => {
  if (!users.isLoggedIn) return

  let attempts = 0

  while (attempts < 3) {
    try {
      const profileResponse = await UsersService.getProfile()
      const user = profileResponse.data.user
      users.setCurrentUser(user)
      return
    } catch (err) {
      attempts++
    }
  }

  users.logOut()
}
