<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img 
            src="/src/assets/logo.png" 
            alt="Customify Logo" 
            class="w-10 h-10 object-contain scale-110"
          />
          <h1 class="text-2xl font-bold text-gray-800 tracking-tight">
            Customify
          </h1>
        </div>
        
        <!-- Navigation Links -->
        <div class="flex items-center space-x-6">
          <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Products</a>
          
          <!-- Categories Dropdown -->
          <div class="relative group">
            <button class="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center">
              Categories ▾
            </button>
          </div>

          <!-- Cart - Updated to use real cart data from store -->
          <button @click="$emit('toggle-cart')" class="relative text-gray-700 hover:text-blue-600 transition-colors duration-200">
            🛒 Cart
            <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Auth Buttons -->
          <div class="flex space-x-4">
            <button v-if="!isLoggedIn" @click="showLogin = true" class="btn-secondary text-sm">
              Sign In
            </button>
            <button v-if="!isLoggedIn" class="btn-primary text-sm">
              Sign Up
            </button>
            <div v-else class="flex items-center space-x-2">
              <span class="text-gray-700">Welcome, User!</span>
              <button @click="logout" class="text-gray-500 hover:text-red-600">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            v-model="loginForm.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            v-model="loginForm.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          >
        </div>
        <button type="submit" class="w-full btn-primary">Sign In</button>
      </form>
      <button @click="showLogin = false" class="w-full mt-4 text-gray-500 hover:text-gray-700">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../cart.js'

// Reactive data for component state
const searchQuery = ref('')
const showLogin = ref(false)
const isLoggedIn = ref(false)

// Login form data
const loginForm = ref({
  email: '',
  password: ''
})

// Initialize cart store for real cart data
const cartStore = useCartStore()

// Handle user login
const handleLogin = () => {
  isLoggedIn.value = true
  showLogin.value = false
  loginForm.value = { email: '', password: '' }
}

// Handle user logout
const logout = () => {
  isLoggedIn.value = false
}

// Define emitted events
defineEmits(['toggle-cart'])
</script>