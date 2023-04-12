<template>
  <button
    :disabled="loading"
    class="pointer-events-none font-black text-sm uppercase border w-full h-min rounded-md border-[#37383C] hover:(bg-green-600) transition-colors"
    @click="buyIncrement"
  >
    <div
      :class="loading ? 'pointer-events-none' : 'pointer-events-auto'"
      class="pointer-events-auto flex items-center justify-center h-6 block w-full hover:text-white text-[#878991]"
    >
      <p v-if="!loading">
        Buy x{{ boostAmount }}
        <span class="price">{{ price }} U$D</span>
      </p>
      <Loader v-else class="mx-auto" />
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Loader from '../atomic/icon/Loader.vue'
import Modal from '@/components/layout/Modal.vue'
import axios from '~/lib/axios'

@Component({ components: { Modal, Loader } })
export default class BuyIncrementButton extends Vue {
  @Prop({ required: true })
  boostAmount: number

  @Prop({ required: true })
  price: number

  loading: boolean = false

  async buyIncrement() {
    this.loading = true
    const boostAmount = this.boostAmount
    const request = await axios.post('payment/purchase/boost', {
      boostAmount,
    })

    this.loading = false

    window.open(request.data.url, '_blank')
  }
}
</script>
