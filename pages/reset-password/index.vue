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
        <SendMail />
      </transition>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SendMail from '../../components/profile/account/SendMail.vue'

@Component({ components: { SendMail } })
export default class ResetPasswordPage extends Vue {}
</script>
