<template>
  <div class="erroricon"></div>
</template>

<style scoped>
@keyframes circleAnimation {
  from {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
}

@keyframes firstLineAnimation {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes secondLineAnimation {
  from {
    transform: scale(0) rotate(90deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(90deg);
    opacity: 1;
  }
}

.erroricon {
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: #ff4b4b;
  position: relative;
  transform: rotate(45deg);
  animation: circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
}

.erroricon::after,
.erroricon::before {
  content: '';
  animation: firstLineAnimation 0.15s ease-out forwards;
  animation-delay: 150ms;
  position: absolute;
  border-radius: 3px;
  opacity: 0;
  background: #fff;
  bottom: 9px;
  left: 4px;
  height: 2px;
  width: 12px;
}

.erroricon::before {
  animation: secondLineAnimation 0.15s ease-out forwards;
  animation-delay: 180ms;
  transform: rotate(90deg);
}
</style>
