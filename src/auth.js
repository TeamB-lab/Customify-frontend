
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
 
  const token = ref(localStorage.getItem('jwtToken') || null)
  const user = ref(JSON.parse(localStorage.getItem('userData')) || null)

  
  const isAuthenticated = computed(() => !!token.value)


  function login(newToken, newUser) {
  
    token.value = newToken
    user.value = newUser
   
    localStorage.setItem('jwtToken', newToken)
    localStorage.setItem('userData', JSON.stringify(newUser))
  }

  
  function logout() {

    token.value = null
    user.value = null
    
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userData')
  }

  return { token, user, isAuthenticated, login, logout }
})