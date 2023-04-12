<template>
  <Modal :value="value" @change="close">
    <div
      class="w-screen sm:w-md shadow-6xl align-end rounded-xl relative px-8 pb-5 bg-buy-premium text-left my-auto mx-auto content-between content-center border border-[#37383C]"
    >
      <div class="mt-5">
        <span class="text-2xl font-bold">Filters</span>
      </div>
      <div class="mt-5">
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium">Party attendance age</span>
          <span class="text-sm font-medium"
            >{{ ageRange[0] }}-{{ ageRange[1] }}</span
          >
        </div>
        <div class="mt-3 pl-2">
          <Slider :value="ageRange" @change="updateVal" />
        </div>
      </div>
      <!-- <SelectProvince v-model="city" clearable class="city my-4">
        Departamento
      </SelectProvince> -->

      <SelectRegion v-model="region" class="region my-4"> Region </SelectRegion>
      <SelectProvince
        v-if="false"
        v-model="province"
        :region="region"
        class="provinces my-4"
      >
        Provinces
      </SelectProvince>
      <button
        class="pointer-events-none font-black text-sm uppercase border w-full h-min rounded-md border-[#37383C] text-shadow-lg hover:(bg-[#FA4868]) transition-colors"
        @click="applyFilter"
      >
        <span
          class="pointer-events-auto py-1 block w-full hover:text-white text-[#878991]"
          > Apply </span
        >
      </button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SelectRegion from '../forms/SelectRegion.vue'
import SelectProvince from '../forms/SelectProvince.vue'
import Slider from '@/components/forms/Slider.vue'

import Modal from '@/components/layout/Modal.vue'

@Component({ components: { Modal, Slider, SelectProvince, SelectRegion } })
export default class FilterComponent extends Vue {
  @Prop({ default: false })
  value!: boolean

  ageRange: number[] = [18, 30]

  city: string = ''

  region: string = ''

  province: string = ''

  updateVal(val: number[]) {
    this.ageRange = val
  }

  close() {
    this.$emit('change', false)
  }

  applyFilter() {
    const region = this.region
    const province = this.province
    const ageRange = this.ageRange
    this.$emit('filter', region, province, ageRange)
  }
}
</script>
