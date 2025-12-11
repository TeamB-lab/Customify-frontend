import { createRouter, createWebHistory } from 'vue-router'


import HomePage from '../views/HomePage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import ThankYouPage from '../views/ThankYouPage.vue'
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
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYouPage
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
  routes
  routes,
  scrollBehavior(to,from,savedPosition){
  return {top:0}
  }
})

export default router