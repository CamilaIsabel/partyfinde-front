<template>
  <div class="min-h-screen flex flex-col">
    <div class="pt-12 md:pt-16 text-center relative z-10">
      <div class="flex justify-center">
        <div class="flex items-center">
          <img
            class="bg-red h-8 mr-5 "
            src="~/assets/icons/party-icon.svg"
            alt="Party icon"
          />
          <neon-text active class="text-2xl">partyfinder</neon-text>
        </div>
      </div>
      <p class="mt-8 text-xl md:text-3xl">Sign in to partyfinder</p>
      <form
        class="py-6 px-8 max-w-md mx-auto my-20 sm:(mt-20 mb-12) text-left flex flex-col sheet gap-4"
        @submit.prevent="submit"
      >
        <TextBox v-model="email" type="text" :validation="validateEmail"
          >Email address</TextBox
        >
        <TextBox
          v-model="password"
          type="password"
          :validation="validatePassword"
          >Password</TextBox
        >
        <Button
          :disabled="!canSubmit || isRequesting"
          class="bg-green-500 hover:shadow-green-500 sm:mt-4"
          @click="login"
        >
          Sign in
        </Button>
        <span class="text-sm text-gray-300 mt-4">
          Don't have an account?
          <nuxt-link to="/register" class="underline">Sign up</nuxt-link>
        </span>
        <nuxt-link
          to="/reset-password"
          class="text-sm text-blue-500 hover:underline"
        >
          Forget your password?
        </nuxt-link>
        <input type="submit" style="display: none" />
      </form>
    </div>
    <Benefits class="mt-auto pb-4 text-center relative z-10" />
    <img
      src="@/assets/layout-elements/party-background.webp"
      alt="Background"
      class="absolute left-0 top-0 h-full w-full object-cover object-center pointer-events-none select-none z-0 opacity-10"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import Benefits from '@/components/layout/Benefits.vue'
import NeonText from '@/components/layout/NeonText.vue'

import TextBox from '@/components/forms/TextBox.vue'
import Button from '@/components/Button.vue'
import FormMixin from '~/lib/mixin/Form'
import RequestMixin from '~/lib/mixin/RequestMixin'
import {
  validateEmail,
  validatePasswordLength,
} from '~/lib/validation/validation'
import { login } from '~/lib/service/AuthService'
import Toaster from '~/lib/toaster/Toaster'
import { users } from '~/store'
import { getErrorMessage } from '~/utils/error-utilts'

@Component({
  components: {
    Benefits,
    NeonText,
    TextBox,
    Button,
  },
})
export default class Login extends Mixins(FormMixin, RequestMixin) {
  email: string = ''
  password: string = ''

  submit() {
    this.login()
  }

  login() {
    this.request = login(this.email, this.password)
    Toaster.promise(this.request, {
      loading: 'Iniciando sesión',
      success: 'Has iniciado sesión',
      error: ({ response }) => getErrorMessage(response),
      width: 250,
    })
    this.request.then(({ data }) => {
      users.logIn(data.user)
      this.$router.push('/profile')
    })
  }

  validateEmail(value: string) {
    return validateEmail(value)
  }

  validatePassword(value: string) {
    return validatePasswordLength(value)
  }
}
</script>
