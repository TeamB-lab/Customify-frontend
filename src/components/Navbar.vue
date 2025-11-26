<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/">
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
        </router-link>
        
        <!-- Navigation Links -->
        <div class="flex items-center space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</router-link>
          <router-link to="/Products" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Products</router-link>

          <!-- Cart -->
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
            <router-link
              v-if="!isLoggedIn"
              to="/Register"
              class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
            >
              Sign Up
            </router-link>

            <div v-else class="flex items-center space-x-2">
              <span class="text-gray-700">Welcome, {{ user?.name }}</span>
              <button @click="logout" class="text-gray-500 hover:text-red-600">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Sign In Modal -->
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
        <button type="submit" class="w-full btn-primary">
          Sign In
        </button>
      </form>
      <button @click="showLogin = false" class="w-full mt-4 text-gray-500 hover:text-gray-700">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCartStore } from '../cart.js'
import { authAPI, handleApiError, } from '../Services/api'
import { useRouter } from 'vue-router'
 import apiClient from '../Services/api' 

// Reactive states
const showLogin = ref(false)
const isLoggedIn = ref(false)
const user = ref(null)  // Stores logged-in user info


// Login form data
const loginForm = reactive({
  email: '',
  password: ''
})

// Initialize cart store
const cartStore = useCartStore()

// Router instance
const router = useRouter()

// Handle user login with backend API
const handleLogin = async () => {
  if (!loginForm.email || !loginForm.password) {
    alert('Please enter both email and password')
    return
  }

  try {
    const response = await authAPI.login({
      email: loginForm.email,
      password: loginForm.password
    })

    console.log('Login successful:', response.data)

    // Store token for future API calls
    localStorage.setItem('token', response.data.token)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    // Update UI
    isLoggedIn.value = true
    user.value = response.data.user
    showLogin.value = false

    // Reset form
    loginForm.email = ''
    loginForm.password = ''

    alert(`Welcome, ${response.data.user.name}!`)

    // Redirect to homepage after login
    router.push('/')  

  } catch (error) {
    console.error('Login error:', error)
    alert(handleApiError(error))
  }
}

// Handle user logout
const logout = () => {
  isLoggedIn.value = false
  user.value = null
  localStorage.removeItem('token')
  delete apiClient.defaults.headers.common['Authorization']
}

// Define emitted events
defineEmits(['toggle-cart', 'open-signup'])
</script>
