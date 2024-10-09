import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/styles/index.scss"
import App from './App.vue'

import 'virtual:uno.css'

const pinia = createPinia()

import router from './router'

createApp(App).use(pinia).use(router).mount('#app')
