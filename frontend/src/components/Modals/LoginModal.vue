<template>
  <div
    class="modal register__modal"
    id="signInPin"
    tabIndex="-1"
    aria-hidden="true"
    :class="{ 'show-modal': authStore.showLoginModal }"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Login to Your Account</h4>
          <button
            type="button"
            class="btn-close"
            @click="authStore.toggleLoginModal"
            aria-label="Close"
          ></button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <i class="fa fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  v-model="loginForm.email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <i class="fa fa-lock"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="loginForm.password"
                  placeholder="Enter your password"
                  required
                />
                <i 
                  class="fa password-toggle"
                  :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                  @click="showPassword = !showPassword"
                ></i>
              </div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input
                  type="checkbox"
                  v-model="loginForm.remember"
                />
                Remember me
              </label>
              <a href="#" @click.prevent="handleForgotPassword" class="forgot-password">
                Forgot Password?
              </a>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <button 
              type="submit" 
              class="login-btn" 
              :disabled="loading"
            >
              <span v-if="!loading">Login</span>
              <i v-else class="fa fa-spinner fa-spin"></i>
            </button>
          </form>

          <div class="register-link">
            Don't have an account? 
            <a href="#" @click.prevent="switchToSignup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../../stores/notification'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await authStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      remember: loginForm.value.remember
    })

    notificationStore.show({
      type: 'success',
      title: 'Login Successful',
      message: 'Welcome back!',
      duration: 5000,
      position: 'top-right'
    })

    if (authStore.user?.role === 'superuser' || authStore.user?.role === 'admin') {
      await router.push('/admin/dashboard')
    } else {
      await router.push('/')
    }

  } catch (err: any) {
    error.value = err.message || 'Failed to login. Please try again.'
    
    notificationStore.show({
      type: 'error',
      title: 'Login Failed',
      message: error.value,
      duration: 5000,
      position: 'top-right'
    })
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
}

const switchToSignup = () => {
  authStore.toggleLoginModal()
  authStore.toggleSignupModal()
}
</script>

<style scoped>
.register__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.show-modal {
  display: flex !important;
}

.modal-dialog {
  width: 100%;
  max-width: 500px;
  margin: 1.75rem auto;
  pointer-events: all;
}

.modal-content {
  background: var(--subheader);
  border: 1px solid var(--leftpreborder);
  border-radius: 12px;
  color: var(--white);
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--leftpreborder);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--white);
}

.btn-close {
  background: none;
  border: none;
  color: var(--textcolor);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: var(--pointbox);
  color: var(--active-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.75rem;
  color: var(--white);
  font-size: 1rem;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 1rem;
  color: var(--textcolor);
  font-size: 1.1rem;
}

.input-wrapper .password-toggle {
  left: auto;
  right: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.input-wrapper .password-toggle:hover {
  color: var(--active-color);
}

.input-wrapper input {
  width: 100%;
  padding: 1rem 2.5rem;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 8px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.input-wrapper input:hover {
  background: var(--preactive);
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--active-color);
  background: var(--preactive);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--white);
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
}

.remember-me input[type="checkbox"] {
  accent-color: var(--active-color);
}

.forgot-password {
  color: var(--active-color);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: var(--active-two);
}

.error-message {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  border: 1px solid rgba(220, 53, 69, 0.2);
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: var(--active-color);
  border: none;
  border-radius: 8px;
  color: var(--black);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background: var(--active-two);
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 2rem;
  color: var(--white);
  font-size: 1rem;
}

.register-link a {
  color: var(--active-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.register-link a:hover {
  color: var(--active-two);
  text-decoration: none;
}

@media (max-width: 768px) {
  .modal-dialog {
    max-width: 90%;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .form-group label {
    font-size: 0.95rem;
  }

  .input-wrapper input {
    padding: 0.875rem 2.5rem;
    font-size: 0.95rem;
  }

  .login-btn {
    padding: 0.875rem;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
