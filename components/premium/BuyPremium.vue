<template>
  <div class="modal-premium-bg sm:rounded-lg py-10 mx-auto sm:px-12 max-w-7xl">
    <h1 class="text-center text-3xl mb-12">Get <b>Premium</b></h1>
    <div class="gap-12 mx-auto flex flex-wrap lg:flex-nowrap justify-center">
      <RankCard :rank="Ranks.POPULAR" @close="$emit('close')" />
      <RankCard :rank="Ranks.GOLD" @close="$emit('close')" />
      <RankCard :rank="Ranks.DIAMOND" @close="$emit('close')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Ranks } from '@/lib/rank/Rank'
import RankCard from '~/components/premium/RankCard.vue'

@Component({
  components: { RankCard },
})
export default class BuyPremiumPage extends Vue {
  Ranks = Ranks
}
</script>

<style>
.modal-premium-bg {
  background: linear-gradient(
    132.11deg,
    rgb(19 19 26) -8.08%,
    rgb(18 18 32) 100%
  );
}
</style>
