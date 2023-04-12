<template>
  <div :class="relative ? 'relative' : ''">
    <transition
      enter-active-class="transition-all ease-out"
      leave-active-class="transition-all ease-out"
      enter-class="opacity-0 translate-y-2"
      leave-to-class="opacity-0 translate-y-2"
      leave-class="opacity-100 translate-y-0"
    >
      <div
        v-if="shouldShow"
        class="bg-[#2B2C2D] rounded-md shadow-5xl px-3 py-1 text-center transform absolute bottom-full left-1/2 -translate-x-1/2 uppercase mx-auto mb-4 z-50"
      >
        <p class="font-bold text-xs leading-5"><slot name="text" /></p>
      </div>
    </transition>
    <div @mouseenter="setVisible(true)" @mouseleave="setVisible(false)">
      <slot name="element"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Tooltip extends Vue {
  @Prop({ default: () => false })
  alwaysShow!: boolean

  @Prop({ default: () => true })
  relative!: boolean

  show: boolean = false

  setVisible(value: boolean) {
    this.show = value
  }

  get shouldShow() {
    return this.alwaysShow || this.show
  }
}
</script>
