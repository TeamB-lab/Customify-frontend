<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
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
        
        <div class="flex items-center space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</router-link>
          <router-link to="/Products" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Products</router-link>

          <button @click="$emit('toggle-cart')" class="relative text-gray-700 hover:text-blue-600 transition-colors duration-200">
            🛒 Cart
            <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <div class="flex space-x-4">
            <button v-if="!authStore.isAuthenticated" @click="showLogin = true" class="btn-secondary text-sm">
              Sign In
            </button>
            <router-link
              v-if="!authStore.isAuthenticated"
              to="/Register"
              class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
            >
              Sign Up
            </router-link>

            <div v-else class="flex items-center space-x-2">
              <span class="text-gray-700">Welcome, {{ authStore.user?.name }}</span>
              <button @click="logout" class="text-gray-500 hover:text-red-600">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

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
import { useAuthStore } from '../auth.js'
import { authAPI, handleApiError, } from '../Services/api'
import { useRouter } from 'vue-router'

// Initialize stores
const cartStore = useCartStore()
const authStore = useAuthStore()

// Router instance
const router = useRouter()

// Reactive states
const showLogin = ref(false)

// Login form data
const loginForm = reactive({
  email: '',
  password: ''
})

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

    // Use the store action to update global state and localStorage
    authStore.login(response.data.token, response.data.user)

    // Update UI local state for modal
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
  // Use the store action to clear global state and localStorage
  authStore.logout()
  router.push('/')
}

// Define emitted events
defineEmits(['toggle-cart', 'open-signup'])
</script>