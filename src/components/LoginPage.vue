<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">👤</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p class="text-gray-600 text-sm mt-1">Sign in to your account</p>
          </div>
        </div>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm flex items-center">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          {{ errorMessage }}
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="p-6 space-y-5">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            v-model="loginForm.email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
            required
            :disabled="isLoggingIn"
          >
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            v-model="loginForm.password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your password"
            required
            :disabled="isLoggingIn"
          >
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="loginForm.remember"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              :disabled="isLoggingIn"
            >
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-blue-600 hover:text-blue-500 transition-colors">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="isLoggingIn"
          :class="[
            'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center',
            isLoggingIn 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          ]"
        >
          <svg v-if="isLoggingIn" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isLoggingIn ? 'Signing In...' : 'Sign In' }}</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="px-6 pb-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <router-link 
            to="/signup" 
            @click="closeModal"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            Create new account
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { authAPI } from '../services/api.js'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

// Emits
const emit = defineEmits(['close', 'login-success'])

// Reactive data
const isLoggingIn = ref(false)
const errorMessage = ref('')

// Login form data
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// Initialize auth store
const authStore = useAuthStore()

// Close modal function
const closeModal = () => {
  emit('close')
  resetForm()
}

// Reset form
const resetForm = () => {
  isLoggingIn.value = false
  errorMessage.value = ''
  loginForm.email = ''
  loginForm.password = ''
  loginForm.remember = false
}

// Handle user login with API
const handleLogin = async () => {
  // Basic validation
  if (!loginForm.email || !loginForm.password) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoggingIn.value = true
  errorMessage.value = ''

  try {
    const credentials = {
      email: loginForm.email,
      password: loginForm.password
    }

    // Call login API
    const response = await authAPI.login(credentials)
    
    // Update auth store
    authStore.setAuth(response.user, response.token)
    
    // Store remember preference
    if (loginForm.remember) {
      localStorage.setItem('rememberMe', 'true')
    }

    // Emit success event
    emit('login-success', response.user)
    
    // Close modal
    closeModal()
    
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please check your credentials and try again.'
    console.error('Login error:', error)
  } finally {
    isLoggingIn.value = false
  }
}

// Close modal when clicking outside (handled by parent)
// Close modal on escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add event listener
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>