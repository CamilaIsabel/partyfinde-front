<template>
  <Modal :value="value" @change="close">
    <div class="buy-increment-container">
      <div
        class="shadow-6xl align-end rounded-xl w-67 h-80 relative px-5 pb-5 bg-buy-premium text-left my-auto mx-auto flex flex-wrap content-between flex-wrap content-center border border-[#37383C]"
      >
        <div class="relative">
          <div class="pt-12 relative">
            <img
              class="absolute transform -translate-y-full -left-1 px-0 bottom-4 w-4 h-5"
              src="~/assets/icons/arrow.svg"
            />
            <h1 class="text-[28px] font-black text-green-500 capitalize">
              Increments
            </h1>
          </div>

          <p class="text-sm font-normal text-gray-400 mt-5">
            Pack of increments, use them to position yourself at the top of your section.
          </p>
        </div>

        <div class="grid gap-2 w-full">
          <BuyIncrementButton
            v-for="(pakg, idx) in packages"
            :key="idx"
            :price="pakg.price"
            :boost-amount="pakg.amount"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Loader from '../atomic/icon/Loader.vue'
import BuyIncrementButton from './BuyIncrementButton.vue'
import Modal from '@/components/layout/Modal.vue'

@Component({ components: { Modal, Loader, BuyIncrementButton } })
export default class BuyIncrement extends Vue {
  @Prop({ default: false })
  value!: boolean

  close() {
    this.$emit('change', false)
  }

  packages = [
    { price: 5, amount: 1 },
    { price: 8, amount: 3 },
    { price: 12, amount: 5 },
  ]
}
</script>

<style>
.buy-increment-container .price {
  @apply text-green-500;
}
.buy-increment-container button:hover .price {
  @apply text-current;
}
</style>
