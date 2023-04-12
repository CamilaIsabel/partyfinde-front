<template>
  <div class="relative select-none">
    <Dropdown direction="down" attach="right">
      <template #opener>
        <img class="w-8 block" :src="flagIcon" :alt="countryName" />
      </template>
      <template #items>
        <DropdownItem
          v-for="flag in flags.values()"
          :key="flag.id"
          @click="selectCountry(flag)"
        >
          <div class="flex flex-nowrap items-center justify-start gap-2">
            <img :src="flag.image" class="block w-8 h-8" :alt="flag.name" />
            <span class="font-bold tracking-wide">{{ flag.name }}</span>
          </div>
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Dropdown from './dropdown/Dropdown.vue'
import DropdownItem from './dropdown/DropdownItem.vue'
import flags, { Flag, UnknownFlag } from '~/lib/country/Flags'

@Component({ components: { Dropdown, DropdownItem } })
export default class CountryDropdown extends Vue {
  flags: Map<String, Flag> = flags
  selectedCountry: string = 'uruguay'

  // TODO: select country
  selectCountry(_flag: Flag) {
    alert('No implementado (aún)')
  }

  get selectedFlag(): Flag {
    return this.flags.get(this.selectedCountry) ?? UnknownFlag
  }

  get countryName(): string {
    return this.selectedFlag.name
  }

  get flagIcon(): string {
    return this.selectedFlag.image
  }
}
</script>
