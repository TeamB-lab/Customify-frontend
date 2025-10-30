<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <Navbar @toggle-cart="isCartOpen = true" />

    <!-- Cart Sidebar -->
    <CartSidebar :isOpen="isCartOpen" @close="isCartOpen = false" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-red-600 to-purple-700 rounded-2xl text-white p-8 mb-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Welcome to Customify</h1>
          <p class="text-xl mb-6">Discover amazing Customized and Trendy products at great prices</p>
          <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Shop Now
          </button>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-800">Featured Products</h2>
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
            @add-to-cart="addToCart"
          />
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
  <div>
    <!-- Footer -->
    <Footer></Footer>
  </div>  
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import ProductCard from './components/ProductCard.vue'
import CartSidebar from './components/CartSidebar.vue'
import Footer from './components/Footer.vue'

const isCartOpen = ref(false)

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
</script>