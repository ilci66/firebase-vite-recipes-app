<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from '../router'
const isLoggedIn = ref(false);

let auth: Auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})
const handleSignOut = () => {
  signOut(auth).then(() => {
    console.log("signed out")
    router.push({name: 'signIn'})
  }) 
}

</script>
<template>
<nav class="flex flex-column h60px " >
  <router-link to="/">
    <img class="h-60px" src="../assets/brand-logo.png">
  </router-link>
  <div class="container mr-10px flex flex-wrap justify-around items-center ml-auto">
    <button class="border-none bg-red-700 p-2 rounded-lg mr-1 text-size-16px text-white cursor-pointer" @click="handleSignOut" v-if="isLoggedIn" >Sign Out</button>
    <router-link v-if="!isLoggedIn" class="decoration-none mr-10px" to="/sign-in">Sign In</router-link>
    <router-link class="decoration-none mr-10px" to="/my-recipes">My Recipes</router-link>
  </div>
</nav>
</template>
<style>

</style>