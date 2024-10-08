import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

const pinia = createPinia()

import router from './router'

createApp(App).use(pinia).use(router).mount('#app')
