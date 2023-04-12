<template>
  <div
    class="py-6 px-8 mx-auto max-w-max min-w-min text-left flex flex-row flex-wrap sheet gap-4 details-form"
  >
    <ProfileForm
      ref="profileForm"
      class="flex-col flex md:grid md:grid-cols-2 w-full"
      :show-name="true"
      @submit="register"
    >
      Register
    </ProfileForm>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import ProfileForm from '../../../components/profile/edit/ProfileForm.vue'
import TextBox from '@/components/forms/TextBox.vue'
import Button from '@/components/Button.vue'

import TextArea from '~/components/forms/TextArea.vue'
import AuthMixin from '~/lib/mixin/AuthMixin'
import RequestMixin from '~/lib/mixin/RequestMixin'
import UsersService from '~/lib/service/UsersService'
import Toaster from '~/lib/toaster/Toaster'
import { users } from '~/store'
import { AuthStep } from '~/store/users'

@Component({
  components: { TextBox, Button, TextArea, ProfileForm },
})
export default class RegisterSecondStep extends Mixins(
  AuthMixin,
  RequestMixin
) {
  email: string = ''
  password: string = ''

  register() {
    this.request = UsersService.updateProfile(this.getProfileFormData())
    Toaster.promise(this.request, {
      loading: 'Updating profile',
      success: 'Updated profile',
      width: 280,
      error: ({ response }) =>
        Array.isArray(response.data.message)
          ? response.data.message[0]
          : response.data.message,
    })
  }

  requestCompletedSuccessfully() {
    users.setAuthStep(AuthStep.REGISTERED)
    this.$router.push('/register/upload-your-photos')
  }

  requestFailed(error: any) {
    console.error(error)
  }

  get title() {
    return 'We are almost done'
  }

  get profileForm(): ProfileForm {
    return this.$refs.profileForm as ProfileForm
  }

  getProfileFormData() {
    return this.profileForm.profile
  }

  created() {
    this.$parent.$emit('updateTitle', this.title)
  }
}
</script>

<style>
.details-form .description {
  grid-column: 1 / 3;
}

.details-form .checkboxes {
  grid-column: 1 / 3;
  justify-content: start !important;
  gap: 2rem;
}

.details-form .hide-profile {
  display: none;
}
</style>
