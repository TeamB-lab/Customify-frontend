import { createRouter, createWebHistory } from 'vue-router'

// COMPONENTS
import HomePage from '../components/HomePage.vue'
import Register from '../components/Register.vue'
import Products from '../components/Products.vue'

// VIEWS
import CheckoutPage from '../views/CheckoutPage.vue'
import ThankYouPage from '../views/ThankYouPage.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYouPage,
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
