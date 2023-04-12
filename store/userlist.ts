import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import Story from '~/lib/story/Story'
import User from '~/lib/type/User'

@Module({
  name: 'userlist',
  stateFactory: true,
  namespaced: true,
})
export default class UserlistModule extends VuexModule {
  userList: User[] = []
  stories: Story[] = []
  currentId: string = ''
  usersAvailable: boolean = false

  get currentUser(): Partial<User> {
    return this.userList.find((user) => user.uuid === this.currentId) ?? {}
  }

  @Mutation
  setUserList(userList: User[]) {
    this.userList = userList
    this.usersAvailable = true
  }

  @Mutation
  setCurrentId(id: string) {
    this.currentId = id
  }

  @Mutation
  setStories(stories: Story[]) {
    this.stories = stories
  }
}
