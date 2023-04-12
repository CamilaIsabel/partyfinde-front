<template>
  <form
    class="py-6 px-8 md:px-8 max-w-md mx-auto text-left flex flex-col sheet gap-4"
    @submit.prevent="submit"
  >
    <TextBox v-model="email" :validation="validateEmail" type="email">
      Email address
    </TextBox>
    <TextBox v-model="password" :validation="validatePassword" type="password">
      Password
    </TextBox>
    <PhoneNumberInput v-model="phoneNumber">Phone</PhoneNumberInput>

    <Button
      :disabled="!canSubmit || isRequesting"
      class="bg-green-500 hover:shadow-green-500 sm:mt-4"
      @click="register"
    >
      Sign up
    </Button>
    <span class="text-sm text-gray-300 mt-4">
      You have an account?
      <nuxt-link to="/login" class="underline">Sign in</nuxt-link>
    </span>
  </form>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import TextBox from '@/components/forms/TextBox.vue'
import Button from '@/components/Button.vue'

import PhoneNumberInput from '@/components/forms/PhoneNumberInput.vue'
import FormMixin from '~/lib/mixin/Form'
import AuthMixin from '~/lib/mixin/AuthMixin'

import {
  validateEmail,
  validatePasswordLength,
} from '~/lib/validation/validation'
import RequestMixin from '~/lib/mixin/RequestMixin'

@Component({
  components: { TextBox, Button, PhoneNumberInput },
})
export default class RegisterFirstStep extends Mixins(
  FormMixin,
  AuthMixin,
  RequestMixin
) {
  email: string = ''
  phoneNumber: string = ''
  password: string = ''

  submit() {
    this.register()
  }

  register() {
    if (!this.allFieldsAreValid()) return

    this.request = this.registerUser(
      this.email,
      this.phoneNumber,
      this.password
    )
  }

  requestCompletedSuccessfully() {
    this.$router.push('/register/details')
  }

  requestFailed(error: any) {
    console.error(error)
  }

  validateEmail(value: string) {
    return validateEmail(value)
  }

  validatePassword(value: string) {
    return validatePasswordLength(value)
  }

  get title() {
    return 'Sign up to partyfinder'
  }

  mounted() {
    this.$parent.$emit('updateTitle', this.title)
  }
}
</script>
