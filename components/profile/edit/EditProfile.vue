<template>
  <div class="sheet max-w-7xl flex flex-col mx-auto py-8 px-8">
    <div class="flex flex-col xl:flex-row justify-between items-center">
      <Photos ref="userPhotos" :photos="userPhotos" @change="photosChanged" />

      <ProfileForm
        ref="profileForm"
        class="xl:max-w-sm w-full grid"
        :hide-button="true"
        @submit="submitData"
      />
    </div>

    <div class="mt-15 mx-auto grid sm:grid-cols-2 gap-4">
      <button
        class="uppercase mx-auto bg-gray-600 px-10 xl:px-30 py-2 rounded-md font-black w-full"
        @click="goBack"
      >
        Back
      </button>

      <button
        class="uppercase mx-auto bg-green-500 px-10 xl:px-30 py-2 rounded-md font-black w-full"
        @click="attemptSubmit"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Drag, Drop, DropList } from 'vue-easy-dnd'
import { Vue, Component, Prop } from 'vue-property-decorator'
import UploadPhoto from './UploadPhoto.vue'
import Photos from './Photos.vue'

import Photo from '~/lib/misc/Photo'
import UsersService, { UpdateProfileDTO } from '~/lib/service/UsersService'
import Toaster from '~/lib/toaster/Toaster'
import { users } from '~/store'

@Component({
  components: { UploadPhoto, Drag, Drop, DropList, Photos },
})
export default class EditProfile extends Vue {
  @Prop({ default: () => [], required: false })
  userPhotos!: Photo[]

  photosToUpload: Photo[] = []

  photosChanged(photos: Photo[]) {
    this.photosToUpload = [...photos]
  }

  attemptSubmit() {
    const form = this.$refs.profileForm as any
    if (!form) return
    form.submit() // attempt ProfileForm sumit.
  }

  async uploadPhotos() {
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

    return UsersService.updatePhotos({
      photos: photosToUpload,
    })
  }

  submitData(dto: UpdateProfileDTO) {
    const promise = this.submitProfile(dto)
    Toaster.promise(promise, {
      loading: 'Updating profile',
      success: 'Updated profile',
      width: 280,
      error: ({ response }) =>
        Array.isArray(response.data.message)
          ? response.data.message[0]
          : response.data.message,
    })

    promise.then(() => this.$emit('close'))
  }

  goBack() {
    this.$emit('close')
  }

  async submitProfile(dto: UpdateProfileDTO) {
    const photosResponse = await this.uploadPhotos()
    const profileResponse = await UsersService.updateProfile(dto)

    if (profileResponse.data.user) {
      users.setCurrentUser(profileResponse.data.user)
    }

    if (photosResponse.data.photos && photosResponse.data.photos.length) {
      this.$emit('updated-photos', photosResponse.data.photos || [])
    }
  }
}
</script>
