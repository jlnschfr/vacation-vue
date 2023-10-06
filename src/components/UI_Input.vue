<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  type: string
  hasLabel?: boolean
  placeholder: string
  id: string
  value?: string
  disabled: boolean
}

defineEmits(['input'])

const props = withDefaults(defineProps<Props>(), {
  hasLabel: true,
  disabled: false,
  value: ''
})

const inputValue = ref(props.value)
</script>

<template>
  <div>
    <label v-if="hasLabel" :for="id" :class="{ isHidden: !inputValue }" class="u-text-small">
      {{ placeholder }}
    </label>
    <input
      :id="id"
      :disabled="disabled"
      class="u-text"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('input', inputValue)"
    />
  </div>
</template>

<style scoped>
div {
  inline-size: 100%;
}

label {
  display: block;
  padding-inline: 1rem;
  transition: all 150ms;
}

.isHidden {
  opacity: 0;
  transform: translateY(50%);
}

input {
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--color-text);
  display: block;
  inline-size: 100%;
  padding: 0.5rem 1rem;
  text-decoration: none;
}

input::placeholder {
  color: var(--color-text);
  opacity: 1;
}
</style>
