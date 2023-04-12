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

        <ChangePassword/>
      </transition>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangePassword from '../../../components/profile/account/ChangePassword.vue'

@Component({ components: { ChangePassword } })
export default class ChangePasswordPage extends Vue {

}
</script>
