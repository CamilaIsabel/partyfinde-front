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
      <p class="mt-8 text-xl md:text-3xl">Change password</p>
      <form
        class="py-6 px-8 max-w-md mx-auto my-20 sm:(mt-20 mb-12) text-left flex flex-col sheet gap-4"
        @submit.prevent="submit"
      >
        <TextBox v-model="newPassword" type="password"
          >New password</TextBox
        >
        <TextBox
          v-model="repeatNewPassword"
          type="password"
          :validation="validatePasswordsAreEqual"
          >Repeat new password</TextBox
        >

        <Button
          :disabled="!canSubmit || isRequesting"
          class="bg-green-500 hover:shadow-green-500 sm:mt-4"
          @click="submit"
        >
          Change password
        </Button>
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
import { resetPassword } from '~/lib/service/AuthService'
import TextBox from '@/components/forms/TextBox.vue'
import Button from '@/components/Button.vue'
import FormMixin from '~/lib/mixin/Form'
import RequestMixin from '~/lib/mixin/RequestMixin'
import { validatePasswordLength } from '~/lib/validation/validation'
import Toaster from '~/lib/toaster/Toaster'

@Component({
  components: {
    Benefits,
    NeonText,
    TextBox,
    Button,
  },
})
export default class ChangePassword extends Mixins(FormMixin, RequestMixin) {
  newPassword: string = ''
  repeatNewPassword: string = ''

  submit() {
    if (!this.allFieldsAreValid()) return
    this.resetPassword()
  }

  resetPassword() {
    this.request = resetPassword(this.newPassword)
    Toaster.promise(this.request, {
      loading: 'Cambiando contraseña',
      success: 'Has cambiado tu contraseña',
      error: ({ response }) => response.data.message,
      width: 250,
    })
  }

  requestCompletedSuccessfully() {
    this.$router.push('/profile')
  }

  validatePassword(value: string) {
    return validatePasswordLength(value)
  }

  validatePasswordsAreEqual() {
    return (
      this.newPassword === this.repeatNewPassword ||
      'Las contraseñas no coinciden'
    )
  }
}
</script>
