<!-- Footer -->
    <template>
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Customify</h3>
            <p class="text-gray-400">Your one-stop Trendy T-shirts shop for all your needs.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors duration-200">Home</a></li>
              <li><router-link to="/Products" class="hover:text-white transition-colors duration-200">Products</router-link></li>
              <li><a href="#" class="hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" class="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Customer Service</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors duration-200">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition-colors duration-200">Shipping</a></li>
              <li><a href="#" class="hover:text-white transition-colors duration-200">Returns</a></li>
              <li><a href="#" class="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Newsletter</h4>
            <div class="flex">
              <input type="email" placeholder="Your email" class="px-3 py-2 rounded-l text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              <button class="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition-colors duration-200">Subscribe</button>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Customify. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>