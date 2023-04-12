<template>
  <no-ssr>
    <div class="min-h-screen"></div>
  </no-ssr>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { magic } from '~/lib/service/AuthService'
import Toaster from '~/lib/toaster/Toaster'
import { users } from '~/store'
import { getErrorMessage } from '~/utils/error-utilts'

@Component({})
export default class MagicLinkPage extends Vue {
  mounted() {
    const magicToken = this.$route.params.magic
    if (!magicToken) {
      Toaster.error('Invalido')
      this.$router.push('/')
      return
    }

    users.setAccessToken(magic)
    const promise = magic(magicToken)
    Toaster.promise(promise, {
      error: ({ response }) => getErrorMessage(response),
      loading: 'Cargando',
      success: 'Iniciaste sesión',
    })

    promise.then(({ data }) => {
      users.logIn(data.user)
      this.$router.push('/profile/change-password')
    })
  }
}
</script>
