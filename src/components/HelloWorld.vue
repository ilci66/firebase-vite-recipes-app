<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="mt--10 text-blue">{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}

</style>
