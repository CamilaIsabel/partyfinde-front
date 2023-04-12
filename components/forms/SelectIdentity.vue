<template>
  <div :class="disabled ? 'pointer-events-none' : ''">
    <label class="typo__label" :class="disabled ? 'opacity-60' : ''">
      <slot />
    </label>
    <t-rich-select
      class="text-white"
      :options="options"
      :value="value"
      select-on-close
      value-attribute="value"
      text-attribute="name"
      search-box-placeholder="Search..."
      :hide-search-box="true"
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
import { Vue, Component, Prop } from 'vue-property-decorator'
declare let twemoji: any

@Component({})
export default class SelectIdentity extends Vue {
  @Prop({ default: null })
  value!: string

  @Prop({ default: false })
  disabled!: boolean

  parseEmoji(source: any) {
    return twemoji.parse(source)
  }

  triggerSelect(val: string) {
    this.$emit('input', val)
  }

  get options() {
    return [
      {
        name: 'Party',
        value: 'P',
      },
      {
        name: 'Event',
        value: 'E',
      },
    ]
  }
}
</script>
