import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'  
import Register from '../components/Register.vue'
import Products from '../components/Products.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register', 
    component: Register
  },

  {path :'/products',
  name :'Products',
  component:Products
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to,from,savedPosition){
  return {top:0}
  }
})

export default router