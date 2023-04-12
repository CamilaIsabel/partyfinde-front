<template>
  <div
    class="shadow-6xl align-end rounded-xl w-67 min-h-110 relative px-5 pb-5 bg-buy-premium text-left flex flex-wrap content-between flex-wrap content-center border border-[#37383C]"
  >
    <div class="relative">
      <PriceTag :price="rank.price" :class="rank.styledColors.base.textColor" />
      <div class="pt-12 relative">
        <RankIcon
          :rank-icon="rank.icon"
          class="absolute transform -translate-y-full bottom-2 w-5 h-6"
        />
        <h1
          class="text-lg md:text-[28px] font-black capitalize"
          :class="rank.styledColors.light.textColor"
        >
          {{ rank.name }}
        </h1>
      </div>

      <p class="text-sm font-normal text-gray-400 mt-5">
        {{ rank.description }}
      </p>

      <div class="mt-5 h-[0.08px] w-full bg-gray-600"></div>

      <div class="text-sm px-1 mt-5 text-gray-400">
        <div
          v-for="(feat, index) in getFeats"
          :key="index"
          class="flex items-center mb-2"
        >
          <img class="h-4 w-4 mr-2" src="@/assets/icons/tick.svg" />
          <p>{{ feat }}</p>
        </div>
      </div>
    </div>

    <Button
      :disabled="loading"
      :class="
        !loading ? `${rank.styledColors.base.textColor} hover:(bg-current)` : ''
      "
      class="font-black text-sm uppercase border w-full h-6 rounded-md border-[#37383C] text-shadow-lg transition-colors group"
      @disabled="loading"
      @click="clickedRankButton(rank)"
    >
      <div
        :class="loading ? 'pointer-events-none' : 'pointer-events-auto'"
        class="h-full block w-full group-hover:text-white text-[#878991] flex items-center justify-center"
      >
        <span v-if="!loading">Buy</span>
        <Loader v-else class="mx-auto" />
      </div>
    </Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Button from '../Button.vue'
import Loader from '../atomic/icon/Loader.vue'
import PriceTag from './PriceTag.vue'
import { Rank } from '~/lib/rank/Rank'
import RankIcon from '~/components/premium/RankIcon.vue'
import { getFeats } from '~/lib/rank/FeatsManager'
import { users } from '~/store'
import axios from '~/lib/axios'

@Component({ components: { PriceTag, RankIcon, Button, Loader } })
export default class RangeCard extends Vue {
  @Prop({ required: true })
  rank!: Rank

  loading: boolean = false

  get getFeats() {
    return getFeats(this.rank)
  }

  async clickedRankButton(rank: Rank) {
    if (!users.isLoggedIn) {
      this.$router.push('/login')
      this.$emit('close')
      return
    }

    this.loading = true
    const request = await axios.post('payment/purchase/rank', {
      rankName: rank.name,
    })
    this.loading = false

    window.open(request.data.url, '_blank')
  }
}
</script>
