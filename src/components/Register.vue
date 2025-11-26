<template>
<form @submit.prevent="handleRegister"></form> 
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex flex-col">
    <!-- Simple Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <img 
              src="/src/assets/logo.png" 
              alt="Customify Logo" 
              class="w-8 h-8 object-contain"
            />
            <h1 class="text-xl font-bold text-gray-800">Customify</h1>
          </div>
          <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors">
            ← Back to Home
          </router-link>
        </div>
      </div>
    </header>

    <!-- Register Form Content -->
    <div class="flex-1 flex items-start justify-center py-6 px-4">
      <div class="max-w-md w-full space-y-6">
        <div class="text-center">
          <div class="flex justify-center">
            <div class="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h2 class="mt-4 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </a>
          </p>
        </div>

        <div class="bg-white py-8 px-6 shadow rounded-lg">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- First & Last Name -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div class="mt-1">
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    name="firstName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                </div>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div class="mt-1">
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    name="lastName"
                    type="text"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                </div>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-center">
              <input
                id="terms"
                v-model="form.acceptedTerms"
                name="terms"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                I agree to the
                <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
              </label>
            </div>

            <!-- Newsletter -->
            <div class="flex items-center">
              <input
                id="newsletter"
                v-model="form.newsletter"
                name="newsletter"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="newsletter" class="ml-2 block text-sm text-gray-900">
                Send me product updates and marketing emails
              </label>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="!form.acceptedTerms || isSubmitting"
                :class="[
                  'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200',
                  form.acceptedTerms && !isSubmitting
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    : 'bg-indigo-400 cursor-not-allowed'
                ]"
              >
                <span v-if="isSubmitting">Creating account...</span>
                <span v-else>Create account</span>
              </button>
            </div>
          </form>

          <!-- Social Signup -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <!-- Google Button -->
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="ml-2">Google</span>
              </button>

              <!-- Apple Button -->
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span class="ml-2">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI, handleApiError } from '../Services/api'


const router = useRouter()
const handleRegister = async () => {
  try {
    const response = await authAPI.signUp({
      name: form.firstName + ' ' + form.lastName, 
      email: form.email,
      password: form.password,
    });

    alert(response.data.message);
    router.push('/'); // redirect to home page
  } catch (error) {
    alert(handleApiError(error));
  }
};

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
  newsletter: false
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.acceptedTerms) return
  
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  try {
    const response = await authAPI.signUp({
      name: form.firstName + " " + form.lastName,
      email: form.email,
      password: form.password
    });

    alert(response.data.message || "Account created successfully!");
    router.push('/'); 

  } catch (error) {
    alert(handleApiError(error));
  }
};

</script>