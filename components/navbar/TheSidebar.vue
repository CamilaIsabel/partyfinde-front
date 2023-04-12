<template>
  <div
    class="w-[240px] fixed top-0 bottom-0 flex bg-blue-500 bg-opacity-5 border-r border-white pointer-events-auto border-opacity-10 backdrop-filter backdrop-blur"
  >
    <div class="h-full flex flex-col flex-grow-1 w-full">
      <div class="border-b py-3 border-gray-700">
        <div class="flex items-center w-full justify-between px-4">
            <div class="flex items-center">
              <img
                class="bg-red h-6 mr-3 "
                src="~/assets/icons/party-icon.svg"
                alt="Party icon"
              />
              <neon-text active class="text-xl">partyfinder</neon-text>
            </div>
          <button
            href="#"
            class="block uppercase bg-sky-400/10 px-3 py-1 rounded-full transition-shadow shadow-light-blue-400 shadow-6xl hover:shadow-7xl hover:shadow-light-blue-400"
            @click="openBuyModal"
          >
            <img
              class="block h-4 w-4"
              src="~/assets/icons/diamond.svg"
              alt="Diamond icon"
            />
          </button>
        </div>
      </div>

      <div class="flex flex-grow py-4 px-4">
        <div class="h-full my-auto flex flex-col justify-between">
          <div>
            <nuxt-link to="/list/parties" class="flex items-center">
              <NeonText
                class="text-[18px] leading-none"
                :active="partiesIsActive"
              >
                <span class="uppercase font-bold tracking-widest text-[16px]">
                  Parties
                </span>
              </NeonText>
            </nuxt-link>

            <nuxt-link to="/list/events" class="flex items-center mt-4">
              <NeonText class="text-[18px] leading-none" :active="eventsIsActive">
                <span class="uppercase font-bold tracking-widest text-[16px]">
                  Events
                </span>
              </NeonText>
            </nuxt-link>
          </div>
          <!--HIDDEN-->
          <MyAccountDropdown direction="up" attach="left" />
        </div>
      </div>
    </div>
    <Modal v-model="showBuyModal">
      <BuyPremium @close="showBuyModal = false" />
    </Modal>
  </div>
</template>

<script>
import MyAccountDropdown from '../profile/MyAccountDropdown.vue'
import Modal from '../layout/Modal.vue'
import BuyPremium from '../premium/BuyPremium.vue'
import NeonText from '@/components/layout/NeonText.vue'

export default {
  components: {
    NeonText,
    MyAccountDropdown,
    Modal,
    BuyPremium,
  },
  data: () => ({
    showBuyModal: false,
  }),
  computed: {
    route() {
      return this.$route.path
    },

    partiesIsActive() {
      return this.route.startsWith('/list/parties')
    },

    eventsIsActive() {
      return this.route.startsWith('/list/events')
    },
  },
  methods: {
    openBuyModal() {
      this.showBuyModal = true
    },
  },
}
</script>
