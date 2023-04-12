<template>
  <label>
    <span><slot /></span>
    <textarea
      :value="value"
      class="
        leading-4
        text-sm
        h-30
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
    />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import ValidableMixin from '~/lib/mixin/Validable'

@Component({})
export default class TextArea extends Mixins(ValidableMixin) {
  @Prop({ default: '' })
  value!: string

  triggerChange(e: any) {
    this.$emit('input', e.target.value)
    this.resetValidation()
  }

  get isNotEmpty() {
    return Boolean(this.value)
  }
}
</script>
