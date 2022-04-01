import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from './router/index.js'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const {
  VITE_API_KEY, 
  VITE_AUTH_DOMAIN, 
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_DB_URL
} = import.meta.env

// very basic type, check it out later
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  databaseURL: VITE_DB_URL,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID
};

const fBaseApp = initializeApp(firebaseConfig);
const database = getDatabase(fBaseApp)
const app = createApp(App);

app.use(router);

app.mount('#app')

// createApp(App).mount('#app')