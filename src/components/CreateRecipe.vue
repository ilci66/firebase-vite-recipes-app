<script setup lang="ts">
import { ref } from 'vue';

const title = ref("");
const ingredient = ref("");
const ingredients = ref([]);
const preparation = ref("");

const handleSubmitRecipe = () => {
    
}
</script>
<template>
  <form @submit.prevent="handleSubmitRecipe">
    <label for="title-input">

      asd
      <input name="title-input" class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" v-model="title" placeholder="An awesome cake" 
    >
      </label>
    <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" placeholder="ingredient" v-model="ingredient"/>
    <div class="form-ingredients">
      ingredient will be added here as a list 
    </div>
    <textarea class="p-3 text-center h-50 w-9/10 border-none rounded-lg m-1 " type="text" placeholder="preparation" v-model="preparation">
    </textarea>
    <input type="button" value="Submit">
  </form>
</template>
<style>
</style>