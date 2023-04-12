<template>
  <div
    class="flex justify-center relative items-center w-[77px] h-[77px]"
    @click="clicked"
  >
    <svg
      v-if="storie"
      class="absolute left-0 top-0"
      width="77"
      height="77"
      viewBox="0 0 77 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="75"
        height="75"
        rx="37.5"
        stroke="url(#paint0_linear)"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-5.80138"
          y1="26.3699"
          x2="50.6301"
          y2="82.8014"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F21623" />
          <stop offset="1" stop-color="#8546F4" stop-opacity="0.52" />
        </linearGradient>
      </defs>
    </svg>

    <div class="rounded-full relative cursor-pointer">
      <img class="w-17 h-17 rounded-full object-cover" :src="profilePhoto" />
      <button class="absolute bottom-0 right-0">
        <UploadImage v-if="!storie" ref="uploadImage" @change="changeImage">
          <div class="w-5 h-5 z-40 rounded-full bg-green-500 p-1">
            <img src="~/assets/icons/plus.svg" />
          </div>
        </UploadImage>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import UploadImage from './UploadImage.vue'
import Story from '~/lib/story/Story'
import { users } from '~/store'

@Component({ components: { UploadImage } })
export default class StoryComponent extends Vue {
  @Prop({ default: () => {} })
  storie!: Story

  changeImage(media: any) {
    this.$emit('uploadMedia', media)
  }

  get profilePhoto() {
    if (this.storie) {
      return this.storie.user.profilePhoto
    }

    if (users.isLoggedIn) {
      return users.currentUser.profilePhoto ?? '/bg/party-background.webp'
    }
  }

  clear() {
    this.uploadImageComponent.clear()
  }

  get uploadImageComponent() {
    return this.$refs.uploadImage as any
  }

  clicked() {
    this.$emit('click')
    if (this.storie) return

    this.uploadImageComponent.selectFile()
  }
}
</script>
