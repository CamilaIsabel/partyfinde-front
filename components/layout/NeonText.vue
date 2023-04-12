<template>
  <div :class="{ active: active }" class="relative neon-text-container">
    <span class="absolute neon-text-placeholder z-20 transition-all">
      <slot />
    </span>
    <span class="relative neon-text z-10 transition-all"><slot /></span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
.neon-text {
  color: rgba(255, 255, 255, 0.35);
  user-select: none;
}
.neon-text-container:hover .neon-text,
.neon-text-container.active .neon-text {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 0 48px #0500FF;
}

.neon-text-placeholder {
  filter: blur(7px);
  user-select: none;
  opacity: 0;
  color: #0500FF;
}

.neon-text-container:hover .neon-text-placeholder,
.neon-text-container.active .neon-text-placeholder {
  opacity: 0.8;
}
</style>
