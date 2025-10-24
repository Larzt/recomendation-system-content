import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createI18n} from 'vue-i18n'
import PhosphorIcons from '@phosphor-icons/vue'
import App from './App.vue'

import es from '@/locales/es.json'
import en from '@/locales/en.json'

const app = createApp(App)
const pinia = createPinia();
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es }
})


app.use(pinia);
app.use(PhosphorIcons);
app.use(i18n);
app.mount('#app')
