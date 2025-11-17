<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
    <!-- Image with Discount Badge -->
    <div class="relative">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      >
      <span 
        v-if="product.discount > 0" 
        class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold"
      >
        -{{ product.discount }}%
      </span>
    </div>
    
    <!-- Product Info -->
    <div class="p-4">
      <!-- Category Badge -->
      <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mb-2">
        {{ product.category }}
      </span>
      
      <!-- Product Name -->
      <h3 class="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">{{ product.name }}</h3>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
      
      <!-- Price and Rating -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl font-bold text-green-600">${{ product.price }}</span>
          <span 
            v-if="product.original_price && parseFloat(product.original_price) > parseFloat(product.price)" 
            class="text-sm text-gray-500 line-through"
          >
            ${{ product.original_price }}
          </span>
        </div>
        <div class="flex items-center">
          <span class="text-yellow-400">⭐</span>
          <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
        </div>
      </div>
      
      <!-- Add to Cart Button - Updated to use cart store -->
      <button 
        @click="addToCart"
        :class="[
          'w-full py-3 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold hover:scale-105 transform',
          isInCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        ]"
      >
        <span>🛒</span>
        <span class="ml-2">{{ isInCart ? `In Cart (${itemQuantity})` : 'Add to Cart' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../cart.js'
import { computed } from 'vue'

// Props definition for product data
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: '',
      description: '',
      price: '',
      original_price: '', // Changed from originalPrice to match API
      discount: 0,
      category: '',
      image: '',
      rating: '0'
    })
  }
})

// Initialize cart store
const cartStore = useCartStore()

// Computed property to check if product is in cart
const isInCart = computed(() => 
  cartStore.isInCart(props.product.id)
)

// Computed property to get quantity of product in cart
const itemQuantity = computed(() => 
  cartStore.getItemQuantity(props.product.id)
)

// Method to add product to cart
const addToCart = () => {
  cartStore.addItem(props.product)
}

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
}
</script>

<style scoped>
.line-clamp-1 {
  line-clamp: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
   line-clamp: 2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>