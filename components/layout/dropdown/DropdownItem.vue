<template>
  <component
    :is="isLink ? 'nuxt-link' : 'button'"
    v-bind="linkProps"
    :class="
      unstyled
        ? ''
        : `pointer
      text-white
      font-bold
      text-sm
      flex
      px-3
      gap-2
      items-center
      transition-colors
      focus:outline-none
      hover:(bg-white
      bg-opacity-15)`
    "
    @click="emitClick"
  >
    <img v-if="hasIcon" :src="icon" class="block w-8 h-8" />
    <span class="font-bold tracking-wide"><slot /></span>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class DropdownItem extends Vue {
  @Prop({ default: '' })
  link!: string

  @Prop({ default: '' })
  icon!: string

  @Prop({ default: false })
  unstyled!: boolean

  get isLink(): boolean {
    return !!this.link
  }

  get linkProps() {
    if (!this.isLink) return {}

    return { to: this.link }
  }

  get hasIcon(): boolean {
    return !!this.icon
  }

  emitClick(event: any) {
    this.$emit('click', event)
  }
}
</script>
