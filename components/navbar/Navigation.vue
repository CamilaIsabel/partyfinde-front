<template>
  <div class="relative">
    <FloatingActionButton class="z-60 relative" @click="toggleMobileNav" />
    <transition name="sidebar">
      <TheSidebar v-if="showMobileNav" class="z-50" />
    </transition>
    <transition name="background">
      <div
        v-if="showMobileNav"
        class="w-screen h-screen fixed top-0 left-0 backdrop-filter backdrop-blur bg-black bg-opacity-50 z-30"
        @click.self="toggleMobileNav"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import FloatingActionButton from '@/components/navigation/FloatingActionButton.vue'
import TheSidebar from '@/components/navbar/TheSidebar.vue'

@Component({ components: { FloatingActionButton, TheSidebar } })
export default class Navigation extends Vue {
  showMobileNav: boolean = false

  mounted() {
    window.addEventListener('resize', this.checkScreen)
    this.$router.afterEach(() => {
      this.showMobileNav = false
    })
    this.checkScreen()
  }

  destroyed() {
    window.removeEventListener('resize', this.checkScreen)
  }

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav
  }

  @Watch('showMobileNav')
  toggleScroll(val: boolean) {
    if (val) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }

  checkScreen() {
    if (window.innerWidth > 1024) {
      this.showMobileNav = false
    }
  }
}
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.5s ease-in-out;
}
.sidebar-enter,
.sidebar-leave-to {
  transform: translateX(-200%);
  opacity: 0.8;
}

.background-enter-active,
.background-leave-active {
  transition: all 0.5s ease-in-out;
}
.background-enter,
.background-leave-to {
  opacity: 0;
}
</style>
