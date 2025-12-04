import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import HomePage from '../views/HomePage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import ThankYouPage from '../views/ThankYouPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router