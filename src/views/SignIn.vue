<script setup lang="ts">
import NavBarVue from '../components/NavBar.vue'
import { ref } from 'vue';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  GoogleAuthProvider
} from "firebase/auth";
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const errMsg = ref()
const router = useRouter()

const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => {
      console.log("signed in")
      console.log(auth.currentUser)
      router.push('/')
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          errMsg.value = "invalid email";
          break
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found!"
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password"
          break
        default:
          errMsg.value = "Email or password incorrect"
          break;
      }
    })
}



</script>
<template>
<NavBarVue />
  <h1 class="m-auto max-w-md w-9/10">
    <router-link class="text-blue decoration-none" to="/register">Register here</router-link> if you don't have an account
  </h1>
  <div class="m-auto flex flex-col mt--1 bg-blue p-10 shadow-xl m-6 rounded-lg max-w-md">
  <p>
    <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" placeholder="Email" v-model="email"/>
  </p>
  <p>
    <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 mt--10" type="password" placeholder="Password" v-model="password"/>
  </p>
  <p class="text-white-400" v-if="errMsg">{{errMsg}}</p>
  <p>
    <button class="p-2 bg-orange-300 text-white text-xl text-center w-9/10 border-none rounded-lg m-1 mt--8 cursor-pointer" @click="signIn">Submit</button>
  </p>
  <p>
    <button class="p-2 text-lg text-white bg-red-700 text-center w-9/10 border-none rounded-lg m-1 cursor-pointer" @click="signIn">Sign in with Google</button>
  </p>
</div>
</template>