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
        <PrivacyPolicy />
      </transition>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PrivacyPolicy from '../../components/policy/PrivacyPolicy.vue'

@Component({ components: { PrivacyPolicy } })
export default class PrivacyPolicyPage extends Vue {}
</script>
