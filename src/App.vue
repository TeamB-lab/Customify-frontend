<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar @toggle-cart="isCartOpen = true" />

    <!-- Cart Sidebar -->
    <CartSidebar :isOpen="isCartOpen" @close="isCartOpen = false" />

    <!-- 路由出口 -->
    <router-view></router-view>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import CartSidebar from './components/CartSidebar.vue'
import Footer from './components/Footer.vue'

const isCartOpen = ref(false)
</script>