<template>
  <div class="sheet min-w-min max-w-max mx-auto py-6 px-8">
    <div
      class="flex flex-col xl:flex-row justify-between items-center transition-opacity transition"
      :class="loading ? 'opacity-50 pointer-events-none' : ''"
    >
      <Photos ref="photos" :photos="photos" @change="photosChanged" />
    </div>

    <Button
      :disabled="isRequesting || !hasAnyPhotos"
      class="bg-green-500 hover:shadow-green-500 sm:mt-4 w-full"
      @click="onClickUploadPhotos"
    >
      Finish
    </Button>
  </div>
</template>

<script lang="ts">
import { Drag, Drop, DropList } from 'vue-easy-dnd'
import { Component, Mixins } from 'vue-property-decorator'
import Button from '@/components/Button.vue'
import UploadPhoto from '~/components/profile/edit/UploadPhoto.vue'
import Photos from '~/components/profile/edit/Photos.vue'

import Photo from '~/lib/misc/Photo'
import AuthMixin from '~/lib/mixin/AuthMixin'
import FormMixin from '~/lib/mixin/Form'
import RequestMixin from '~/lib/mixin/RequestMixin'
import UsersService from '~/lib/service/UsersService'
import Toaster from '~/lib/toaster/Toaster'
import { users } from '~/store'
import { AuthStep } from '~/store/users'

@Component({
  components: {
    UploadPhoto,
    Drag,
    Drop,
    DropList,
    Photos,
    Button,
  },
})
export default class RegisterThirdStep extends Mixins(
  FormMixin,
  AuthMixin,
  RequestMixin
) {
  photos: Photo[] = []
  photosToUpload: Photo[] = []
  loading: boolean = false

  async getUserPhotos() {
    this.loading = true
    const photos = await UsersService.getUserPhotos()
    this.photos = photos
    this.loading = false
  }

  onClickUploadPhotos() {
    this.request = this.finish()

    Toaster.promise(this.request, {
      loading: 'Uploading photos',
      success: 'Uploaded photos',
      error: 'Unexpected error',
    })
  }

  async finish() {
    const photosToUpload = this.photosToUpload
    const upload: File[] = photosToUpload
      .map((photo) => photo.file as File)
      .filter((file) => !!file)

    let newPhotos: Photo[] = []
    if (upload.length) {
      newPhotos = await UsersService.uploadPhotos({ upload })
    }

    for (const photo of photosToUpload) {
      const index = photosToUpload.indexOf(photo)
      photo.index = index
      if (photo.file) {
        const uploadedPhoto = newPhotos.splice(0, 1)
        photo.url = uploadedPhoto[0].url
        photo.id = uploadedPhoto[0].id
        photo.file = undefined
      }
    }

    await UsersService.updatePhotos({
      photos: photosToUpload,
    })

    const profileResponse = await UsersService.getProfile()
    const user = profileResponse.data.user
    users.setCurrentUser(user)
  }

  get title() {
    return 'Upload your first photos'
  }

  created() {
    this.$parent.$emit('updateTitle', this.title)
    this.getUserPhotos()
  }

  photosChanged(photos: Photo[]) {
    this.photosToUpload = [...photos]
  }

  requestCompletedSuccessfully() {
    users.setAuthStep(AuthStep.VERIFIED)
    this.$router.push('/profile')
  }

  requestFailed(error: any) {
    console.error(error)
  }

  get hasAnyPhotos(): boolean {
    return this.photosToUpload.length > 0
  }
}
</script>
