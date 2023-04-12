<template>
  <div :class="disabled ? 'pointer-events-none' : ''">
    <label class="typo__label" :class="disabled ? 'opacity-60' : ''">
      <slot />
    </label>
    <t-rich-select
      class="text-white"
      :options="options"
      :value="value"
      :clearable="clearable"
      search-box-placeholder="Search..."
      :disabled="disabled"
      @input="triggerSelect"
    >
      <template #option="{ option }">
        <div
          class="m-0 flex items-center justify-start pl-4 py-2 gap-2 overflow-hidden"
        >
          <span class="font-bold truncate">{{ option.text }}</span>
        </div>
      </template>
      <template #label="{ option }">
        <div
          class="m-0 flex pl-2 items-center justify-start gap-2 overflow-hidden"
        >
          <span class="font-bold truncate">{{ option.text }}</span>
        </div>
      </template>
    </t-rich-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import usa from '~/lib/places/usa'

@Component({})
export default class SelectProvince extends Vue {
  @Prop({ default: null })
  value!: string

  @Prop({ default: 'Región Metropolitana de Santiago' })
  region!: string

  @Prop({ default: false })
  clearable!: boolean

  @Prop({ default: false })
  disabled!: boolean

  triggerSelect(val: string) {
    this.$emit('input', val)
  }

  @Watch('region')
  updatedRegion(region: string) {
    const firstProvince = usa.getProvinces(region)[0]
    this.triggerSelect(firstProvince)
  }

  get options() {
    return usa.getProvinces(this.region)
  }
}
</script>
