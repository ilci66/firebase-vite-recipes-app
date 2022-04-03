<script setup lang="ts">
import { Auth, getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, connectDatabaseEmulator, ref as fRef, set, onValue, onChildAdded, onChildChanged} from "@firebase/database";
import { ref, reactive, onMounted, Ref } from 'vue';
import * as _ from 'lodash';
import { update } from "lodash";
import router from "../router";
// import XMarkVue from './XMark.vue'
const db = getDatabase();
const title = ref("");
const ingredient = ref("");
const ingredients:Ref<string[]> = ref([]);
const preparation = ref("");
const allRecipes:Ref<{title: string, ingredients: [], preparation: string}[]> = ref([])
const recipeCount = ref(0);

let auth: Auth;
const userUid = ref("")
onMounted(() => {
  
  // const db = getDatabase();
  // if(location.hostname === "localhost") {
    //   connectDatabaseEmulator(db, "localhost", 9000);
  //   console.log("yeah on loclahost", db)
  // }
  

  auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if(user) {
      console.log("user ==>", user.uid);
      userUid.value = user.uid;
    } else {
      userUid.value = "";
    }
  })
})


const userRecipesRef = fRef(db, '/'+ userUid.value);
const getDataFromDatabase = () => {
  onValue(userRecipesRef, (snapshot) => {
    const data = snapshot.val();
    console.log("data from db ==>", data[userUid.value])
    let keys = Object.keys(data[userUid.value]);
    let updatedData = data[userUid.value];
    // console.log("updated data from db",updatedData)
    for (let i = 0; i < keys.length; i++){
      let title = updatedData[keys[i]]["title"]["_value"]
      let ingredients =  updatedData[keys[i]]["ingredients"]["_value"]
      let preparation = updatedData[keys[i]]["preparation"]["_value"] 
      allRecipes.value = [...allRecipes.value, {title, ingredients,  preparation}]
    }
  })
}

const addIngredient = () => {
  if(ingredient.value==="") {
    alert("Can't add empty string")
    return;  
  }
  ingredients.value.unshift(ingredient.value);
  console.log("ingredients", (ingredients.value))
  ingredient.value = ""
}

const removeIngredient = (e: { target: { id: string; }; }) => {
  console.log(e.target.id)
  ingredients.value.map(i => console.log(i===e.target.id))
  ingredients.value = ingredients.value.filter(i => i !== e.target.id)
}

const handleSubmitRecipe = () => {
  console.log(title, ingredients, preparation)
  set(fRef(db, '/' + userUid.value + "/" + title.value), {
    title, ingredients, preparation 
  });
  console.log("sent")
  
}

const removeRecipe = (t:string) => {
  console.log("delete this one", t)
  set(fRef(db, '/' + userUid.value + "/" + t), null)
}

const recipesRef = fRef(db, '/' + userUid.value);

onChildAdded(recipesRef, (data) => {
  getDataFromDatabase()
// let keys = Object.keys(data.val());
  // let updatedData = data.val();
  // // console.log("updated data from db",updatedData)
  // for (let i = 0; i < keys.length; i++){
  //   let title = updatedData[keys[i]]["title"]["_value"]
  //   let ingredients =  updatedData[keys[i]]["ingredients"]["_value"]
  //   let preparation = updatedData[keys[i]]["preparation"]["_value"] 
  //   allRecipes.value = [...allRecipes.value, {title, ingredients,  preparation}]
  //   recipeCount.value += 1;
  // }
  // console.log("all recipes ==>", allRecipes.value)
})
onChildChanged(recipesRef, (data) => {
  console.log("changed data ==>", data)
  recipeCount.value = allRecipes.value.length;
  getDataFromDatabase()
})

</script>
<template>
  <form  @submit.prevent="" class="flex flex-col w-19/20 bg-gray-100 m-auto p-5 mt-5 rounded-lg">
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
      <div v-if="ingredients.length>0" class="flex flex-row  flex-wrap">
        <div 
          @click="removeIngredient" 
          :id="item"  
          :key="item"
          v-for="item in ingredients" 
          class="cursor-pointer m-1 bg-red text-white-100 p-2 rounded-xl border-none text-5 item-center p--10"
        >
          {{item}}
        </div>
      </div>
    <label class="mt-10 mb-1" for="how-to">How To Cook</label>
    <textarea name="how-to" class="m-auto  p-3 text-center h-50 w-9/10 border-none rounded-lg m-1 " type="text"  v-model="preparation">
    </textarea>
    <input  @click="handleSubmitRecipe" class="cursor-pointer text-6 rounded-lg bg-blue-300 border-none p4 text-white w-40 m-auto mt-2" type="button" value="Submit">
  </form>
  <div class="flex flex-wrap m-2 " v-if="allRecipes">
    <div class="bg-blue-100 rounded-lg p-2 lg:w-2/5 sm:w-1/1 m-auto my-2 " v-for="r in allRecipes" :key="r.title" :id="r.title">
      <h3>{{r.title}}</h3>
      <div class="flex flex-row flex-wrap items-center">
        <div class="bg-teal p-3 rounded-lg m-1 m-auto" v-for="i in  r.ingredients">{{i}}</div>
      </div>
      <div class="bg-pink m-1 text-white p-2 rounded-xl">
        <p>{{r.preparation}}</p>
      </div>
      <button class="cursor-pointer bg-red-800 border-none p4 rounded-xl text-lg text-white" @click="removeRecipe(r.title)">Remove</button>
    </div>
  </div>
</template>
<style>
</style>