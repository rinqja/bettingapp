<template>
  <form @submit.prevent="handleRegister">
    <div class="form-group">
      <label for="username">Username</label>
      <div class="input-wrapper">
        <i class="fa fa-user"></i>
        <input
          type="text"
          id="username"
          v-model="registerForm.username"
          placeholder="Enter your username"
          required
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <div class="input-wrapper">
        <i class="fa fa-envelope"></i>
        <input
          type="email"
          id="email"
          v-model="registerForm.email"
          placeholder="Enter your email"
          required
          class="form-input"
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
          v-model="registerForm.password"
          placeholder="Enter your password"
          required
          class="form-input"
        />
        <i
          class="fa password-toggle"
          :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
          @click="showPassword = !showPassword"
        ></i>
      </div>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <div class="input-wrapper">
        <i class="fa fa-lock"></i>
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          id="confirmPassword"
          v-model="registerForm.confirmPassword"
          placeholder="Confirm your password"
          required
          class="form-input"
        />
        <i
          class="fa password-toggle"
          :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
          @click="showConfirmPassword = !showConfirmPassword"
        ></i>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" class="signup-btn" :disabled="loading">
      <span v-if="!loading">Sign Up</span>
      <i v-else class="fa fa-spinner fa-spin"></i>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notification";

const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const error = ref("");

const registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = async () => {
  try {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      error.value = "Passwords do not match";
      return;
    }

    loading.value = true;
    error.value = "";

    await authStore.register({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
    });

    notificationStore.show({
      type: "success",
      title: "Registration Successful",
      message: "Welcome to SportOdds!",
      duration: 5000,
      position: "top-right",
    });

    if (authStore.user?.role === "superuser" || authStore.user?.role === "admin") {
      await router.push("/admin/dashboard");
    } else {
      await router.push("/");
    }
  } catch (err: any) {
    error.value = err.message || "Failed to register. Please try again.";

    notificationStore.show({
      type: "error",
      title: "Registration Failed",
      message: error.value,
      duration: 5000,
      position: "top-right",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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

.form-input {
  width: 100%;
  padding: 1rem 2.5rem;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 8px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-input:hover {
  background: var(--preactive);
}

.form-input:focus {
  outline: none;
  border-color: var(--active-color);
  background: var(--preactive);
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

.signup-btn {
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

.signup-btn:hover:not(:disabled) {
  background: var(--active-two);
  transform: translateY(-1px);
}

.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .form-group label {
    font-size: 0.95rem;
  }

  .form-input {
    padding: 0.875rem 2.5rem;
    font-size: 0.95rem;
  }

  .signup-btn {
    padding: 0.875rem;
  }
}
</style> 