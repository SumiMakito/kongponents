# Vue 3 Changelog

This file is a temporary list of changes that will be referenced to create a Migration page on the docs site for users migrating from the Vue 2 version to the new version of Kongponents (on the `next` branch) that utilizes Vue 3 and the Composition API.

## Installation

```ts
// main.ts + Vite

import { createApp } from 'vue'
import App from './App.vue'
import Kongponents from '@kong/kongponents'
import '/node_modules/@kong/kongponents/dist/style.css'

const app = createApp(App)

// @ts-ignore
app.use(Kongponents)

app.mount('#app')
```

```ts
// vite.config.ts

import { fileURLToPath, URL } from 'url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // IMPORTANT: otherwise you get an error 'Cannot read property 'isCE' of null': https://github.com/vuejs/core/issues/4344#issuecomment-1053636961
    dedupe: ['vue']
  }
})

```

## Components

### KInput

- `v-model` is now mapped to `modelValue` prop, and emits `input` and `update:modelValue` events.

### KBreadcrumbs

- `Kcrumbs` component is now `KBreadcrumbs`

### KComponent

- `Komponent` component is now `KComponent`

### KTooltip

- `Kooltip` component is now `KTooltip`