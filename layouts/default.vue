<template>
  <div class="relative">
    <no-ssr>
      <Modal :value="showDisclaimerModal" @close="closeModal">
        <Disclaimer @close-modal="closeModal" />
      </Modal>
    </no-ssr>
    <div id="modal-container"></div>
    <div
      class="pointer-events-none balls-container w-full h-full absolute left-0 top-0 overflow-hidden"
    ></div>
    <PortalTarget name="layout" />

    <div id="layout-container" class="min-h-screen">
      <Toaster />
      <Navbar />
      <Navigation />
      <div class="relative overflow-hidden z-0">
        <div class="relative z-10">
          <Nuxt class="pb-64" />
          <Footer />
        </div>
      </div>
    </div>
    <AuthGuard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PortalTarget } from 'portal-vue'
import Modal from '../components/layout/Modal.vue'
import Disclaimer from '../components/layout/Disclaimer.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/navbar/Navigation.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Toaster from '@/components/layout/toast/Toaster.vue'
import { users } from '~/store'
import AuthGuard from '~/components/auth/AuthGuard.vue'

export default Vue.extend({
  components: {
    Footer,
    Navigation,
    Navbar,
    Toaster,
    PortalTarget,
    Modal,
    Disclaimer,
    AuthGuard,
  },
  data: () => ({
    showDisclaimerModal: false,
  }),

  mounted() {
    setTimeout(() => {
      this.showDisclaimerModal = users.showDisclaimerModal
    }, 1000)
  },
  methods: {
    closeModal() {
      users.setDisclaimer()
      this.showDisclaimerModal = false
    },
  },
})
</script>

<style>
html,
body {
  color: #fff;
  font-family: 'Nunito', sans-serif;
  background: linear-gradient(
    177.54deg,
    rgba(7, 8, 13, 0.59) -58.73%,
    #090a10 90%
  );
  background-image: url('@/assets/decoration/background.jpg');
  background-size: cover;
}

img {
  user-select: none;
  pointer-events: none;
}

.sheet {
  background: linear-gradient(132.11deg, #303048 -8.08%, #161622 100%);
  box-shadow: 0 0 30px 0 #0009;
  @apply backdrop-filter backdrop-blur sm:rounded-2xl;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity ease-out;
}

.fade-enter,
.fade-leave-to {
  @apply opacity-0;
}

.fade-leave,
.fade-enter-to {
  @apply opacity-1;
}

::selection {
  color: #000;
  background: #fb7185;
}

button:focus,
input:focus {
  outline: none;
}

.balls-container::after {
  background-image: url(@/assets/decoration/noise.png);
  background-repeat: repeat;
  background-position: 50% 50%;
  z-index: 100000;
  position: absolute;
  content: ' ';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

:root {
  --scrollbar-bg: rgba(36, 36, 36, 0.5);
  --scrollbar-color: rgb(114, 114, 114);
  --scrollbar-hover: #60a5fa;
}

body {
  overflow-x: hidden;
}

* {
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-bg);
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-color);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-hover);
}
</style>
