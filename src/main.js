import './assets/main.css'

import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(createPinia())
app.use(router)

app.mount('#app')
