import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserlistModule from '~/store/userlist'
import UserModule from '~/store/users'

let users: UserModule
let userlist: UserlistModule

function initialiseStores(store: Store<any>): void {
  users = getModule(UserModule, store)
  userlist = getModule(UserlistModule, store)
}

export { initialiseStores, users, userlist }
