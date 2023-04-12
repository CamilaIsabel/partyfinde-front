<template>
  <Modal :value="value" @change="close">
    <div class="sheet w-80 xl:w-120 px-8 py-5">
      <div class="flex items-center mb-5">
        <h2 class="mr-2 font-bold xl:text-2xl text-xl">
          Increase visibility
        </h2>
        <img class="h-3 w-3" src="~/assets/icons/arrow.svg" />
      </div>
      <p class="text-justify mb-5">
        The increments will allow you to move to the top of the section 
        where you are, this will give you more visibility 
        making it attract more people.
      </p>

      <div class="mt-10 grid xl:justify-end xl:grid-flow-col">
        <Button
          class="py-[6px] order-last xl:order-none font-black text-sm uppercase border px-4 rounded-md border-[#37383C] hover:border-white text-shadow-lg transition-colors hover:text-white text-[#878991]"
          @click="close"
        >
          <span>Cancel</span>
        </Button>
        <Button
          class="mb-4 xl:ml-4 bg-green-500 xl:mb-0 shadow-5xl hover:(shadow-8xl shadow-green-500) shadow-green-500 items-center justify-center border-2 border-transparent rounded-md uppercase py-[6px] px-4 text-[14px] font-bold whitespace-nowrap flex"
          @click="useBoost"
        >
          <span class="mr-2">Increase</span>
          <img class="h-3 w-3" src="~/assets/icons/arrow.svg" />
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Button from '../Button.vue'
import Modal from '@/components/layout/Modal.vue'
import UsersService from '~/lib/service/UsersService'
import Toaster from '~/lib/toaster/Toaster'

@Component({ components: { Modal, Button } })
export default class FreeBoost extends Vue {
  @Prop({ default: false })
  value!: boolean

  useBoost() {
    const useBoostPromise = UsersService.useFreeBoost()
    Toaster.promise(useBoostPromise, {
      loading: 'Cargando',
      success: 'Boost aplicado',
    })
    useBoostPromise.then(({ data }) => {
      this.$emit('boost-consumed', data)
    })
  }

  close() {
    this.$emit('input', false)
  }
}
</script>
