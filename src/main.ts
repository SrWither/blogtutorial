import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initDB } from './api/connect'

const bootstrap = async () => {
  const app = createApp(App)
  await initDB()

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

bootstrap()
