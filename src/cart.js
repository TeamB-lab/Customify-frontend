import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State - array of items in cart
  const items = ref([])
  
  // Computed property - total price of all items in cart
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  // Computed property - total quantity of all items in cart
  const itemCount = computed(() => 
    items.value.reduce((count, item) => count + item.quantity, 0)
  )
  
  // Computed property - number of unique items in cart
  const uniqueItemCount = computed(() => items.value.length)
  
  // Action - add item to cart or increase quantity if already exists
  const addItem = (product) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 
      })
    }
  }
  
  // Action - remove item from cart
  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  // Action - update quantity of specific item in cart
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  // Action - clear all items from cart
  const clearCart = () => {
    items.value = []
  }
  
  // Getter - check if item is in cart
  const isInCart = (productId) => {
    return items.value.some(item => item.id === productId)
  }
  
  // Getter - get quantity of specific item in cart
  const getItemQuantity = (productId) => {
    const item = items.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }
  
  return {
    // State
    items,
    
    // Computed properties
    total,
    itemCount,
    uniqueItemCount,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }
})