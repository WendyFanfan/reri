// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import router from './router'
import messages from './i18n/messages'

// 按需导入 Naive UI 组件
import {
    NButton,
    NCard,
    NGrid,
    NGridItem,
    NImage,
    NConfigProvider,
    NDivider,
    NDropdown,
    NInput,
    NIcon
} from 'naive-ui'

export type MessageSchema = typeof messages['en']

const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'en',
    messages,
})

const app = createApp(App)

// 只注册你需要的组件
app
    .use(router)
    .use(i18n)
    .component('NButton', NButton)
    .component('NCard', NCard)
    .component('NGrid', NGrid)
    .component('NGridItem', NGridItem)
    .component('NImage', NImage)
    .component('NDivider', NDivider)
    .component('NDropdown', NDropdown)
    .component('NConfigProvider', NConfigProvider)
    .component('NInput', NInput)
    .component('NIcon', NIcon)
    .mount('#app')
