import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://customify-backend.onrender.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsAPI = {
  getProducts() {
    console.log('🔄 Fetching products from Render backend...');
    return apiClient.get('/api/products4');
  },
};

export const allproductsAPI = {
  getProducts() {
    console.log('🔄 Fetching products from Render backend...');
    return apiClient.get('/api/products');
  },
};

export const handleApiError = (error) => {
  console.error('🔴 API Error Details:', error);
  
  if (error.response) {
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
    return error.response.data.message || `Server Error: ${error.response.status}`;
  } else if (error.request) {
    console.error('No response received:', error.request);
    return 'Network error: Cannot connect to Render backend. The server might be starting up.';
  } else {
    console.error('Request setup error:', error.message);
    return 'Request error: ' + error.message;
  }
};

export default apiClient;