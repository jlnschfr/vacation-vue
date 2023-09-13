<script setup lang="ts">
import FileIcon from './icons/FileIcon.vue'
import UploadIcon from './icons/UploadIcon.vue'
import CheckedIcon from './icons/CheckedIcon.vue'
import SendIcon from './icons/SendIcon.vue'
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
  if (!files.length) return
  if (!(files[0].type.includes('image/png') || files[0].type.includes('image/jpeg'))) {
    state.value = 'default'
    return
  }

  state.value = 'dropped'
  file.value = files[0]
  emits('fileUpdated', file.value)
}
</script>

<template>
  <div
    class="outer"
    :class="{
      isOver: state === 'over',
      isDropped: state === 'dropped'
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

    <Transition>
      <div v-if="isProcessing" class="animation">
        <SendIcon class="icon" />
        <SendIcon class="icon" />
        <SendIcon class="icon" />
        <SendIcon class="icon" />
        <SendIcon class="icon" />
        <SendIcon class="icon" />
        <SendIcon class="icon" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.outer {
  background: linear-gradient(var(--color-coral), var(--color-purple));
  block-size: 20rem;
  margin-block-start: 3rem;
  padding: 1rem;
  position: relative;
  transition: all 150ms ease-in-out;
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

.outer.isOver {
  padding: 0;
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
  left: -50%;
  position: absolute;
  top: 150%;
}

.animation .icon:nth-child(1) {
  animation: animation 4500ms 0ms linear infinite;
  width: 5rem;
}

.animation .icon:nth-child(2) {
  animation: animation 3500ms 500ms linear infinite;
  transform: translate3d(0, -150%, 0);
  width: 8rem;
}

.animation .icon:nth-child(3) {
  animation: animation 5000ms 1000ms linear infinite;
  transform: translate3d(0, 0, 0);
  width: 8rem;
}

.animation .icon:nth-child(4) {
  animation: animation 5500ms 1500ms linear infinite;
  transform: translate3d(0, -100%, 0);
  width: 12rem;
}

.animation .icon:nth-child(5) {
  animation: animation 4000ms 2000ms linear infinite;
  transform: translate3d(0, -300%, 0);
  width: 4rem;
}

.animation .icon:nth-child(6) {
  animation: animation 3500ms 2500ms linear infinite;
  transform: translate3d(0, -50%, 0);
  width: 6rem;
}

.animation .icon:nth-child(7) {
  animation: animation 5500ms 3000ms linear infinite;
  transform: translate3d(0, 100%, 0);
  width: 8rem;
}

.animation .icon:nth-child(8) {
  animation: animation 4500ms 3500ms linear infinite;
  transform: translate3d(0, -200%, 0);
  width: 12rem;
}

@keyframes animation {
  from {
    left: -50%;
    top: 150%;
  }

  to {
    left: 150%;
    top: -50%;
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
