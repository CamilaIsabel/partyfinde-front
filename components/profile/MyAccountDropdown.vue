<template>
  <Dropdown :direction="direction" :attach="attach">
    <template #opener>
      <div class="flex items-center">
        <span v-if="loggedIn" class="mr-2 text-md">Account</span>
        <img
          v-if="!loggedIn"
          src="~/assets/icons/account.svg"
          class="w-5 h-5"
          alt="Account"
        />
        <div
          v-else
          class="bg-gradient-to-br from-rose-600 to-pink-400 rounded-full w-8 h-8 flex-shrink-0"
        >
          <img
            v-if="profilePhoto"
            class="object-cover w-full h-full rounded-full cursor-pointer border-transparent border-1"
            :src="profilePhoto"
          />
        </div>
      </div>
    </template>
    <template v-if="loggedIn" #items>
      <DropdownItem link="/profile">Profile</DropdownItem>
      <DropdownItem link="/profile/change-password">
        Change password
      </DropdownItem>
      <DropdownItem @click="logOut">Sign out</DropdownItem>
    </template>
    <template v-else #items>
      <DropdownItem link="/login">Sign in</DropdownItem>
      <DropdownItem link="/register">Sign up</DropdownItem>
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Dropdown from '../layout/dropdown/Dropdown.vue'
import DropdownItem from '../layout/dropdown/DropdownItem.vue'
import { users } from '~/store'

@Component({ components: { Dropdown, DropdownItem } })
export default class MyAccountDropdown extends Vue {
  @Prop({ default: 'down' })
  direction!: string

  @Prop({ default: 'right' })
  attach!: string

  get loggedIn() {
    return users.isLoggedIn
  }

  get profilePhoto() {
    return users.currentUser.profilePhoto
  }

  async logOut() {
    await this.$router.push('/')

    users.logOut()
  }
}
</script>
