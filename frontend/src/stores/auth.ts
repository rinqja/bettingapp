import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";
import axios from '../utils/axios';
import { useRouter } from 'vue-router';
const API_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superuser';
  balance: number;
}

interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  showLoginModal: boolean;
  showSignupModal: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    // Try to restore user from localStorage
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      token: savedToken || null,
      isAuthenticated: !!savedToken,
      showLoginModal: false,
      showSignupModal: false,
    };
  },

  actions: {
    // Modal management
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal;
      if (!this.showLoginModal) {
        document.body.classList.remove("modal-open");
      } else {
        document.body.classList.add("modal-open");
      }
    },

    toggleSignupModal() {
      this.showSignupModal = !this.showSignupModal;
      if (!this.showSignupModal) {
        document.body.classList.remove("modal-open");
      } else {
        document.body.classList.add("modal-open");
      }
    },

    // Authentication actions
    async login(credentials: LoginCredentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        const { token, user } = response.data;

        // Ensure user has required properties
        if (!user.role) {
          throw new Error('Invalid user data received');
        }

        this.token = token;
        this.user = user;
        this.isAuthenticated = true;

        // Store in localStorage with role
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Close login modal after successful login
        this.showLoginModal = false;
        document.body.classList.remove("modal-open");

        return response.data;
      } catch (error: any) {
        this.logout(); // Clear state on error
        throw new Error(error.response?.data?.message || "Failed to login");
      }
    },

    async register(credentials: RegisterCredentials) {
      try {
        const response = await axios.post('/auth/register', credentials);

        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;

        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        // Close signup modal after successful registration
        this.showSignupModal = false;
        document.body.classList.remove("modal-open");

        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to register");
      }
    },

    async logout() {
      const notificationStore = useNotificationStore();

      try {
        if (this.token) {
          await axios.post('/auth/logout');
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear auth state
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show success notification
        notificationStore.show({
          type: "success",
          title: "Logged Out",
          message: "You have been successfully logged out",
          duration: 4000,
          position: "top-right",
        });

      }
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
          this.logout();
          return false;
        }

        // First set stored data
        this.token = token;
        this.user = JSON.parse(storedUser);
        this.isAuthenticated = true;

        // Then verify with server
        const response = await axios.get('/auth/me');
        const { user } = response.data;

        // Update with fresh data from server
        if (user && user.role) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          throw new Error('Invalid user data received');
        }

        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },

    async updateProfile(userData: Partial<User>) {
      try {
        const response = await axios.patch('/auth/profile', userData);
        this.user = { ...this.user, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(this.user));

        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update profile");
      }
    },

    async changePassword(passwords: {
      currentPassword: string;
      newPassword: string;
    }) {
      try {
        const response = await axios.post('/auth/change-password', passwords);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to change password");
      }
    },

    updateBalance(newBalance: number) {
      if (this.user) {
        this.user.balance = Number(newBalance);
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },

    getUserBalance(): number {
      return this.user?.balance ?? 0;
    },

    updateUserData(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData };
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
  },

  getters: {
    isAdmin: (state) =>
      state.user?.role === "admin" || state.user?.role === "superuser",
    isSuperuser: (state) => state.user?.role === "superuser",
    userBalance: (state) => state.user?.balance || 0,
    userRole: (state) => state.user?.role || 'user', // Provide default role
  },
});
