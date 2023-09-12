<script setup lang="ts">
import FileIcon from './icons/FileIcon.vue'
import UploadIcon from './icons/UploadIcon.vue'
import CheckedIcon from './icons/CheckedIcon.vue'
import { ref, type Ref } from 'vue'

export interface Props {
  isProcessing: boolean
}

withDefaults(defineProps<Props>(), {
  isProcessing: false
})

const emits = defineEmits(['fileUpdated'])

const state: Ref<string> = ref('default')
const file: Ref<File | undefined> = ref()

function onDrop(event: DragEvent): void {
  const dataTransfer: DataTransfer = event.dataTransfer as DataTransfer
  const files: FileList = dataTransfer.files as FileList
  setDropped(files)
}

function onChange(event: Event): void {
  const target: HTMLInputElement = event.target as HTMLInputElement
  const files: FileList = target.files as FileList
  setDropped(files)
}

function setDropped(files: FileList): void {
  state.value = 'dropped'

  if (files.length) {
    file.value = files[0]
    emits('fileUpdated', file.value)
  }
}
</script>

<template>
  <div
    class="outer"
    :class="{
      isOver: state === 'over',
      isDropped: state === 'dropped',
      isProcessing: isProcessing
    }"
  >
    <div
      class="inner"
      @dragover.prevent="state = 'over'"
      @dragleave.prevent="state = 'default'"
      @drop.prevent="onDrop"
    >
      <div class="text" v-if="state === 'default'">
        <FileIcon class="icon" />
        <input id="file" type="file" accept="image/png, image/jpeg" @change="onChange" />
        <label for="file" class="u-text-bold">Choose a file or drag it here.</label>
      </div>
      <div class="text" v-else-if="state === 'over'">
        <UploadIcon class="icon" />
        <p for="file" class="u-text-bold">Drop your file to proceed.</p>
      </div>
      <div class="text" v-else-if="state === 'dropped' && file?.name">
        <CheckedIcon class="icon" />
        <p for="file" class="u-text-bold">{{ file.name }} selected</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer {
  background: linear-gradient(var(--color-coral), var(--color-purple));
  block-size: 20rem;
  margin-block-start: 3rem;
  padding: 1rem;
  transition: all 150ms ease-in-out;
}

.outer.isProcessing,
.outer.isProcessing .inner {
  background-color: #00f !important;
}

.outer.isOver {
  padding: 0;
}

.inner {
  align-items: center;
  background-color: var(--color-white);
  block-size: 100%;
  border: 0.25rem dashed transparent;
  color: var(--color-coral);
  display: flex;
  inline-size: 100%;
  justify-content: center;
  transition: all 150ms ease-in-out;
}

.outer.isOver .inner {
  background-color: var(--color-red-light);
  border: 0.25rem dashed var(--color-white);
  color: var(--color-white);
}

.text {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}

label {
  cursor: pointer;
}

input:focus + label {
  outline: 1px dotted blue;
}

.icon {
  height: auto;
  width: 3rem;
}
</style>
