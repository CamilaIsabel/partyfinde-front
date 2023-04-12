<template>
  <drop-list
    mode="cut"
    :items="allPhotos"
    class="place-items-center h-min w-full lg:w-150 grid md:grid-cols-4 grid-cols-2 gap-4 mb-10 mx-auto"
    @reorder="reorder"
    @insert="insert"
  >
    <template #item="{ item, index }">
      <drag
        :key="item ? item.id : index"
        :disabled="!item"
        :data="item"
        @cut="remove(allPhotos, item)"
      >
        <UploadPhoto
          ref="uploadPhoto"
          :index="index"
          :photo="item"
          @clickPhoto="clickedPhoto"
          @removePhoto="removePhoto(index)"
          @selectPhoto="selectPhoto($event, index)"
        />
      </drag>
    </template>
  </drop-list>
</template>

<script lang="ts">
import { Drag, Drop, DropList } from 'vue-easy-dnd'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import UploadPhoto from './UploadPhoto.vue'

import Photo from '~/lib/misc/Photo'
import { users } from '~/store'

@Component({
  components: { UploadPhoto, Drag, Drop, DropList },
})
export default class Photos extends Vue {
  @Prop({ default: () => [], required: false })
  photos!: Photo[]

  allPhotos: (Photo | undefined)[] = []

  created() {
    this.updatePhotos()
  }

  @Watch('allPhotos')
  emitPhotosChanged() {
    this.$emit('change', this.getPhotos)
  }

  get amountOfPhotosToShow() {
    const maxPhotosByRank = users.currentUser?.rank?.maxPhotos ?? 8
    const currentPhotoAmount = this.getPhotos.length

    if (currentPhotoAmount < maxPhotosByRank) {
      if (currentPhotoAmount < 8) return 8
      return currentPhotoAmount + 1
    }

    return maxPhotosByRank
  }

  @Watch('photos')
  updatePhotos() {
    const photos = []
    const amountOfPhotosToShow = Math.max(this.photos.length, 8)
    for (let i = 0; i < amountOfPhotosToShow; i++) {
      const photo = this.photos[i]
      photos.push(photo)
    }

    this.allPhotos = photos
    this.attemptToIncreasePhotoAmount()
  }

  insert(event: { index: number; data: Photo }) {
    this.allPhotos.splice(event.index, 0, event.data)
  }

  remove(photos: (Photo | undefined)[], value: Photo) {
    const index = photos.indexOf(value)
    photos.splice(index, 1)
  }

  reorder(event: any) {
    const lastPhotoIndex = this.allPhotos.findIndex((entry) => !entry)
    if (event.to >= lastPhotoIndex) return
    event.apply(this.allPhotos)
  }

  clickedPhoto(index: number) {
    const clickedPhoto = this.photos[index]
    if (clickedPhoto) {
      this.$emit('clickedPhoto', clickedPhoto, index)
    }
  }

  removePhoto(index: number) {
    const arr = this.allPhotos
    arr[index] = undefined
    this.allPhotos = [...arr]
    this.attemptToIncreasePhotoAmount()
  }

  selectPhoto(photo: Photo, index: number) {
    const arr = this.allPhotos

    const lastPhotoIndex = arr.findIndex((entry) => !entry)
    let realIndex = index
    if (lastPhotoIndex >= 0 && lastPhotoIndex < realIndex) {
      realIndex = lastPhotoIndex
    }

    arr[realIndex] = photo
    this.allPhotos = [...arr]
    this.attemptToIncreasePhotoAmount()
  }

  attemptToIncreasePhotoAmount() {
    if (this.allPhotos.length > this.amountOfPhotosToShow) {
      this.allPhotos = [...this.getPhotos]
    }

    if (this.allPhotos.length < this.amountOfPhotosToShow) {
      this.allPhotos.push(undefined)
    }
  }

  get getPhotos() {
    return this.allPhotos.filter((photo) => !!photo)
  }
}
</script>

<style>
.drag-source {
  opacity: 0 !important;
}

.drag-out {
  opacity: 1;
}

.drag-in {
  opacity: 1 !important;
}

.dnd-ghost {
  opacity: 1 !important;
}

.dnd-ghost .sheet {
  animation: grow 0.3s ease-out !important;
  animation-fill-mode: forwards !important;
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
