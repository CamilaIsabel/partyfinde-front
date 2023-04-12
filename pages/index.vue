<template>
  <div class="text-center mt-25">
    <div class="max-w-[38rem] mx-auto px-4">
      <h1 class="font-bold text-3xl lg:text-6xl">
        Where's the party?
      </h1>
      <div class="mt-4 lg:mt-12 text-[#8C7373]">
        <p>Find the best parties and events.</p>
        <p>A world full of adventures awaits you.</p>
      </div>
      <div class="flex items-center justify-center mt-15 gap-5 flex-wrap">
        <nuxt-link
          v-if="!isLoggedIn"
          as="button"
          class="border border-gray-600 border-2 min-w-[160px] font-bold rounded py-3 px-10 flex flex-col items-center"
          to="/list/parties"
        >
          Parties
        </nuxt-link>
        <nuxt-link
          v-if="!isLoggedIn"
          as="button"
          class="border border-gray-600 border-2 min-w-[160px] font-bold rounded py-3 px-10 flex flex-col items-center"
          to="/list/events"
        >
          Events
        </nuxt-link>

        <div class="w-full flex justify-center">
          <nuxt-link
            v-if="!isLoggedIn"
            as="button"
            class="border border-gray-600 border-2 min-w-[160px] font-bold rounded py-3 px-10 flex flex-col items-center w-5/12"
            to="/login"
          >
            Sign in
          </nuxt-link>
        </div>

        <div class="w-full flex justify-center">
          <nuxt-link
            v-if="!isLoggedIn"
            id="cta"
            to="/register"
            class="min-w-[160px] font-bold rounded py-3 px-5 flex flex-col items-center w-5/12"
          >
            Sign up
          </nuxt-link>
        </div>

      </div>
    </div>

    <button class="mt-40 mb-48 animate-bounce">
      <img
        id="arrow-down-navigation"
        src="@/assets/icons/arrow-down.svg"
        alt="Keep reading"
      />
    </button>

    <Benefits class="relative z-10" />
    <img
      src="@/assets/layout-elements/footer-bg.webp"
      alt="Background"
      class="absolute left-0 bottom-0 h-auto w-full object-cover object-bottom pointer-events-none select-none z-0"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Benefits from '@/components/layout/Benefits.vue'
import { users } from '~/store'

export default Vue.extend({
  components: {
    Benefits,
  },
  computed: {
    isLoggedIn() {
      return users.isLoggedIn
    },
  },
})
</script>

<style scoped>
.action-link {
  @apply font-bold flex-1 max-w-[140px] py-3 rounded;
}

#cta {
  box-shadow: 0 0 23px rgba(37, 99, 235, 0.15),
    inset 0 0 12px rgba(0, 0, 0, 0.5);
  @apply bg-gradient-to-br from-[#3b82f6] to-[#1E3A5B];
}

#arrow-down-navigation {
  filter: drop-shadow(0 0 8px #2563EB);
}
</style>
