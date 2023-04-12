<template>
  <button
    :type="type"
    :class="
      disabled
        ? 'bg-opacity-50 cursor-default'
        : 'hover:shadow-4xl cursor-pointer'
    "
    class="
      font-bold
      text-center
      py-4
      leading-none
      uppercase
      tracking-widest
      rounded-lg
      ease-linear
      transition-all
      duration-250
      focus:outline-transparent
    "
    @click="trigger"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Button extends Vue {
  @Prop({ default: 'button' })
  type!: string

  @Prop({ default: false })
  disabled!: boolean

  trigger() {
    if (this.disabled) return
    this.$emit('click')
  }
}
</script>
