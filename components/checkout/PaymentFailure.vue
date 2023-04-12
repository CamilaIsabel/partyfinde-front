<template>
  <div class="min-h-screen flex flex-col">
    <div class="pt-12 md:pt-16 text-center relative z-10">
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
      <p class="mt-8 text-xl md:text-3xl">
        Payment error
      </p>
      <form
        class="py-6 px-8 max-w-4xl mx-auto my-20 sm:(mt-20 mb-12) text-left flex flex-col sheet gap-4"
      >
        <div>
          <div>
            <li class="text-2xl font-bold flex gap-5">The payment could not be processed<img class="w-5" src="@/assets/icons/dangermark.svg" alt="wrong check" /></li>
          </div>

          <br />
          <div>
              <p>  
                Your purchase has been rejected for some reason, it may have been because you did not complete the payment steps correctly, or you inadvertently left the payment site, please purchase again to generate a new payment link.
              </p>
          </div>
        </div>
        <Button
          class="bg-green-500 hover:shadow-green-500 sm:mt-4"
          @click="goToProfile"
        >
          Back to profile
        </Button>
      </form>
    </div>
    <Benefits class="mt-auto pb-4 text-center relative z-10" />
    <img
      src="@/assets/layout-elements/party-background.webp"
      alt="Background"
      class="absolute left-0 top-0 h-full w-full object-cover object-center pointer-events-none select-none z-0 opacity-10"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import Benefits from '@/components/layout/Benefits.vue'
import NeonText from '@/components/layout/NeonText.vue'
import Button from '@/components/Button.vue'

@Component({
  components: {
    Benefits,
    NeonText,
    Button
  },
})
export default class PaymentFailure extends Mixins() {
  goToProfile(){
    this.$router.push("/profile")
  }

}
</script>
