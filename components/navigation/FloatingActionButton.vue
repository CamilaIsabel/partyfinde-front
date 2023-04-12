<template>
  <div @click="trigger" class="cursor-pointer">
    <div
      class="
        fixed
        flex
        items-center
        justify-center
        w-16
        h-16
        text-white
        bg-white
        border border-white
        rounded-full
        border-opacity-20
        bottom-4
        right-4
        lg:hidden
        focus:outline-none
        focus-visible:ring
        bg-opacity-10
        backdrop-filter backdrop-blur
        firefox:bg-opacity-90 firefox:bg-gray-800
      "
    >
      <img
        src="~/assets/icons/menubar.svg"
        class="w-5 h-5 mx-auto"
        alt="Account icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    trigger() {
      this.$emit('click')
    },
  },
}
</script>
