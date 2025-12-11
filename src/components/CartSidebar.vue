<template>
  <div class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 transform transition-transform duration-300"
       :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-xl font-bold text-gray-800">Shopping Cart ({{ cartStore.itemCount }})</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="cartStore.items.length === 0" class="text-center text-gray-500 mt-8">
          <p class="text-lg">Your cart is empty</p>
          <p class="text-sm">Add some products to get started!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4 border-b pb-4">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
              <p class="text-gray-600">${{ item.price }}</p>
              <div class="flex items-center space-x-2 mt-2">
                <button @click="decreaseQuantity(item)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">-</button>
                <span class="text-gray-700">{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">+</button>
              </div>
            </div>
            <button @click="removeFromCart(item)" class="text-red-500 hover:text-red-700">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t p-4 space-y-4">
        <div class="flex justify-between text-lg font-bold text-gray-800">
          <span>Total:</span>
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>
        <router-link 
          to="/checkout" 
          class="block w-full bg-green-600 hover:bg-green-700 text-white text-center text-lg py-3 rounded-lg transition-colors duration-200"
          @click="$emit('close')"
        >
          Checkout
        </router-link>
        <button @click="clearCart" class="w-full border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
          Clear Cart
        </button>
        <button @click="$emit('close')" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../cart.js'

// Props definition
const props = defineProps({
  isOpen: Boolean
})

// Initialize cart store
const cartStore = useCartStore()

// Increase quantity of item in cart
const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

// Decrease quantity of item in cart
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

// Remove item from cart
const removeFromCart = (item) => {
  cartStore.removeItem(item.id)
}

// Clear all items from cart
const clearCart = () => {
  cartStore.clearCart()
}

// Define emitted events
defineEmits(['close'])
</script>