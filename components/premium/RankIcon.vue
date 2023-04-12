<template>
  <img
    v-if="rankIcon.iconSrc"
    :class="rankIcon.iconClass"
    :src="rankIcon.iconSrc"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import RankIcon from '~/lib/rank/RankIcon'
@Component({})
export default class RankIconComponent extends Vue {
  @Prop({ required: true })
  rankIcon!: RankIcon
}
</script>
