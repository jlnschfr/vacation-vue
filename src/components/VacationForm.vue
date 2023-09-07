<script setup lang="ts">
import Input from './UI_Input.vue'
import DragAndDrop from './UI_DragAndDrop.vue'
import Button from './UI_Button.vue'
import { ref, type Ref } from 'vue'

const keywords: Ref<string> = ref('')

const onInput = (input: string) => {
  keywords.value = input
}

const onSubmit = (payload: Event) => {
  console.log(payload)
}
</script>

<template>
  <form class="VacationForm" @submit.prevent="onSubmit">
    <Input type="text" id="keyword-input" placeholder="your location keywords" @input="onInput" />
    <DragAndDrop />
    <Button class="Button" type="submit" label="Start my adventure" />
  </form>
</template>

<style scoped>
.VacationForm,
.Button {
  margin-block-start: 3rem;
}
</style>
