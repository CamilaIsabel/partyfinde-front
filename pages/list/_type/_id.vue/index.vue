<template>
  <div>
    <no-ssr>
      <Modal :value="show" @close="pushBack">
        <Presentation
          class="pointer-events-auto"
          :current-user-data="user"
          :user-photos="userPhotos"
        />
      </Modal>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Modal from '../../../../components/layout/Modal.vue'
import Presentation from '~/components/profile/Presentation.vue'
import { userlist } from '~/store'
import StatService from '~/lib/service/StatService'

@Component({ components: { Modal, Presentation } })
export default class ListPage extends Vue {
  showModal: boolean = false
  usersLoaded: boolean = false

  get show() {
    return !!this.userId && userlist.usersAvailable
  }

  get user() {
    return userlist.currentUser
  }

  get userPhotos() {
    return userlist.currentUser?.featuredPhotos ?? []
  }

  get availableTypes() {
    return ['parties', 'events']
  }

  get selectedType() {
    const routeType = this.$route.params.type
    if (!this.availableTypes.includes(routeType)) {
      this.$router.push('/list/parties')
    }

    return routeType
  }

  get userId() {
    return this.$route.params.id
  }

  @Watch('userId')
  watchRouteParams() {
    if (this.userId) {
      userlist.setCurrentId(this.userId)
      StatService.addView(this.userId)
    }
  }

  created() {
    this.watchRouteParams()
  }

  pushBack() {
    this.$router.push(`/list/${this.selectedType}`)
  }
}
</script>
