<template>
  <div class="w-full max-w-xs md:max-w-sm flex gap-1">
    <div class="flex-grow">
      <TextBox
        v-model="search"
        placeholder="Where you going today?"
        type="text"
      ></TextBox>
    </div>
    <button
      class="sheet w-max px-3 py-1 flex rounded-md text-sm items-center flex-shrink-0"
      @click.capture="showFilter = true"
    >
      <img class="h-5 w-5" src="~/assets/icons/settings.svg" />
    </button>
    <Button
      v-if="shouldShowSmallClearButton"
      class="bg-red-500 px-3 py-2 ml-5"
      @click.capture="clear"
      >X</Button
    >
    <FilterComponent
      :value="showFilter"
      @filter="filterChange"
      @change="showFilter = false"
    />
  </div>
</template>

<script lang="ts">
import { debounce } from 'debounce'
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import Modal from '@/components/layout/Modal.vue'
import TextBox from '@/components/forms/TextBox.vue'
import FilterComponent from '@/components/search/Filter.vue'

@Component({ components: { Modal, TextBox, FilterComponent } })
export default class Search extends Vue {
  @Prop({ default: false })
  filterHasUsers!: boolean

  @Prop({ default: false })
  loading!: boolean

  filterisApply: boolean = false

  search: string = ''
  showFilter: boolean = false

  storedRegion: string = ''
  storedProvince: string = ''
  storedAgeRange: number[] = [18, 100]

  debounceFilter = debounce(this.handleFilter, 800)

  @Watch('search')
  applyDebouncedFilter() {
    this.debounceFilter()
  }

  filterChange(region: string, province: string, ageRange: number[]) {
    this.storedRegion = region
    this.storedProvince = province
    this.storedAgeRange = ageRange

    this.applyFilter()
  }

  handleFilter(){
    this.$emit(
      'filter',
      this.search,
      this.storedRegion,
      this.storedProvince,
      this.storedAgeRange
    )
    this.showFilter = false
  }

  applyFilter() {
    this.filterisApply = true
    this.handleFilter()
  }

  clear() {
    this.filterisApply = false
    this.storedRegion = ''
    this.storedProvince = ''
    this.storedAgeRange = [18, 100]
    this.search = ''
    this.handleFilter()
  }

  get shouldShowSmallClearButton(){
    return Boolean((this.filterisApply || this.search.length) && this.filterHasUsers && !this.loading);
  }
}
</script>
