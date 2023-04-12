<template>
  <div class="group relative">
    <div
      class="z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-200 filter blur-md absolute"
    >
      <slot />
    </div>

    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>
