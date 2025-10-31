<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">

    <!-- Navbar -->
    <Navbar @toggle-cart="isCartOpen = true" />

    <!-- Cart Sidebar -->
    <CartSidebar :isOpen="isCartOpen" @close="isCartOpen = false" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">

      <!-- Hero Section -->
<section class="bg-gradient-to-r from-red-600 to-purple-700 rounded-2xl text-white p-8 mb-12 relative overflow-hidden">
  <!-- Optional: floating shapes -->
  <div class="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full animate-bounce-slow"></div>
  <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full animate-pulse-slow"></div>

  <div class="text-center relative z-10">
    <!-- Animated Heading -->
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animate-slide-fade">
      Welcome to <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">Customify</span>
    </h1>

    <!-- Animated Subtext -->
    <p class="text-xl mb-6 animate-slide-fade animate-delay-200">
      Discover amazing Customized and Trendy products at great prices
    </p>

    <!-- Animated Button -->
    <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 animate-bounce hover:scale-105">
      Shop Now
    </button>
  </div>
</section>


    <!-- Featured Products --> 
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <div class="flex-1 text-center">
            <h2 class="text-3xl font-bold text-gray-800">Featured Products</h2>
          </div>
          <button class="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
            View All →
          </button>
        </div>
        <!-- Products Grid --> 
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
          <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product"
          @add-to-cart="addToCart" /> 
        </div> 
      </section>

      <!-- Categories -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="category in categories" :key="category.id" 
               class="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200">
            <div class="text-3xl mb-2">{{ category.icon }}</div>
            <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
          </div>
        </div>
      </section>
    </main>
  </div> 
    <!-- Interactive Features Section -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <!-- Features List -->
      <div data-aos="fade-right">
        <h2 class="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
          Why Choose
          <span class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Us?
          </span>
        </h2>
        
        <div class="space-y-6">
          <div 
            v-for="feature in features" 
            :key="feature.id"
            class="flex items-start p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
            @mouseenter="activeFeature = feature.id"
          >
            <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
              {{ feature.icon }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Feature Display -->
      <div class="relative" data-aos="fade-left">
        <div class="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white overflow-hidden">
          <div class="relative z-10">
            <h3 class="text-2xl font-bold mb-4">{{ activeFeatureData.title }}</h3>
            <p class="text-gray-300 mb-6">{{ activeFeatureData.description }}</p>
            
            <!-- Progress Indicators -->
            <div class="flex space-x-2 mb-6">
              <div 
                v-for="feature in features" 
                :key="feature.id"
                class="w-3 h-3 rounded-full transition-all duration-300"
                :class="activeFeature === feature.id ? 'bg-white' : 'bg-gray-600'"
              ></div>
            </div>
          </div>
          
          <!-- Animated Background -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-blue-500/20 to-purple-500/20 rounded-full transform translate-x-32 -translate-y-32"></div>
        </div>
      </div>

    </div>
  </div>
</section>
<!-- Footer -->
    <Footer></Footer>
</template>

<script setup>
import { ref, computed } from 'vue' 
import Navbar from './components/Navbar.vue'
import ProductCard from './components/ProductCard.vue'
import CartSidebar from './components/CartSidebar.vue'
import Footer from './components/Footer.vue'

const isCartOpen = ref(false)
const isFeaturesOpen = ref(false)

// Mock data
const featuredProducts = ref([
  {
    id: 101,
    name: "Classic tank top for women",
    description: "Soft 100% cotton tank top for everyday comfort",
    price: 24.99,
    originalPrice: 29.99,
    discount: 15,
    category: "Women",
    image: 'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3VzdG9tJTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    rating: 4.5,
  },
  {
     id: 103,
    name: "Graphic Print Street Style",
    description: "Urban graphic print drop shoulder for casual wear",
    price: 28.99,
    originalPrice: 34.99,
    discount: 17,
    category: "Unisex",
    image: 'https://images.unsplash.com/photo-1759941279446-dea2722bca33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
    rating: 4.3,

  },
  {
    id: 3,
    name: ' Kids T-shirt',
    description: 'Colorful and fun t-shirt for kids',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1760808573791-f2b3e6cf44d1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=605',
    rating: 4.3
  },
  {
    id: 4,
    name: 'Men\'s Tank Top',
    description: 'Breathable tank top for men',
    price: 59.99,
    originalPrice: 99.99,
    discount: 40, 
    image: 'https://images.unsplash.com/photo-1759972524927-98e11549b426?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
    rating: 4.7
  },
])
const categories = ref([
   { id: 1, name: 'Men Fashion', icon: '👔', description: 'Trendy styles for men' },
  { id: 2, name: 'Women Fashion', icon: '👗', description: 'Elegant women wear' },
  { id: 3, name: 'Kids Collection', icon: '👶', description: 'Cute outfits for kids' },
  { id: 4, name: 'Unisex', icon: '👕', description: 'Clothes for Everybody' }
])

const addToCart = (product) => {
  console.log('Added to cart:', product.name)
  // In a real app,For adding to cart state management
  alert(`Added ${product.name} to cart!`)
}
const features = ref([
  {
    id: 1,
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free worldwide shipping on orders over $100. Fast and reliable delivery to your doorstep.'
  },
  {
    id: 2,
    icon: '↩️',
    title: 'Easy Returns',
    description: '30-day hassle-free returns. If you are not satisfied, we are here to help.'
  },
    {
    id: 3,
    icon: '🔒',
    title: 'Secure Payment',
    description: 'Your payment information is secure with our encrypted payment processing system.'
  },
  {
    id: 4,
    icon: '⭐',
    title: 'Quality Guarantee',
    description: 'We stand behind the quality of our products with a comprehensive satisfaction guarantee.'
  }
])

const activeFeature = ref(1)

const activeFeatureData = computed(() => {
  return features.value.find(f => f.id === activeFeature.value) || features.value[0]
})
</script> 