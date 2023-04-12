<template>
  <button
    :class="{
      'buy-increment': !hasBoostsAvailable,
    }"
    class="bg-green-500 xl:mb-0 shadow-5xl hover:(shadow-8xl shadow-green-500) shadow-green-500 flex items-center justify-center border-2 border-transparent rounded-full uppercase py-[6px] px-4 text-[14px] font-bold whitespace-nowrap"
    @click.capture="shouldShowModal"
  >
    <span class="mr-2"> Increase visibility </span>
    <img
      v-if="!remainingBoosts"
      class="h-[14px] w-[14px]"
      src="~/assets/icons/shopping-cart.svg"
    />
    <span
      v-if="!canUseBoost && remainingBoosts > 0"
      class="pl-2 text-[#B1ACAC]"
    >
      {{ formattedRemainingTime }}
    </span>
    <img v-if="canUseBoost" class="h-3 w-3" src="~/assets/icons/arrow.svg" />
    <span v-if="canUseBoost">{{ remainingBoosts }}</span>

    <UseIncrement
      :position="position"
      :value="showUseIncrement"
      :has-used-boost="hasUsedBoost"
      :remaining-boosts="remainingBoosts"
      @boost-consumed="boostConsumed"
      @change="showUseIncrement = !showUseIncrement"
    />

    <BuyIncrement
      :value="showBuyIncrement"
      @change="showBuyIncrement = false"
    />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Modal from '../layout/Modal.vue'
import UseIncrement from './UseIncrement.vue'
import BuyIncrement from './BuyIncrement.vue'
import { users } from '~/store'

interface BoostData {
  boostAvailableIn: number
  remainingBoosts: number
  position: number
}

@Component({ components: { UseIncrement, BuyIncrement, Modal } })
export default class IncrementVisibilityModal extends Vue {
  @Prop({ default: 0 })
  remainingBoosts!: number

  @Prop({ default: 0 })
  position: number

  @Prop({ default: 0 })
  remainingTimeToUseBoost!: number

  updatedRemainingTimeToBoost: number = 0
  updateInterval: any = null
  @Watch('remainingTimeToUseBoost')
  updateRemaining(val: number) {
    this.updatedRemainingTimeToBoost = val
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
    this.updateInterval = setInterval(() => {
      this.updatedRemainingTimeToBoost -= 1000
    }, 1000)
  }

  created() {
    this.updateRemaining(this.remainingTimeToUseBoost)
  }

  get hasUsedBoost() {
    return this.remainingTimeToUseBoost > 0
  }

  get updatedRemainingTime() {
    let remaining = this.updatedRemainingTimeToBoost
    if (remaining <= 0) remaining = 0
    return remaining
  }

  get formattedRemainingTime() {
    // Get hours from milliseconds
    const hours = this.updatedRemainingTime / (1000 * 60 * 60)
    const absoluteHours = Math.floor(hours)
    const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours

    // Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60
    const absoluteMinutes = Math.floor(minutes)
    const m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes

    // Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60
    const absoluteSeconds = Math.floor(seconds)
    const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds

    return h + ':' + m + ':' + s
  }

  get hasBoostsAvailable() {
    return this.remainingBoosts > 0 && this.updatedRemainingTime <= 0
  }

  get canUseBoost() {
    return this.hasBoostsAvailable
  }

  @Prop({ default: () => false })
  shouldShowBuyIncrementOption!: boolean

  @Prop({ default: () => false })
  shouldUseAnIncrement!: boolean

  showUseIncrement: boolean = false
  showBuyIncrement: boolean = false

  shouldShowModal() {
    if (!this.remainingBoosts) {
      this.showBuyIncrement = true
    } else {
      this.showUseIncrement = true
    }
  }

  useIncrementModalIsClose() {
    this.showUseIncrement = false
  }

  buyIncrementModalIsClose() {
    this.showBuyIncrement = false
  }

  boostConsumed(data: BoostData) {
    users.updateBoostAmount(data.remainingBoosts)
    users.setBoostAvailableIn(data.boostAvailableIn)

    users.updateCurrentPosition(data.position)
  }
}
</script>

<style>
.buy-increment {
  @apply bg-[#515654] shadow-5xl hover:(shadow-8xl shadow-[#515654]) shadow-[#515654];
}
</style>
