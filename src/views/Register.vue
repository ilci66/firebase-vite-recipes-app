<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const email = ref("");
const password = ref("");
const {
  API_KEY, 
  AUTH_DOMAIN, 
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} = import.meta.env
console.log("asdas",import.meta)

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(data => {
      console.log("Registery successful", data)
    })
    .catch(err => {
      console.log(err.code);
      alert(err.message);
    })
};
const googleSignIn = () => {

};

</script>
<template>
<h1>Create your account</h1>
<div class="m-auto flex flex-col mt--1 bg-blue p-10 shadow-xl m-6 rounded-lg max-w-md">
  <p>
    <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" placeholder="Email" v-model="email"/>
  </p>
  <p>
    <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 mt--10" type="password" placeholder="Password" v-model="password"/>
  </p>
  <p>
    <button class="p-2 bg-orange-300 text-white text-xl text-center w-9/10 border-none rounded-lg m-1 mt--8 cursor-pointer" @click="register">Submit</button>
  </p>
  <p>
    <button class="p-2 text-lg text-white bg-red-700 text-center w-9/10 border-none rounded-lg m-1 cursor-pointer" @click="register">Sign in with Google</button>
  </p>
</div>
</template>