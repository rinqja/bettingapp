import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const router = useRouter();

    // Check if error is due to invalid/expired token
    if (error.response?.status === 401) {
      console.log('Token expired or invalid, logging out...');
      
      // Clear auth state
      await authStore.logout();
      
      // Redirect to auth page
      router.push('/auth');
      
      // Show notification if needed
      const notificationStore = (await import('../stores/notification')).useNotificationStore();
      notificationStore.show({
        type: 'error',
        title: 'Session Expired',
        message: 'Please log in again to continue.',
        duration: 5000,
        position: 'top-right'
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 