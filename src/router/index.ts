import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import MyRecipes from '../views/MyRecipes.vue';
import Recipe from '../views/Recipe.vue';
import SignIn from "../views/SignIn.vue";
import Register from "../views/Register.vue";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name:'home' , component: Home },
    { path: '/my-recipes/:recipe',name:'recipe' , component: Recipe },
    { path: '/sign-in', name:'signIn', component: SignIn },
    { path: '/register', name:'register', component: Register },
    { 
      path: '/my-recipes', 
      name: 'MyRecipes',
      component: MyRecipes, 
      meta: {
        requiresAuth: true
      }
    },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    // if(getAuth().currentUser) {
      if (await getCurrentUser()) {
      return true
    } else {
      alert("You don't have the autoritah!");
      
      return { name: 'signIn'}
    }
  }
});

export default router;