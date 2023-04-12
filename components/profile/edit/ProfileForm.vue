<template>
  <form class="text-left gap-4" @submit.prevent="submit">
    <TextBox v-model="profile.name" type="text" class="name">
      Event name
    </TextBox>
    <div class="flex gap-2 flex-col sm:flex-row">
      <TextBox
        v-model="phoneNumber"
        type="text"
        :disabled="true"
        :class="'opacity-60'"
        class="phone flex-grow"
      >
        Phone
      </TextBox>
      <TextBox
        v-if="canAddInstagram"
        v-model="profile.instagram"
        type="text"
        class="instagram sm:w-2/3"
      >
        Instagram
      </TextBox>
    </div>
    <TextBox v-model="profile.schedule" type="text" class="schedule">
      Date & time
    </TextBox>
    <div class="flex gap-4 flex-col sm:flex-row">
      <TextBox
        v-model.number="profile.age"
        :max="100"
        type="number"
        class="age pb-4"
        :validation="validateAge"
      >
        Minimum age to attend
      </TextBox>
      <SelectIdentity
        v-model="profile.type"
        class="flex-grow sm:w-2/3 pb-4"
      >
        Event type
      </SelectIdentity>
    </div>
    <SelectRegion v-model="profile.region" class="region pb-4">
      Region
    </SelectRegion>
    <SelectProvince
      v-model="profile.province"
      :region="profile.region"
      class="provinces pb-4"
    >
      Province
    </SelectProvince>
    <TextArea
      v-model="profile.description"
      maxlength="650"
      class="description pb-4"
    >
      Description
    </TextArea>

    <div class="flex justify-between checkboxes">
      <div>
        <div class="flex items-center">
          <h2 class="text-md font-semibold mr-2">Location</h2>
        </div>
        <label class="flex items-center">
          <input
            v-model="profile.clubLocation"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">Club</span>
        </label>
        <label class="flex items-center">
          <input
            v-model="profile.houseLocation"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">House</span>
        </label>
        <label class="flex items-center">
          <input
            v-model="profile.anotherPlaceLocation"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">Another place</span>
        </label>
      </div>

      <div>
        <h2 class="text-md font-semibold mb-2">Contact</h2>
        <label class="flex items-center">
          <input
            v-model="profile.whatsappAvailable"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">Whatsapp</span>
        </label>
        <label class="flex items-center">
          <input
            v-model="profile.phoneCallAvailable"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="ml-2">Call</span>
        </label>
      </div>
    </div>

    <div class="hide-profile">
      <h2 class="text-md font-semibold mb-2">Hide profile</h2>
      <label class="flex items-center">
        <input v-model="hidden" type="checkbox" class="form-checkbox" />
        <span class="ml-2">Hidden</span>
      </label>
    </div>
    <div v-if="!hideButton" class="col-span-full flex">
      <Button
        :disabled="!canSubmit"
        class="bg-green-500 hover:shadow-green-500 sm:mt-4 w-full mx-auto max-w-sm"
        @click="submit"
      >
        <slot />
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import SelectIdentity from '../../forms/SelectIdentity.vue'
import SelectRegion from '../../forms/SelectRegion.vue'
import TextBox from '@/components/forms/TextBox.vue'
import TextArea from '@/components/forms/TextArea.vue'
import { UpdateProfileDTO } from '~/lib/service/UsersService'
import { users } from '~/store'
import { validateAge } from '~/lib/validation/validation'
import FormMixin from '~/lib/mixin/Form'
import { Ranks } from '~/lib/rank/Rank'
import SelectProvince from '~/components/forms/SelectProvince.vue'
import User from '~/lib/type/User'

@Component({
  components: {
    TextBox,
    TextArea,
    SelectIdentity,
    SelectProvince,
    SelectRegion,
  },
})
export default class ProfileForm extends Mixins(FormMixin) {

  @Prop({ default: false })
  hideButton!: boolean

  hidden: boolean = false

  disableIdentity: boolean = false

  phoneNumber: string | undefined = ''

  profile: UpdateProfileDTO = {
    name: '',
    region: '',
    province: '',
    schedule: '',
    houseLocation: undefined,
    anotherPlaceLocation: undefined,
    clubLocation: undefined,
    phoneCallAvailable: undefined,
    whatsappAvailable: undefined,
    instagramAvailable: undefined,
    instagram: '',
    description: '',
    age: 18,
    type: 'P',
    isActive: true,
  }

  get canAddInstagram() {
    const rank = users.currentUser?.rank
    if (!rank) return false

    return rank.isEqualOrHigherThan(Ranks.GOLD)
  }

  updateProfileType(val: string) {
    this.profile.type = val
  }

  created() {
    const currentUser = users.currentUser
    this.updateProfileData(currentUser)
  }

  get currentUser() {
    return users.currentUser
  }

  @Watch('currentUser')
  updateProfileData(val: User) {
    if (!val) return
    this.profile = { ...val }
    this.hidden = !this.profile.isActive
    this.disableIdentity = !!this.currentUser.type
    this.phoneNumber = this.currentUser.phoneNumber
  }

  validateAge(age: number) {
    return validateAge(age)
  }

  @Watch('profile')
  watchProfileIsActive() {
    this.profile.isActive = !this.hidden
  }

  submit() {
    if (!this.allFieldsAreValid()) return
    this.watchProfileIsActive()
    this.$emit('submit', this.profile)
  }
}
</script>
