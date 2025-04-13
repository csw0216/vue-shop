import './assets/css/global.css'
import 'element-plus/dist/index.css';
import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 全局方式引用axios 
import axios from "axios"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
// app.use(element)
app.config.globalProperties.$axios = axios
app.use(createPinia())
app.use(router)
// 在组件中调用
// this.$axios
app.mount('#app')