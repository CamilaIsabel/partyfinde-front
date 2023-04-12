<template>
  <button
    ref="openerButton"
    class="relative focus:outline-transparent dropdown-opener"
    @focus="openDropdown"
    @mousedown="toggleDropdown"
    @blur="closeDropdown"
  >
    <slot name="opener" />
    <transition
      enter-active-class="transition-all ease-out"
      leave-active-class="transition-all ease-out"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
      leave-class="opacity-100"
    >
      <div
        v-if="show"
        ref="dropdownBody"
        :class="positioningClass"
        class="transform absolute shadow rounded bg-blue-700 bg-opacity-40 py-3 min-w-max flex flex-col gap-1 cursor-default"
      >
        <slot name="items"></slot>
      </div>
    </transition>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

export enum DropdownDirection {
  DOWN = 'down',
  UP = 'up',
  LEFT = 'left',
  RIGHT = 'right',
}

@Component({})
export default class Dropdown extends Vue {
  dropdownIsToggled: boolean = false

  @Prop({ default: false })
  alwaysShow!: boolean

  @Prop({ default: false })
  closeOnClick!: boolean

  @Prop({ default: () => DropdownDirection.DOWN })
  direction!: DropdownDirection

  @Prop({ default: () => DropdownDirection.RIGHT })
  attach!: DropdownDirection

  get show() {
    if (this.alwaysShow) return true

    return this.dropdownIsToggled
  }

  openDropdownListener(event: any) {
    if (event.dropdown === this) return

    this.dropdownIsToggled = false
  }

  mounted() {
    document.addEventListener('open-dropdown', this.openDropdownListener)
    this.$router.afterEach(() => {
      this.dropdownIsToggled = false
    })
  }

  destroyed() {
    document.removeEventListener('open-dropdown', this.openDropdownListener)
  }

  openDropdown(event: any) {
    if (event.target === this.$refs.openerButton) return
    this.dropdownIsToggled = true
    this.triggerDropdownEvent()
  }

  get dropdownBody(): HTMLElement | null {
    if (!this.show) return null
    return this.$refs.dropdownBody as HTMLElement
  }

  get positioningClass() {
    const attachment =
      this.attach === DropdownDirection.RIGHT ? 'right-0' : 'left-0'

    const horizontalDirection =
      this.direction === DropdownDirection.DOWN
        ? '-bottom-2 translate-y-full'
        : '-top-2 -translate-y-full'

    return attachment + ' ' + horizontalDirection
  }

  toggleDropdown(event: any) {
    event.stopPropagation()

    if (this.show && this.dropdownBody?.contains(event.target)) return
    this.dropdownIsToggled = !this.dropdownIsToggled

    if (this.dropdownIsToggled) {
      this.triggerDropdownEvent()
    }
  }

  triggerDropdownEvent() {
    const openEvent = new Event('open-dropdown') as any
    openEvent.dropdown = this
    document.dispatchEvent(openEvent)
  }

  closeDropdown(event: any) {
    if (event.target.contains(event.relatedTarget) && !this.closeOnClick) return
    if (event.relatedTarget === this.$refs.dropdownBody) return
    this.dropdownIsToggled = false
    event.stopPropagation()
  }
}
</script>

<style>
.dropdown-opener {
  -webkit-tap-highlight-color: transparent;
}
</style>
