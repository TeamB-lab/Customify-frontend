<template>
  <div class="card p-4">
    <div class="relative">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-48 object-cover rounded-lg mb-4"
      >
      <span v-if="product.discount" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
        -{{ product.discount }}%
      </span>
    </div>
    
    <h3 class="font-semibold text-lg mb-2 text-gray-800">{{ product.name }}</h3>
    <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
    
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <span class="text-xl font-bold text-gray-800">${{ product.price }}</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
          ${{ product.originalPrice }}
        </span>
      </div>
      <div class="flex items-center">
        <span class="text-yellow-400">⭐</span>
        <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
      </div>
    </div>
    
    <button 
      @click="$emit('add-to-cart', product)"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
    >
      <span>🛒</span>
      <span class="ml-2">Add to Cart</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>