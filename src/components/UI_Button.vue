<script setup lang="ts">
export interface Props {
  type: 'button' | 'submit' | 'reset'
  label: string
  disabled?: boolean
}

defineEmits(['click'])
defineProps<Props>()
</script>

<template>
  <button :type="type" :disabled="disabled" class="u-text">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-coral);
  border: none;
  color: var(--color-white);
  cursor: pointer;
  padding: 0.5rem 2.5rem;
}

button:disabled {
  color: var(--color-red-light);
  cursor: default;
}
</style>
