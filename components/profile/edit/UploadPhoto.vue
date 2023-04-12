<template>
  <div
    :style="optionalBackgroundStyles"
    :class="photo ? 'cursor-grab' : 'cursor-pointer bg-black bg-opacity-10'"
    class="w-25 h-35 md:w-28 md:h-38 lg:w-32 lg:h-42 rounded-xl text-center relative z-10 border-black border-opacity-30 border-1"
  >
    <label class="w-full h-full relative block cursor-pointer">
      <input
        ref="input"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        @change="onFileChange"
      />
      <div
        class="corner-button absolute -bottom-5px -right-5px cursor-pointer"
        @click="clickedButton"
      >
        <i
          class="block w-6 h-6 transform transition-transform"
          :class="photo ? 'text-red-500 rotate-45' : 'text-sky-900'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M27 13.5C27 6.04416 20.9558 0 13.5 0C6.04416 0 0 6.04416 0 13.5C0 20.9558 6.04416 27 13.5 27C20.9558 27 27 20.9558 27 13.5Z"
              fill="currentColor"
            />
            <path
              d="M13.5 6V21M21 13.5L6 13.5"
              stroke="#E0E7FF"
              stroke-width="3.46154"
              stroke-linecap="round"
            />
          </svg>
        </i>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Photo from '~/lib/misc/Photo'
import Loader from '~/components/atomic/icon/Loader.vue'
import Toaster from '~/lib/toaster/Toaster'

@Component({ components: { Loader } })
export default class UploadPhoto extends Vue {
  @Prop({ required: true, type: Number })
  index!: Number

  @Prop({ default: null })
  photo!: Photo

  get optionalBackgroundStyles() {
    if (!this.photo) {
      return {}
    }

    return {
      backgroundImage: `url('${this.photo.url}'`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  }

  isImageType(file: File) {
    return (
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg'
    )
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files || !target.files.length) return

    const file = target.files[0]
    if (!this.isImageType(file)) {
      Toaster.error('Tipo de imagen no soportado.')
      return
    }

    const url = URL.createObjectURL(file)
    const photo: Photo = {
      id: (Math.random() * 100000).toString(),
      url,
      file,
    }

    this.$emit('selectPhoto', photo)
  }

  clickedButton(event: Event) {
    if (!this.photo) return

    this.$emit('removePhoto')
    event.preventDefault()
  }
}
</script>

<style>
.corner-button {
  transition: opacity 0.3s ease-out !important;
}
.reordering .corner-button {
  opacity: 0;
}

.dnd-ghost .corner-button {
  animation: fade 0.3s ease-out !important;
  animation-fill-mode: forwards !important;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
