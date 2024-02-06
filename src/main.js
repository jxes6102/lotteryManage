import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/none.css'
import './assets/main.css'
import './assets/css/tailwind.css'
import './assets/css/index.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhTW from 'element-plus/dist/locale/zh-tw.mjs'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhTW,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
