<script setup lang="ts">


</script>

<template>
  <router-view />   
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* margin-top: 60px; */
}
* {
  box-sizing: border-box;
}
body {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  background-color: rgb(245, 255, 234);
}
img {
  height: 200px;
  object-fit: cover;
  width:100%;
}
</style>
