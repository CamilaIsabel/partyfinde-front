<template>
  <div class="max-w-104 sheet text-center p-5">


    <div class="flex">
      <div class="flex items-center mx-auto">

        <img
          class="bg-red h-6 mr-3 "
          src="~/assets/icons/party-icon.svg"
          alt="Party icon"
        />
        <neon-text active class="text-xl">partyfinder</neon-text>
      </div>

    </div>

    
    <p class="mt-5 font-bold text-md">This site is for people over 18 years old.</p>
    <p class="mt-3 text-gray-400 text-md">
      By closing this message and using this website you agree to our
      <nuxt-link to="privacy-policy" class="text-blue-500"
        >Terms of use and privacy policies</nuxt-link
      >.
    </p>
    <button
      class="mt-5 uppercase mx-auto bg-green-500 px-10 py-1 rounded-md font-black"
      @click="closeModal"
    >
      Accept
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NeonText from './NeonText.vue'

export default Vue.extend({
  components: { NeonText },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
  },
})
</script>
