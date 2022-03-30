import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router/index.js'

const {
  VITE_API_KEY, 
  VITE_AUTH_DOMAIN, 
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID
} = import.meta.env

import { initializeApp } from "firebase/app";

// very basic type, check it out later
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};

initializeApp(firebaseConfig);


const app = createApp(App);

app.use(router);

app.mount('#app')

// createApp(App).mount('#app')