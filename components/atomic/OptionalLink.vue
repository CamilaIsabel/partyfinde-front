<template>
  <nuxt-link v-if="to" :to="to">
    <slot />
  </nuxt-link>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class OptionalLink extends Vue {
  @Prop({ default: '' })
  to?: string
}
</script>
