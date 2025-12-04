import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State - array of items in cart
  const items = ref([])
  
  // Computed property - total price of all items in cart
  const total = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  )
  
  // 添加 totalPrice 作为 total 的别名，确保与结账页面兼容
  const totalPrice = computed(() => total.value)
  
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
    
    // 可选：保存到 localStorage 以持久化
    saveToLocalStorage()
  }
  
  // Action - remove item from cart
  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
    
    // 可选：保存到 localStorage 以持久化
    saveToLocalStorage()
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
    
    // 可选：保存到 localStorage 以持久化
    saveToLocalStorage()
  }
  
  // Action - clear all items from cart (用于下单成功后清空购物车)
  const clearCart = () => {
    items.value = []
    
    // 可选：同时清除 localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
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
  
  // 新增：从 localStorage 加载购物车数据
  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          items.value = JSON.parse(savedCart)
        } catch (e) {
          console.error('Failed to parse saved cart:', e)
        }
      }
    }
  }
  
  // 新增：保存购物车数据到 localStorage
  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }
  
  // 新增：初始化时从 localStorage 加载数据
  loadFromLocalStorage()
  
  return {
    // State
    items,
    
    // Computed properties
    total,
    totalPrice, // 新增：确保与结账页面兼容
    itemCount,
    uniqueItemCount,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    
    // 新增：持久化相关方法
    loadFromLocalStorage,
    saveToLocalStorage
  }
})