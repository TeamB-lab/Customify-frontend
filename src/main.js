import { createApp } from 'vue'
import App from './App.vue'

// This creates the Vue app...
const app = createApp(App)

// ...and "mounts" (connects) it to the <div id="app"></div> in your index.html
app.mount('#app')