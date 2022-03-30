import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router/index.js'

const app = createApp(App);

app.use(router);

app.mount('#app')

// createApp(App).mount('#app')