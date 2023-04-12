<template>
  <no-ssr>
    <PhotoSlider
      :show="true"
      :photo-u-r-ls="storyPhotos"
      :selected-index="selectedIndex"
      @update-index="updateStoryIndex"
      @close="goBack"
    >
      <div class="text-center p-2 absolute bottom-0 left-0 z-8000 right-2 flex items-center justify-center w-full pointer-events-auto story-status">{{selectedStory.body}}</div>
      <div
        v-if="selectedStory && selectedStory.user"
        class="absolute top-0 left-0 z-8000 right-2 flex items-center justify-center w-full pointer-events-auto story-status"
      >
        <div class="py-2 flex items-center justify-start gap-4">
          <nuxt-link
            :to="`/list/${type}/${selectedStory.user.uuid}`"
            class="bg-white rounded-full w-15 h-15 flex-shrink-0"
          >
            <img
              v-if="selectedStory.user.profilePhoto"
              class="object-cover w-full h-full rounded-full cursor-pointer border-transparent border-1 cursor-pointer shadow-md"
              :src="selectedStory.user.profilePhoto"
            />
          </nuxt-link>
          <p class="flex flex-col">
            <nuxt-link
              :to="`/list/${type}/${selectedStory.user.uuid}`"
              class="text-white leading-tight text-lg font-bold cursor-pointer transition-colors hover:text-rose-300 hover:underline-current hover:underline"
            >
              {{ selectedStory.user.name }}
            </nuxt-link>
            <time class="text-gray-200 text-sm">
              {{ formatDate(selectedStory.uploadedAt) }}
            </time>
          </p>
        </div>
      </div>
    </PhotoSlider>
  </no-ssr>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Modal from '../../../../components/layout/Modal.vue'
import Presentation from '~/components/profile/Presentation.vue'
import { userlist } from '~/store'
import { timeAgo } from '~/lib/misc/DateUtils'
import PhotoSlider from '~/components/profile/photo/PhotoSlider.vue'

@Component({ components: { Modal, Presentation, PhotoSlider } })
export default class ListPage extends Vue {
  get availableTypes() {
    return ['parties', 'events']
  }

  get type() {
    const routeType = this.$route.params.type
    if (!this.availableTypes.includes(routeType)) {
      this.$router.push('/list/parties')
    }

    return routeType
  }

  get storyId() {
    return this.$route.params.storyId
  }

  get selectedStory() {
    return userlist.stories.find((story) => story.id === this.storyId)
  }

  get selectedIndex() {
    return userlist.stories.findIndex((story) => story.id === this.storyId)
  }

  get storyPhotos() {
    return userlist.stories.map((story) => story.url)
  }

  updateStoryIndex(index: number) {
    const story = userlist.stories.at(index)
    if (!story) return

    this.$router.push(`/list/${this.type}/stories/${story.id}`)
  }

  goBack() {
    this.$router.push(`/list/${this.type}`)
  }

  formatDate(date: any) {
    return timeAgo(date)
  }
}
</script>

<style scoped>
.story-status {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
}
</style>
