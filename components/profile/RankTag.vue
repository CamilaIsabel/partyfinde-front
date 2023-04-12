<template>
  <div v-if="rank && rank.isPremium" class="flex gap-2">
    <div class="bg-white overflow-hidden rounded-full">
      <span
        class="px-2 py-1 flex items-center justify-center uppercase bg-opacity-40 font-extrabold text-[0.85rem] leading-none tracking-tight"
        :class="[
          rank.styledColors.light.backgroundColor,
          rank.styledColors.dark.textColor,
        ]"
      >
        {{ partiesIsActive ? rank.displayName.partyDisplayName : rank.displayName.eventDisplayName }}
      </span>
    </div>
    <button
      v-if="rankCanExpire && !rankExpired"
      type="button"
      class="flex-shrink-0"
      @click="showRankDurationModal = true"
    >
      <img src="@/assets/icons/question.svg" alt="Info" class="block w-5 h-5" />
    </button>
    <Modal v-model="showRankDurationModal">
      <div class="pb-8 pt-4 px-12 text-center sheet">
        <p class="mt-5 font-bold text-lg">Your rank expires on:</p>
        <p class="mt-2">
          {{ formattedExpiryDate }} at {{ formattedExpiryTime }}
        </p>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Modal from '../layout/Modal.vue'
import { Rank, Ranks } from '~/lib/rank/Rank'

@Component({ components: { Modal } })
export default class RankTag extends Vue {
  @Prop({ default: () => Ranks.DEFAULT })
  rank!: Rank

  @Prop({ default: false })
  rankCanExpire: boolean

  @Prop({ default: false })
  rankExpired: boolean

  @Prop({ default: 0 })
  rankExpireTime: number

  showRankDurationModal: boolean = false

  get formattedExpiryDate() {
    return new Date(this.rankExpireTime).toLocaleString('es-UY', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }

  get formattedExpiryTime() {
    return new Date(this.rankExpireTime).toLocaleString('es-UY', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  get route() {
    return this.$route.path
  }

  get partiesIsActive() {
    return this.route.startsWith('/list/parties')
  }

  get eventsIsActive() {
    return this.route.startsWith('/list/events')
  }
}
</script>
