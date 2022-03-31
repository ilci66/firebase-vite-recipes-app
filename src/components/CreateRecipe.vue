<script setup lang="ts">
import { ref, reactive, onMounted, Ref } from 'vue';

const title = ref("");
const ingredient = ref("");
// const ingredients = reactive(ref(["2"]));
const ingredients:Ref<string[]> = ref([]);
const preparation = ref("");

onMounted(() => {
  const list = document.querySelector('.ingredients-list');
  if(Array.isArray(ingredient.value)) {
    ingredient.value.map(ing => {
      let li = document.createElement('li');
      li.innerText = ing.toString();
      list?.appendChild(li);
      console.log("wok")
    })
  }
})

const addIngredient = () => {
  if(ingredient.value==="") alert("Can't add empty string")
  ingredients.value.unshift(ingredient.value);
  console.log("ingredients", (ingredients.value))
  ingredient.value = ""
}

const handleSubmitRecipe = () => {
    
}
</script>
<template>
  <form  @submit.prevent="handleSubmitRecipe" class="flex flex-col w-19/20 bg-gray-100 m-auto p-5 mt-5 rounded-lg">
    <label class="flex flex-col items-center" for="title-input">
      Title
      <input name="title-input" class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" v-model="title" placeholder="An awesome cake" >
    </label>
    <label class="flex flex-col items-center mt-10" for="ingredient-input">
      Ingredient
      <input class="p-3 text-center w-9/10 border-none rounded-lg m-1 " type="text" placeholder="3 eggs" v-model="ingredient" />
    </label>
    <button class="border-none text-4 text-white bg-teal p-2 rounded-lg cursor-pointer mt-2 w-40 m-auto" @click="addIngredient">
      Add Ingredient
    </button>
    <div class="form-ingredients">
      <ul class="ingredients-list">

      </ul> 
    </div>
    <label class="mt-10 mb-1" for="how-to">How To Cook</label>
    <textarea name="how-to" class="m-auto  p-3 text-center h-50 w-9/10 border-none rounded-lg m-1 " type="text"  v-model="preparation">
    </textarea>
    <input class="cursor-pointer text-6 rounded-lg bg-blue-300 border-none p4 text-white w-40 m-auto mt-2" type="button" value="Submit">
  </form>
</template>
<style>
</style>