<template>
  <div class="thank-you-page">
    <Navbar />
    <div class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto">
        <div class="text-green-500 text-6xl mb-6">✓</div>
        <h1 class="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p class="text-gray-600 mb-8">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <button @click="goHome" 
          class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>