// Import Vue CreateApp
import { createApp } from 'vue'

// Import CSS
import './assets/fonts.css'
import './assets/tailwind.css'
import '@formkit/themes/genesis'

// Import main component
import HomePage from './HomePage'

// Import FormKit plugin https://formkit.com/
import { plugin, defaultConfig } from '@formkit/vue'

// Create app and mount to div.
createApp(HomePage).use(plugin, defaultConfig).mount('#app')
