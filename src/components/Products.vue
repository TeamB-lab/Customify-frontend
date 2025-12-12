<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
    <Navbar @toggle-cart="isCartOpen = true" />
    
    <SignIn 
      v-if="isLoginOpen" 
      :isOpen="isLoginOpen" 
      @close="isLoginOpen = false"
      @login-success="handleLoginSuccess"
    />

    <CartSidebar :isOpen="isCartOpen" @close="isCartOpen = false" />
         
    <main class="max-w-7xl mx-auto px-4 py-8">
      <section class="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-gray-800 px-6 py-16 md:py-20">
        <div class="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full animate-bounce-slow"></div>
        <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 animate-slide-fade">
            Our Complete
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-gray-300">
              Collection
            </span>
          </h1>

          <p class="text-lg md:text-xl lg:text-xl font-heading font-medium mb-8 animate-slide-fade animate-delay-200">
            Discover all our amazing customized and trendy products in one place.
          </p>

          <div class="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Search products..."
                  class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              
              <select 
                v-model="selectedCategory"
                class="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ filteredProducts.length }} Products Found
            </h2>
            <p class="text-gray-600" v-if="searchQuery || selectedCategory !== 'all'">
              <span v-if="searchQuery">Search: "{{ searchQuery }}"</span>
              <span v-if="searchQuery && selectedCategory !== 'all'"> • </span>
              <span v-if="selectedCategory !== 'all'">
                Category: {{ getCategoryName(selectedCategory) }}
              </span>
            </p>
          </div>
          
          <div class="flex items-center gap-4">
            <select 
              v-model="sortBy"
              class="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            
            <div class="flex bg-white rounded-lg border border-gray-200 p-1">
              <button 
                @click="gridView = true"
                :class="gridView ? 'bg-blue-500 text-white' : 'text-gray-600'"
                class="p-2 rounded-md transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm0 8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
              <button 
                @click="gridView = false"
                :class="!gridView ? 'bg-blue-500 text-white' : 'text-gray-600'"
                class="p-2 rounded-md transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <span class="text-lg text-gray-600">Loading all products...</span>
          </div>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div class="text-red-600 text-6xl mb-4">😞</div>
          <div class="text-red-600 text-xl font-semibold mb-2">Failed to load products</div>
          <p class="text-red-500 mb-6">{{ error }}</p>
          <button 
            @click="fetchProducts"
            class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>

        <div v-else-if="!loading && filteredProducts.length === 0" class="text-center py-20">
          <div class="text-gray-400 text-8xl mb-6">🔍</div>
          <h2 class="text-3xl font-semibold text-gray-600 mb-4">No products found</h2>
          <p class="text-gray-500 mb-8 text-lg max-w-md mx-auto">
            {{ searchQuery || selectedCategory !== 'all' ? 
                'Try adjusting your search or filter criteria.' : 
                'No products available at the moment.' 
            }}
          </p>
          <div class="flex gap-4 justify-center">
            <button 
              @click="clearFilters"
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
              v-if="searchQuery || selectedCategory !== 'all'"
            >
              Clear Filters
            </button>
            <button 
              @click="fetchProducts"
              class="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl transition-colors font-semibold"
            >
              Refresh Products
            </button>
          </div>
        </div>

        <div v-else>
          <div 
            v-if="gridView"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-aos="fade-up"
          >
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product"
            />
          </div>
          
          <div v-else class="space-y-4" data-aos="fade-up">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id"
              class="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div class="flex flex-col md:flex-row gap-6 items-center">
                <div class="w-full md:w-48 h-48 flex-shrink-0">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-cover rounded-xl"
                  >
                </div>
                
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ product.name }}</h3>
                  <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
                  <div class="flex items-center justify-between">
                    <div class="text-2xl font-bold text-blue-600">${{ product.price }}</div>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="hasMoreProducts && !loading" class="text-center mt-12">
            <button 
              @click="loadMoreProducts"
              class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Load More Products
            </button>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Browse Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="selectedCategory === category.id ? 'ring-2 ring-blue-500 transform scale-105' : ''"
            class="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 group">
          
            <component :is="category.icon" class="w-10 h-6 mx-auto text-red-500 mb-2" />
            <h3 class="font-bold text-gray-800 text-lg mb-2">{{ category.name }}</h3>
            <p class="text-sm text-gray-600">{{ category.description }}</p>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' 
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import ProductCard from './ProductCard.vue'
import CartSidebar from './CartSidebar.vue'
import Footer from './Footer.vue'
import { allproductsAPI } from '../Services/api'
import { User, UserRound, Baby, Users } from 'lucide-vue-next' 

const router = useRouter()
const isCartOpen = ref(false)
const isLoginOpen = ref(false)

// Handle successful login
const handleLoginSuccess = (user) => {
  console.log('User logged in:', user)
  isLoginOpen.value = false
}

// State for products
const allProducts = ref([])
const loading = ref(false)
const error = ref(null)

// Filter and sort state
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('name')
const gridView = ref(true)
const currentPage = ref(1)
const productsPerPage = 20
const hasMoreProducts = ref(true)

// Categories 
const categories = ref([
  { id: 1, name: 'Men Fashion', icon: User, description: 'Trendy styles for men' },
  { id: 2, name: 'Women Fashion', icon: UserRound, description: 'Elegant women wear' },
  { id: 3, name: 'Kids Collection', icon: Baby, description: 'Cute outfits for kids' },
  { id: 4, name: 'Unisex', icon: Users, description: 'Clothes for Everybody' }
])


// Fetch all products
const fetchProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await allproductsAPI.getProducts()
    allProducts.value = response.data || []
    console.log('All products loaded:', allProducts.value.length)
    hasMoreProducts.value = allProducts.value.length >= productsPerPage
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = err.message || 'Failed to load products'
    allProducts.value = []
  } finally {
    loading.value = false
  }
}

// Load more products for pagination
const loadMoreProducts = async () => {
  currentPage.value++
  // Simulate loading more here
  console.log('Loading more products...')
}

// Filtered and sorted products
const filteredProducts = computed(() => {
  let filtered = allProducts.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => 
      // Using loose equality (==) to handle potential type mismatches (string vs number) for IDs
      product.categoryId == selectedCategory.value
    )
  }

  // Sorting
  switch (sortBy.value) {
    case 'price-low':
      filtered = [...filtered].sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered = [...filtered].sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'name':
    default:
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return filtered
})

// Helper functions
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id == categoryId)
  return category ? category.name : 'Unknown'
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // Scroll to products section
  setTimeout(() => {
    const productsSection = document.querySelector('#products-section')
    productsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

// Initialize
onMounted(() => {
  fetchProducts()
})
</script>