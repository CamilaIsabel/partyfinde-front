<template>
  <Modal :value="show" @close="closePhotoModal">
    <div
      class="py-2 h-screen flex items-center justify-center"
      @click.self="closePhotoModal"
    >
      <div
        class="bottom-0 absolute w-full flex items-center justify-center gap-4 bottom-0 pb-4 z-2000"
        @click.self="closePhotoModal"
      >
        <button
          title="Anterior"
          class="bg-black bg-opacity-20 transition-all hover:bg-opacity-40 p-3 rounded-full flex items-center justify-center"
          @click="previousImage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="transform rotate-180 opacity-50"
            width="48"
            height="48"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              d="M9 6l6 6l-6 6"
            ></path>
          </svg>
        </button>
        <button
          title="Siguiente"
          class="bg-black bg-opacity-20 transition-all hover:bg-opacity-40 p-3 rounded-full flex items-center justify-center"
          @click="nextImage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="opacity-50"
            width="48"
            height="48"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              d="M9 6l6 6l-6 6"
            ></path>
          </svg>
        </button>
      </div>
      <div class="max-w-screen pointer-events-none w-6xl relative">
        <div
          class="flex items-start justify-center h-[calc(100vh-12rem)] pointer-events-none relative"
          @click.self="closePhotoModal"
        >
          <slot />
          <div class="bg-black w-full h-full flex items-center justify-center">
            <img
              v-for="(photo, idx) in photoURLs"
              :key="idx"
              :src="photo"
              class="h-full w-auto max-w-full object-contain max-w-screen block z-5000 pointer-events-auto"
              :class="
                idx === selectedIndex ? 'relative ' : 'absolute opacity-0'
              "
            />
          </div>
        </div>
      </div>
    </div>
    <GlobalEvents @keyup.left="previousImage" @keyup.right="nextImage" />
  </Modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GlobalEvents from 'vue-global-events'
import Modal from '@/components/layout/Modal.vue'

@Component({ components: { Modal, GlobalEvents } })
export default class PhotoSlider extends Vue {
  @Prop({ default: () => [] })
  photoURLs: string[]

  @Prop({ default: 0 })
  selectedIndex: number

  @Prop({ default: false })
  show: boolean

  get selectedPhoto() {
    return this.photoURLs[this.selectedIndex]
  }

  closePhotoModal(event: Event) {
    if (event) {
      event.stopImmediatePropagation()
    }
    this.$emit('close')
  }

  previousImage() {
    let index = this.photoURLs.indexOf(this.selectedPhoto)
    if (index === 0) {
      index = this.photoURLs.length - 1
    } else {
      index--
    }
    this.updateIndex(index)
  }

  nextImage() {
    let index = this.photoURLs.indexOf(this.selectedPhoto)
    if (index === this.photoURLs.length - 1) {
      index = 0
    } else {
      index++
    }
    this.updateIndex(index)
  }

  updateIndex(index: number) {
    this.$emit('update-index', index)
  }
}
</script>
