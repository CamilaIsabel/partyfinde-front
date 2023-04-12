<template>
  <vue-final-modal
    v-slot="{ params }"
    :value="value"
    attach="body"
    :click-to-close="true"
    overlay-class="w-screen h-full bg-black bg-opacity-70 overflow-x-hidden"
    classes="flex justify-center h-full items-center overflow-x-hidden fixed"
    content-class="max-h-full max-w-screen modal-content grid place-items-center"
    :esc-to-close="true"
    @click-outside="hide"
    @cancel="hide"
    @opened="opened"
  >
    <div class="modal__content relative">
      <button
        class="absolute right-0 top-0 mr-4 mt-4 z-100 cursor-pointer z-6000"
        @click="hide"
      >
        <img
          src="@/assets/icons/close.svg"
          alt="Close"
          class="block w-5 h-5"
        />
      </button>
      <slot :params="params"></slot>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  disablePageScroll,
  enablePageScroll,
  getScrollState,
} from 'scroll-lock'

@Component({
  model: { prop: 'value', event: 'change' },
})
export default class Modal extends Vue {
  @Prop({ default: false })
  value!: boolean

  hide() {
    this.$emit('close')
    this.$emit('change', false)
  }

  shouldDisableScrollWhenClosing: boolean = false

  getOpenedModal() {
    const modal = [...document.getElementsByClassName('vfm__container')].find(
      (elem) => window.getComputedStyle(elem).display !== 'none'
    )

    return modal
  }

  opened() {
    this.shouldDisableScrollWhenClosing = !getScrollState()
    if (!this.shouldDisableScrollWhenClosing) return

    enablePageScroll()

    const elem = this.getOpenedModal()

    // Disable scrolling
    disablePageScroll(elem)
  }
}
</script>

<style>
.overflow-hidden {
  overflow: hidden;
}
.overflow-auto {
  overflow: auto;
}

.vfm--absolute {
  position: fixed !important;
}
</style>
