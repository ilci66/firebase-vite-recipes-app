<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Examples from './components/Examples.vue'
import Purpose from './components/Purpose.vue'


</script>

<template>
  <HelloWorld msg="Welcome to Recipes" />
  <Purpose />
  <Examples />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: rgb(112, 19, 112);
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  height: 100vh;
}
</style>
