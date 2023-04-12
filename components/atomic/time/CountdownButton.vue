<template>
  <button
    :type="type"
    :class="
      buttonIsOnCooldown
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
      relative
    "
    @click.prevent="trigger"
  >
    <slot />
    <span
      v-if="remainingSeconds > 0"
      class="ml-2 text-white text-opacity-75 font-normal"
    >
      {{ formattedRemainingSeconds }}
    </span>
  </button>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import Button from '~/components/Button.vue'
import CountdownTimerMixin from '~/lib/mixin/CountdownTimerMixin'

@Component({})
export default class CountdownTimerButton extends Mixins(
  Button,
  CountdownTimerMixin
) {
  @Prop({ required: true })
  timerValue!: number

  get buttonIsOnCooldown() {
    return this.disabled || this.remainingSeconds > 0
  }

  trigger() {
    if (this.buttonIsOnCooldown) return
    this.$emit('click')
  }

  get timer() {
    return this.timerValue
  }
}
</script>
