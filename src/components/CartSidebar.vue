<template>
  <div class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 transform transition-transform duration-300"
       :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="h-full flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-xl font-bold text-gray-800">Shopping Cart</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="cartItems.length === 0" class="text-center text-gray-500 mt-8">
          <p class="text-lg">Your cart is empty</p>
          <p class="text-sm">Add some products to get started!</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4 border-b pb-4">
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
          <span>${{ totalPrice }}</span>
        </div>
        <button class="w-full btn-success text-lg py-3">
          Checkout
        </button>
        <button @click="$emit('close')" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

// Mock cart items
const cartItems = ref([
  {
    id: 101,
    name: "Classic tank top for women",
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3VzdG9tJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Men\'s Tank Top',
    price: 59.99, 
    image: 'https://images.unsplash.com/photo-1759972524927-98e11549b426?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
    quantity: 2,
  }
])

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
})

const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeFromCart = (item) => {
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)
}

defineEmits(['close'])
</script>