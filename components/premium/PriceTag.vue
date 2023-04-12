<template>
  <div class="absolute -top-2 right-0 flex w-min">
    <svg
      width="94"
      height="75"
      viewBox="0 0 94 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.0836 73.5274C55.1334 74.4587 52.8667 74.4587 50.9164 73.5274L18.0718 57.8419C15.584 56.6538 14 54.142 14 51.3851L14 6.35572e-07L94 7.62939e-06L94 51.3851C94 54.142 92.4161 56.6538 89.9282 57.8419L57.0836 73.5274Z"
        fill="currentColor"
      />
      <path d="M0 8L14 0V8H0Z" fill="currentColor" />
      <path d="M0 8L14 0V8H0Z" fill="black" fill-opacity="0.3" />
    </svg>
    <div
      class="
        absolute
        flex flex-col
        w-full
        h-full
        place-items-center
        top-0
        left-0
        pl-[14px]
        pt-4
        text-shadow-lg
      "
    >
      <span class="text-white font-black text-[18px]">U$D {{ price }}</span>
      <span class="leading-5 text-white text-[12px] font-semibold">/ month</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class PriceTag extends Vue {
  @Prop({ default: '' })
  price!: string
}
</script>
