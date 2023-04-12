import createPersistedState from 'vuex-persistedstate'
import { users } from '~/store'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({ paths: 'users' })(store)
    users.updateRankReference()
  })
}
