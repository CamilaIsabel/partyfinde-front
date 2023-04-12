<template>
  <nav
    :class="{
      'scrolled-nav': scrolledNav,
      'bg-black bg-opacity-30': isMozilla,
      'backdrop-filter backdrop-blur': !isMozilla,
    }"
    class="z-1 top-0 sticky border-b border-gray-800 flex justify-between w-full items-center mx-auto px-1/12 py-3"
  >
    <div class="flex">
      <nuxt-link class="lg:mr-24 flex items-center" to="/">
        <img
          class="bg-red h-8 mr-5 "
          src="~/assets/icons/party-icon.svg"
          alt="Party icon"
        />
        <neon-text active class="text-2xl">partyfinder</neon-text>
      </nuxt-link>
    </div>

    <div class="flex items-center">
      <div class="gap-9 items-center hidden lg:flex">
        <NeonText class="text-[14px] leading-none" :active="partiesIsActive">
          <nuxt-link
            to="/list/parties"
            class="font-semibold tracking-widest"
          >
            Parties
          </nuxt-link>
        </NeonText>
        <NeonText class="text-[14px] leading-none" :active="eventsIsActive">
          <nuxt-link to="/list/events" class="font-semibold tracking-widest">
            Events
          </nuxt-link>
        </NeonText>
      </div>
      <div class="flex items-center border-l ml-6 pl-6 border-gray-800"> 
      
        <button
          type="button"
          class="hidden lg:flex uppercase bg-sky-400/10 px-3 py-1 rounded-full transition-shadow shadow-light-blue-400 shadow-6xl hover:(shadow-7xl shadow-light-blue-400)"
          @click="openBuyPremiumModal"
        >
          <span
            class="mr-2 whitespace-nowrap text-blue-500 font-extrabold rounded text-sm uppercase"
            >Buy premium</span
          >
          <img
            class="bg-red"
            src="~/assets/icons/diamond.svg"
            alt="Diamond icon"
          />
        </button>
        <!--HIDDEN-->
        <a href="#" class="ml-6 hidden lg:flex items-center">
          <MyAccountDropdown />
        </a>
      </div>
    </div>

    <Modal v-model="showBuywPremium">
      <BuyPremium @close="showBuywPremium = false" />
    </Modal>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NeonText from '../layout/NeonText.vue'
import MyAccountDropdown from '../profile/MyAccountDropdown.vue'
import BuyPremium from '../premium/BuyPremium.vue'
import Modal from '../layout/Modal.vue'

@Component({
  components: {
    NeonText,
    MyAccountDropdown,
    BuyPremium,
    Modal,
  },
})
export default class Navbar extends Vue {
  scrolledNav: boolean = false
  showBuywPremium: boolean = false

  updateScroll() {
    const scrollPosition = window.scrollY
    if (scrollPosition > 50) {
      this.scrolledNav = true
      return
    }
    this.scrolledNav = false
  }

  openBuyPremiumModal() {
    this.showBuywPremium = true
  }

  get isMozilla() {
      if(!process.server){
        return Boolean(navigator.userAgent.includes('Firefox'))
      }
      return false
  }

  get route() {
    return this.$route.path
  }

  get partiesIsActive() {
    return this.route.startsWith('/list/parties')
  }

  get eventsIsActive() {
    return this.route.startsWith('/list/events')
  }
}
</script>
