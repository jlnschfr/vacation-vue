<script setup lang="ts">
import Input from './UI_Input.vue'
import DragAndDrop from './UI_DragAndDrop.vue'
import Button from './UI_Button.vue'
import { ref, type Ref } from 'vue'
import { createApi } from 'unsplash-js'
import imglyRemoveBackground, { type Config } from '@imgly/background-removal'
import mergeImages from 'merge-images'
import type { Random } from 'unsplash-js/dist/methods/photos/types'

const query: Ref<string> = ref('')
const file: Ref<File | undefined> = ref()
const mergedImageSrc: Ref<string> = ref('')
const isProcessing: Ref<boolean> = ref(false)
const isDone: Ref<boolean> = ref(false)
const hasError: Ref<boolean> = ref(false)
const orientation: Ref<Orientation> = ref('landscape')

type Orientation = 'landscape' | 'portrait' | 'squarish'

interface ImageSource {
  blob: Blob
  url: string
}

interface Details {
  width: number
  height: number
  orientation: Orientation
}

function onInput(input: string) {
  query.value = input
  hasError.value = false
}

async function onFileUpdate(userFile: File) {
  file.value = userFile
  hasError.value = false

  const details = await getImageDetails(file.value)
  orientation.value = details.orientation
}

function getImageDetails(source: File | Blob): Promise<Details> {
  return new Promise<Details>((resolve) => {
    const reader = new FileReader()
    const img = new Image()

    reader.addEventListener(
      'load',
      () => {
        img.addEventListener('load', () => {
          const ratio = img.width / img.height
          let orientation: Orientation

          if (ratio > 1) {
            orientation = 'landscape'
          } else if (ratio < 1) {
            orientation = 'portrait'
          } else {
            orientation = 'squarish'
          }

          resolve({
            orientation,
            width: img.width,
            height: img.height
          })
        })

        if (typeof reader.result === 'string') img.src = reader.result
      },
      false
    )

    reader.readAsDataURL(source)
  })
}

function getRandomImage(): Promise<ImageSource> {
  const unsplash = createApi({ accessKey: 'H77B8WG-2ePtnxonLBTJAPs8gomrotELt1J-9fbvVOQ' })
  return new Promise((resolve) => {
    unsplash.photos
      .getRandom({ query: query.value, orientation: orientation.value })
      .then((result) => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0])
        } else {
          const response: Random = Array.isArray(result.response)
            ? result.response[0]
            : result.response
          const imageUrl: string = response.urls.regular

          fetch(imageUrl).then((response) =>
            response.blob().then((blob) => {
              const url = URL.createObjectURL(blob)
              resolve({ url, blob })
            })
          )
        }
      })
  })
}

function removeBackground(file: File): Promise<ImageSource> {
  let config: Config = {
    publicPath: 'public',
    model: 'medium'
  }
  return new Promise((resolve) => {
    imglyRemoveBackground(file, config).then((blob: Blob) => {
      const url: string = URL.createObjectURL(blob)
      resolve({ url, blob })
    })
  })
}

async function merge(background: ImageSource, foreground: ImageSource) {
  const details: Details = await getImageDetails(foreground.blob)
  const config: Config = {
    width: details.width,
    height: details.height
  }

  return await mergeImages([foreground.url, background.url], config)
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
  const [imageBackground, imageForeground]: ImageSource[] = await Promise.all([
    removeBackground(file.value),
    getRandomImage()
  ])

  mergedImageSrc.value = await merge(imageBackground, imageForeground)
  isProcessing.value = false
  isDone.value = true
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
  inline-size: 100%;
}

.error {
  color: var(--color-red);
  margin-block-start: 0.5rem;
}

.error.hidden {
  display: none;
}
</style>
