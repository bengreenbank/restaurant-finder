// Import Vue CreateApp
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// Import CSS
import './assets/fonts.css'
import './assets/tailwind.css'

// Import Routes
import HomePage from './HomePage'
import AddPage from './AddPage'

// Define routes
const routes = [
  { path: '/', component: HomePage },
  { path: '/add', component: AddPage },
]

// Create router instance
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// Create app, use plugins and mount.
createApp(HomePage).use(router).mount('#app')
