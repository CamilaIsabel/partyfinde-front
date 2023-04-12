<template>
  <div class="relative mt-16">
    <no-ssr>
      <transition
        enter-active-class="transition-all ease-out transform duration-300"
        leave-active-class="transition-all ease-out transform duration-200"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
        leave-class="opacity-100 scale-100"
        mode="out-in"
      >
        <EditProfile
          v-if="showEditModal"
          :user-photos="userPhotos"
          @updated-photos="updatePhotos"
          @close="closeEditModal"
        />
        <Presentation
          v-else
          :current-user-data="user"
          :user-photos="photoURLs"
          mode="my-account"
          @open-edit-modal="openEditModal"
        />
      </transition>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Presentation from '../../components/profile/Presentation.vue'
import EditProfile from '../../components/profile/edit/EditProfile.vue'
import { users } from '~/store'
import Photo from '~/lib/misc/Photo'
import { getUserPhotos } from '~/lib/service/UsersService'
import User from '~/lib/type/User'

@Component({ components: { Presentation, EditProfile } })
export default class ProfilePage extends Vue {
  userPhotos: Photo[] = []

  get user() {
    return users.currentUser ?? ({} as User)
  }

  get photoURLs() {
    return this.user?.featuredPhotos
  }

  get showEditModal() {
    return this.$route.path.includes('edit')
  }

  mounted() {
    if (!this.user.uuid) return
    this.fetchPhotos()
  }

  @Watch('user')
  async fetchPhotos() {
    this.userPhotos = await getUserPhotos()
  }

  openEditModal() {
    this.$router.push('/profile/edit')
  }

  closeEditModal() {
    this.$router.push('/profile')
  }

  updatePhotos(photos: Photo[]) {
    this.userPhotos = photos
    users.updateUserData({
      featuredPhotos: photos.map((photo) => photo.url),
      profilePhoto: photos[0].url,
    })
  }
}
</script>
