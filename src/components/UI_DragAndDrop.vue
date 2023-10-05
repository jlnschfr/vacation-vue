<script setup lang="ts">
import FileIcon from './icons/FileIcon.vue'
import UploadIcon from './icons/UploadIcon.vue'
import CheckedIcon from './icons/CheckedIcon.vue'
import Animation from './UI_Animation.vue'
import { ref, type Ref } from 'vue'

export interface Props {
  isProcessing: boolean
}

withDefaults(defineProps<Props>(), {
  isProcessing: false
})

const emits = defineEmits(['fileUpdated'])

const state: Ref<'default' | 'dropped' | 'over'> = ref('default')
const file: Ref<File | undefined> = ref()

function onDrop(event: DragEvent): void {
  if (!event.dataTransfer) return
  const dataTransfer: DataTransfer = event.dataTransfer
  const files: FileList = dataTransfer.files
  setDropped(files)
}

function onChange(event: Event): void {
  if (!event.target) return
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
    class="Outer"
    :class="{
      isOver: state === 'over',
      isDropped: state === 'dropped'
    }"
  >
    <div
      class="Inner"
      @dragover.prevent="state = 'over'"
      @dragleave.prevent="state = 'default'"
      @drop.prevent="onDrop"
    >
      <div class="Text" v-if="state === 'default'">
        <FileIcon class="Icon" />
        <input id="file" type="file" accept="image/png, image/jpeg" @change="onChange" />
        <label for="file" class="u-text-bold">Choose a file or drag it here.</label>
      </div>
      <div class="Text" v-else-if="state === 'over'">
        <UploadIcon class="Icon" />
        <p for="file" class="u-text-bold">Drop your file to proceed.</p>
      </div>
      <div class="Text" v-else-if="state === 'dropped' && file?.name">
        <CheckedIcon class="Icon" />
        <p for="file" class="u-text-bold">{{ file.name }} selected</p>
      </div>
    </div>

    <Transition>
      <Animation v-if="isProcessing" />
    </Transition>
  </div>
</template>

<style scoped>
.Outer {
  background: linear-gradient(var(--color-coral), var(--color-purple));
  block-size: 20rem;
  padding: 1rem;
  position: relative;
  transition: all 150ms ease-in-out;
}

.Inner {
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

.Outer.isOver {
  padding: 0;
}

.Outer.isOver .Inner {
  background-color: var(--color-red-light);
  border: 0.25rem dashed var(--color-white);
  color: var(--color-white);
}

.Text {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

input {
  block-size: 0.1px;
  inline-size: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  cursor: pointer;
}

input:focus + label {
  outline: 1px dotted blue;
  outline: 1px dotted -webkit-focus-ring-color;
}

.Icon {
  block-size: auto;
  inline-size: 3rem;
}
</style>
