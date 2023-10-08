# Send me on vacation

Transform your vacation dreams into reality with this super-realistic photo enhancement service. Share your destination and photo, and it’ll create stunning images you can proudly share with friends!

Disclaimer: No worries, none of your image data will be send to a server. It's using a random image from unsplash.com based on your keywords for the background. The further image processing happens 100% in your browser. Wow, what a miracle of engineering!

## Demo

https://send-me-on-vacation.netlify.app/

## Project Setup

### Install

```sh
npm install
```

### Create .env file with your unsplash API key

```
UNSPLASH_KEY="..."
```

### Compile and Hot-Reload for Development

```sh
npm run ntl
```

`npm run dev` wouldn't work locally since it needs a netlify function that provides the random image service.

## Why

This is a private fun project to learn things like

- [Vue3 (Ecosystem and Composition API)](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Netlify Functions](https://www.netlify.com/products/functions/)
- [unsplash API](https://unsplash.com/documentation)
- [imgly Background Removal](https://github.com/imgly/background-removal-js)
- [variable fonts](https://web.dev/variable-fonts/)
- [drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Out of Scope

- proper error handling
- more sophisticated accessibility features (only low hanging fruits)
- mobile device support
