<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader-wrapper {
  width: 20px;
  display: flex;
  justify-content: center;
  align-self: center;
}
.loader {
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: #e0e0e0;
  border-right-color: #616161;
  animation: rotate 1s linear infinite;
}
</style>
