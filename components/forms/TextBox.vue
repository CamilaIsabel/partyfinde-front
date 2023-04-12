<template>
  <label class="pb-4 relative">
    <span><slot /></span>
    <input
      :disabled="disabled"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :max="max"
      :maxlength="maxlength"
      class="
        text-sm
        bg-gray-500 bg-opacity-15
        outline-transparent
        focus:bg-opacity-30
        transition-all
        duration-300
        rounded-lg
        px-2
        py-1
        w-full
        leading-loose
      "
      @input="triggerChange"
      @paste="sanitizePaste"
    />
    <p v-if="error" class="h-4 absolute text-sm text-red-400">{{ error }}</p>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import ValidableMixin from '~/lib/mixin/Validable'

@Component({})
export default class TextArea extends Mixins(ValidableMixin) {
  @Prop({ required: true })
  type!: string

  @Prop({ default: '' })
  value!: string

  @Prop({ default: false })
  disabled!: boolean

  @Prop({ default: '' })
  max!: number

  @Prop({ default: '' })
  maxlength!: number

  @Prop({ default: '' })
  placeholder!: ''

  @Prop({ default: null })
  validCharacters!: string

  triggerChange(e: any) {
    e.target.value = this.sanitizeText(e.target.value)

    this.$emit('input', e.target.value)
    this.resetValidation()
  }

  get regExp(): RegExp {
    return new RegExp('[^' + this.validCharacters + ']', 'ig')
  }

  sanitizeText(value = ''): string {
    if (!value || !this.validCharacters) return value

    let a = value
    a = a.replaceAll(this.regExp, '')

    return a
  }

  sanitizePaste(e: any): void {
    if (!this.validCharacters) return
    const clipboard = e.clipboardData
    if (!clipboard) return

    const text = clipboard.getData('text')

    if (!text) return

    const canPaste = !this.regExp.test(text)
    if (canPaste) return

    clipboard.setData('text', '')
    e.preventDefault()
  }

  get isNotEmpty() {
    return Boolean(this.value)
  }
}
</script>
