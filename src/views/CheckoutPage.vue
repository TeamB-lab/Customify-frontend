<template>
  <div class="checkout-page min-h-screen bg-gray-50">
    
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Order Summary Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div v-if="cartItems.length === 0" class="text-center py-8">
            <p class="text-gray-500">Your cart is empty</p>
            <router-link to="/" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
              Continue Shopping
            </router-link>
          </div>
          
          <div v-else>
            <div v-for="item in cartItems" :key="item.id" class="flex items-center border-b border-gray-200 py-4">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
              <div class="flex-1 ml-4">
                <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                <p class="text-gray-600 text-sm">Quantity: {{ item.quantity }}</p>
              </div>
              <p class="font-semibold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span class="text-blue-600">${{ totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Information Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
          
          <form @submit.prevent="handleOrderSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                v-model="shippingInfo.fullName"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input 
                v-model="shippingInfo.email"
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input 
                v-model="shippingInfo.address"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your street address"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input 
                  v-model="shippingInfo.city"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                <input 
                  v-model="shippingInfo.postalCode"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Postal code"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input 
                v-model="shippingInfo.country"
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Country"
              >
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting || cartItems.length === 0"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {{ isSubmitting ? 'Processing...' : 'Confirm Order' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../cart.js'  // 这里修改了导入路径

const router = useRouter()
const cartStore = useCartStore()
const isSubmitting = ref(false)

const shippingInfo = ref({
  fullName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
})

const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const handleOrderSubmit = async () => {
  if (cartItems.value.length === 0) {
    alert('Your cart is empty')
    return
  }

  isSubmitting.value = true

  try {
    const orderPayload = {
      shippingInfo: shippingInfo.value,
      items: cartItems.value.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: totalPrice.value,
      orderDate: new Date().toISOString()
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload)
    })

    if (response.ok) {
      // Clear cart and redirect to thank you page
      cartStore.clearCart()
      router.push('/thank-you')
    } else {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to place order')
    }
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (cartItems.value.length === 0) {
    router.push('/')
  }
})
</script>