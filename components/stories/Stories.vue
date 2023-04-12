<template>
  <div>
    <div class="overflow-x-scroll max-w-screen stories">
      <div class="flex gap-2">
        <Storie
          v-if="showUploadStory"
          ref="uploadStory"
          class="flex-shrink-0"
          @uploadMedia="showMediaModal"
        />
        <nuxt-link
          v-for="story in stories"
          :key="story.id"
          :to="`/list/${type}/stories/${story.id}`"
        >
          <Storie class="flex-shrink-0" :storie="story" />
        </nuxt-link>
      </div>
    </div>

    <Modal v-model="showUploadMediaModal">
      <div class="sheet w-80 xl:w-120 px-8 pb-5 pt-12">
        <img :src="uploadMediaURL" class="block mx-auto" />
        <div class="mt-10 grid xl:justify-end xl:grid-flow-col xl:gap-4">
          <TextBox v-model="newStoryBody" type="text"
            >Add a comment</TextBox
          >
          <button
            class="xl:mt-6 bg-green-500 h-9 shadow-5xl hover:shadow-8xl hover:shadow-green-500 shadow-green-500 items-center justify-center rounded-md uppercase py-[6px] px-4 text-[14px] font-bold whitespace-nowrap flex"
            @click="uploadStory"
          >
            <span>Upload</span>
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import TextBox from '../forms/TextBox.vue'
import PhotoSlider from '../profile/photo/PhotoSlider.vue'
import Storie from '~/components/stories/storie.vue'
import Modal from '@/components/layout/Modal.vue'
import { userlist, users } from '~/store'
import Photo from '~/lib/misc/Photo'
import StoryService from '~/lib/service/StoryService'
import Toaster from '~/lib/toaster/Toaster'
import { getErrorMessage } from '~/utils/error-utilts'

@Component({ components: { Storie, Modal, TextBox, PhotoSlider } })
export default class Stories extends Vue {
  showUploadMediaModal: boolean = false
  media?: Photo = null

  @Prop({ required: true })
  type: string

  get stories() {
    return userlist.stories
  }

  mounted() {
    this.fetchStories()
  }

  async fetchStories() {
    const stories = await StoryService.getStories(this.type)
    userlist.setStories(stories)
  }

  newStoryBody: string = ''

  showMediaModal(media: Photo) {
    if (!media) return
    this.showUploadMediaModal = true
    this.media = media
  }

  @Watch('showUploadMediaModal')
  clearFileInputWhenModalIsClosed(modalIsShown: boolean) {
     if (modalIsShown) return;
     this.uploadStoryComponent.clear()
  }

  get uploadMediaURL() {
    return this.media?.url
  }

  get parsedType() {
    if (this.type === 'parties') return 'P'
    if (this.type === 'events') return 'E'
  }

  get showUploadStory() {
    return users.isLoggedIn && users.currentUser.type === this.parsedType
  }

  get uploadStoryComponent() {
    return this.$refs.uploadStory as any
  }

  uploadStory() {
    if (!this.media) return

    const promise = StoryService.uploadStory({
      body: this.newStoryBody,
      media: this.media,
    })

    Toaster.promise(promise, {
      loading: 'Uploading story',
      success: 'Uploaded story',
      width: 280,
      error: ({ response }) => getErrorMessage(response),
    })

    promise.finally(() => {
      this.newStoryBody = ''
      this.media = null
      this.uploadStoryComponent.clear()
      this.showUploadMediaModal = false
    })

    promise.then((story) => {
      const stories = [...this.stories]
      stories.unshift(story)
      userlist.setStories(stories)
    })
  }
}
</script>

<style>
.stories::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.stories {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
