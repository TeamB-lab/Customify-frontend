import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'  
import SignupPage from '../components/SignupPage.vue'
import Products from '../components/Products.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'Signup', 
    component: SignupPage
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