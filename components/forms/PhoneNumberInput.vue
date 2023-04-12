<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-2 items-center">
      <SelectCountry :value="country" class="pb-4" @select="changeCountry">
        Country
      </SelectCountry>
      <TextBox
        type="tel"
        valid-characters="0-9 "
        :value="phoneNumber"
        class=""
        @input="textInput"
      >
        <slot />
      </TextBox>
    </div>

    <p v-if="showErrors" class="-mt-4 text-red-400 text-sm">
      Please enter a valid phone number.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { phone } from 'phone'
import TextBox from './TextBox.vue'
import SelectCountry from './SelectCountry.vue'
import ValidableMixin from '~/lib/mixin/Validable'
import { AvailableCountry } from '~/lib/country/Country'

@Component({ components: { TextBox, SelectCountry } })
export default class PhoneNumberInput extends Mixins(ValidableMixin) {
  @Prop({ default: '' })
  value!: string

  phoneNumber: string = ''

  country: AvailableCountry | null = null

  textInput(val: string) {
    this.phoneNumber = val
    this.resetValidation()
    this.emitChange()
  }

  changeCountry(val: AvailableCountry) {
    this.country = val
    this.resetValidation()
    this.emitChange()
  }

  emitChange() {
    this.$emit('input', this.fullPhoneNumber)
  }

  get phone() {
    return phone(this.country?.dialCode + this.phoneNumber)
  }

  get isValid() {
    return this.phone.isValid
  }

  get isNotEmpty() {
    return Boolean(this.phoneNumber && this.country?.dialCode)
  }

  get fullPhoneNumber() {
    return this.phone.phoneNumber ?? this.country?.dialCode + this.phoneNumber
  }
}
</script>
