<template>
  <div></div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'
import { users } from '~/store'
import { AuthStep } from '~/store/users'

@Component({})
export default class AuthGuard extends Vue {
  mounted() {
    this.checkAuthRoute()
  }

  get authStep() {
    return users.authStep
  }

  get route() {
    return this.$route.fullPath
  }

  @Watch('authStep')
  @Watch('route')
  checkAuthRoute() {
    if (this.$route.fullPath.includes('register')) return
    if (!users.isLoggedIn) return
    if (this.authStep === AuthStep.VERIFIED) return

    this.$router.push('/register')
  }
}
</script>
