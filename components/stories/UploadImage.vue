<template>
  <div class="h-5">
    <input
      ref="input"
      type="file"
      class="hidden"
      :accept="accept"
      @change="onFileChange"
    />

    <button @click.stop="selectFile">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Photo from '~/lib/misc/Photo'

@Component({})
export default class UploadImage extends Vue {
  @Prop({ default: () => 'image/png, image/jpeg' })
  accept!: string

  uploadImageName: string = ''
  uploadImage: string | ArrayBuffer | null = ''

  get input() {
    return this.$refs.input as HTMLInputElement
  }

  selectFile() {
    this.input.click()
  }

  onFileChange(e: any) {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) {
      return
    }
    this.uploadImageName = files[0].name
    this.createImage(files[0])
  }

  clear() {
    this.input.value = null
  }

  createImage(file: any) {
    const url = URL.createObjectURL(file)
    const photo: Photo = {
      id: (Math.random() * 100000).toString(),
      url,
      file,
    }

    this.$emit('change', photo)
  }
}
</script>
