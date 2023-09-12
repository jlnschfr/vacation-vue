<script setup lang="ts">
import Input from './UI_Input.vue'
import DragAndDrop from './UI_DragAndDrop.vue'
import Button from './UI_Button.vue'
import { reactive, ref, type Ref } from 'vue'
import { createApi } from 'unsplash-js'
import imglyRemoveBackground from '@imgly/background-removal'
import mergeImages from 'merge-images'

const query: Ref<string> = ref('')
const file: Ref<File | undefined> = ref()
const mergedImageSrc: Ref<string> = ref('')
const isProcessing: Ref<boolean> = ref(false)
const isDone: Ref<boolean> = ref(false)
const hasError: Ref<boolean> = ref(false)

const aspectRatio = reactive({
  width: 0,
  height: 0
})

function onInput(input: string) {
  query.value = input
  hasError.value = false
}

function onFileUpdate(userFile: File) {
  file.value = userFile
  hasError.value = false
}

function getButtonLabel() {
  if (isProcessing.value) {
    return 'You are traveling...'
  } else if (isDone.value) {
    return 'I want to do it again!'
  } else {
    return 'Start my adventure'
  }
}

async function onSubmit() {
  if (!query.value || !file.value) {
    hasError.value = true
    return
  }

  if (isDone.value) {
    location.reload()
  }

  isProcessing.value = true
  const sources: string[] = await Promise.all([removeBackground(file.value), getRandomImage()])
  mergedImageSrc.value = await mergeImages(sources.reverse())

  isProcessing.value = false
  isDone.value = true
}

function removeBackground(file: File): Promise<string> {
  let config = {
    publicPath: 'public',
    model: 'small'
  }
  return new Promise((resolve) => {
    imglyRemoveBackground(file, config).then((blob: Blob) => {
      const url: string = URL.createObjectURL(blob)
      resolve(url)
    })
  })
}

function getRandomImage(): Promise<string> {
  const unsplash = createApi({ accessKey: 'H77B8WG-2ePtnxonLBTJAPs8gomrotELt1J-9fbvVOQ' })
  return new Promise((resolve) => {
    unsplash.photos.getRandom({ query: query.value }).then((result) => {
      if (result.errors) {
        console.log('error occurred: ', result.errors[0])
      } else {
        console.log(result.response)
        const imageUrl: string = result.response.urls.regular
        aspectRatio.width = result.response.width
        aspectRatio.height = result.response.height

        console.log(aspectRatio.width)
        console.log(aspectRatio.height)

        fetch(imageUrl).then((response) =>
          response.blob().then((blob) => {
            const randomPhotoUrl = URL.createObjectURL(blob)
            resolve(randomPhotoUrl)
          })
        )
      }
    })
  })
}
</script>

<template>
  <form class="VacationForm" @submit.prevent="onSubmit">
    <Input type="text" id="keyword-input" placeholder="your location keywords" @input="onInput" />
    <DragAndDrop @fileUpdated="onFileUpdate" :isProcessing="isProcessing" v-if="!mergedImageSrc" />
    <img v-if="mergedImageSrc" :src="mergedImageSrc" />
    <Button class="Button" type="submit" :label="getButtonLabel()" :disabled="isProcessing" />
    <p class="error u-text-small" :class="{ hidden: !hasError }">
      You need to add an image and keywords!
    </p>
  </form>
</template>

<style scoped>
.VacationForm,
.Button {
  margin-block-start: 3rem;
}

img {
  width: 100%;
}

.error {
  color: var(--color-red);
  margin-block-start: 0.5rem;
}
.error.hidden {
  display: none;
}
</style>
