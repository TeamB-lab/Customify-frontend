<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-gray-800 px-6 py-16 md:py-28">
      <!-- Floating Shapes -->
      <div class="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full animate-bounce-slow"></div>
      <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full animate-pulse-slow"></div>
      <div class="max-w-5xl mx-auto text-center md:text-left relative z-10">
        <!-- Heading -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 animate-slide-fade">
          Welcome to 
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-gray-300">
            Customify
          </span>
        </h1>

        <!-- Subtext -->
        <p class="text-lg md:text-xl lg:text-xl font-heading font-medium mb-8 animate-slide-fade animate-delay-200">
          Discover amazing customized and trendy products at unbeatable prices.
        </p>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <div class="flex-1 text-center"></div>  
          <button class="bg-white text-red-500 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce">
            Shop Collection
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products --> 
    <section class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <div class="flex-1 text-center">
          <h2 class="text-3xl font-bold text-gray-800">Featured Products</h2>
        </div>
        <button 
          @click="fetchProducts" 
          :disabled="loading"
          class="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 flex items-center"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Loading...' : 'View All →' }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 text-lg font-semibold mb-2">Failed to load products</div>
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button 
          @click="fetchProducts"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Products Grid --> 
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && featuredProducts.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📦</div>
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">No products found</h2>
        <p class="text-gray-500 mb-6">We couldn't find any products at the moment.</p>
        <button 
          @click="fetchProducts"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Refresh Products
        </button>
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

    <!-- Interactive Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Features List -->
          <div>
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
          <div class="relative">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' 
import ProductCard from '../components/ProductCard.vue'

// State for products
const featuredProducts = ref([])
const loading = ref(false)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // 这里替换为你的实际API调用
    // const response = await productsAPI.getProducts();
    // featuredProducts.value = response.data;
    
    // 暂时使用模拟数据
    featuredProducts.value = [
      { id: 1, name: "Product 1", price: 29.99, image: "/src/assets/product1.jpg" },
      { id: 2, name: "Product 2", price: 39.99, image: "/src/assets/product2.jpg" },
      { id: 3, name: "Product 3", price: 19.99, image: "/src/assets/product3.jpg" },
      { id: 4, name: "Product 4", price: 49.99, image: "/src/assets/product4.jpg" }
    ];
    
    console.log('Products loaded successfully:', featuredProducts.value.length);
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
};

// For loading products on component mount
onMounted(() => {
  fetchProducts();
});

const categories = ref([
  { id: 1, name: 'Men Fashion', icon: '👔', description: 'Trendy styles for men' },
  { id: 2, name: 'Women Fashion', icon: '👗', description: 'Elegant women wear' },
  { id: 3, name: 'Kids Collection', icon: '👶', description: 'Cute outfits for kids' },
  { id: 4, name: 'Unisex', icon: '👕', description: 'Clothes for Everybody' }
])

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