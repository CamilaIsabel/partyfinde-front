<template>
  <div class="min-h-screen flex flex-col">
    <div class="pt-12 md:pt-16 text-center relative z-20">
    
        <div class="flex justify-center">
          <div class="flex items-center">
            <img
              class="bg-red h-8 mr-5 "
              src="~/assets/icons/party-icon.svg"
              alt="Party icon"
            />
            <neon-text active class="text-2xl">partyfinder</neon-text>
          </div>
        </div>

      <transition name="fade" mode="out-in">
        <p :key="route" class="mt-8 mb-4 text-xl md:text-3xl">{{ title }}</p>
      </transition>
      <transition
        mode="out-in"
        duration="300"
        enter-active-class="transition-all transform ease-out duration-300"
        leave-active-class="transition-all transform ease-out duration-300"
        enter-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-10"
      >
        <nuxt
          :key="route"
          class="my-20 sm:(mt-20 mb-12)"
          @updateTitle="setTitle"
        ></nuxt>
      </transition>
    </div>
    <Benefits class="mt-auto pb-4 text-center relative z-10 mt-8" />
    <img
      src="@/assets/layout-elements/party-background.webp"
      alt="Background"
      class="absolute left-0 top-0 h-full w-full object-cover object-center pointer-events-none select-none z-0 opacity-10"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Benefits from '@/components/layout/Benefits.vue'
import NeonText from '@/components/layout/NeonText.vue'

@Component({
  components: { Benefits, NeonText },
})
export default class RegisterPage extends Vue {
  email: string = ''
  password: string = ''
  title: string = ''

  get route(): string {
    return this.$route.path
  }

  setTitle(value: string) {
    this.title = value
  }
}
</script>
