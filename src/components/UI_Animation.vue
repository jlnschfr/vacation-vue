<script setup lang="ts">
import SendIcon from './icons/SendIcon.vue'
</script>

<template>
  <div class="animation">
    <SendIcon class="icon" />
    <SendIcon class="icon" />
    <SendIcon class="icon" />
    <SendIcon class="icon" />
    <SendIcon class="icon" />
    <SendIcon class="icon" />
    <SendIcon class="icon" />
  </div>
</template>

<style scoped>
.animation {
  align-items: center;
  background-color: var(--color-red-light);
  block-size: 100%;
  color: var(--color-white);
  display: flex;
  inline-size: 100%;
  inset: 0;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  transition: all 150ms ease-in-out;
}

.animation .icon {
  block-size: auto;
  inline-size: 3rem;
  inset-block-start: 150%;
  inset-inline-start: -50%;
  position: absolute;
}

.animation .icon:nth-child(1) {
  animation: animation 4500ms 0ms linear infinite;
  inline-size: 5rem;
}

.animation .icon:nth-child(2) {
  animation: animation 3500ms 500ms linear infinite;
  inline-size: 8rem;
  transform: translate3d(0, -150%, 0);
}

.animation .icon:nth-child(3) {
  animation: animation 5000ms 1000ms linear infinite;
  inline-size: 8rem;
  transform: translate3d(0, 0, 0);
}

.animation .icon:nth-child(4) {
  animation: animation 5500ms 1500ms linear infinite;
  inline-size: 12rem;
  transform: translate3d(0, -100%, 0);
}

.animation .icon:nth-child(5) {
  animation: animation 4000ms 2000ms linear infinite;
  inline-size: 4rem;
  transform: translate3d(0, -300%, 0);
}

.animation .icon:nth-child(6) {
  animation: animation 3500ms 2500ms linear infinite;
  inline-size: 6rem;
  transform: translate3d(0, -50%, 0);
}

.animation .icon:nth-child(7) {
  animation: animation 5500ms 3000ms linear infinite;
  inline-size: 8rem;
  transform: translate3d(0, 100%, 0);
}

.animation .icon:nth-child(8) {
  animation: animation 4500ms 3500ms linear infinite;
  inline-size: 12rem;
  transform: translate3d(0, -200%, 0);
}

@keyframes animation {
  from {
    inset-block-start: 150%;
    inset-inline-start: -50%;
  }

  to {
    inset-block-start: -50%;
    inset-inline-start: 150%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 250ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
