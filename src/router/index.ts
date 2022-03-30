import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue';
import Recipe from '../views/Recipe.vue';
import SignIn from "../views/SignIn.vue";
import Register from "../views/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/profile', component: Profile },
        { path: '/profile/:recipe', component: Recipe },
        { path: '/sign-in', component: SignIn },
        { path: '/register', component: Register },
    ]
})

export default router;