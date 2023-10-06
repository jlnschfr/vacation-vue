<script setup lang="ts">
import VacationForm from './components/VacationForm.vue'

const response = await fetch('/.netlify/functions/random-image').then((response) => response.json())
console.log(response)
</script>

<template>
  <header>
    <h1 class="u-headline-1">Send me on vacation!</h1>
    <p class="u-text">
      Transform your vacation dreams into reality with this super-realistic photo enhancement
      service. Share your destination and photo, and it’ll create stunning images you can proudly
      share with friends!
    </p>
  </header>

  <main>
    <VacationForm />
  </main>

  <footer>
    <p class="u-text-small">
      Disclaimer: No worries, none of your image data will be send to a server. We’re using a random
      image from unsplash.com based on your keywords for the background.The further image processing
      happens 100% in your browser. Wow, what a miracle of engineering!
    </p>
  </footer>
</template>

<style scoped>
header,
main,
footer {
  margin: 0 auto;
  margin-block-start: 4rem;
  max-inline-size: 45rem;
  padding-inline: 2rem;
}

footer {
  margin-block-end: 4rem;
}

header h1 {
  text-align: center;
}

header p {
  margin-block-start: 1.5rem;
}
</style>
