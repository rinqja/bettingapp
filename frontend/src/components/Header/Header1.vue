<template>
    <header class="main-header">
      <div class="header-container">
        <!-- Hamburger Menu Button (mobile only) -->
        <button 
          class="hamburger-btn"
          :class="{ 'is-active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
  
        <!-- Brand -->
        <div class="header-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-text">SportOdds</span>
          </router-link>
        </div>
  
        <!-- Desktop Navigation -->
        <nav class="main-nav">
          <router-link
            v-for="item in mainNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: currentPath === item.path }"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </router-link>
        </nav>
  
        <!-- Desktop User Actions -->
        <div class="header-actions">
          <div v-if="!isAuthenticated" class="auth-buttons">
            <button class="auth-btn login" @click="openLoginModal">Login</button>
            <button class="auth-btn signup" @click="openSignupModal">Sign Up</button>
          </div>
  
          <div v-else class="user-menu">
            <router-link to="/my-bets" class="nav-link">
              <i class="fas fa-ticket-alt"></i>
              My Bets
            </router-link>
            <router-link to="/dashboard" class="nav-link">
              <i class="far fa-user-circle"></i>
              Dashboard
            </router-link>
            <div class="balance-display">
              <span class="balance-label">Balance:</span>
              <span class="balance-amount">€{{ formatBalance(userBalance) }}</span>
            </div>
            <button class="auth-btn logout" @click="handleLogout">Logout</button>
          </div>
        </div>
  
        <!-- Mobile Menu Components -->
        <div class="mobile-menu-overlay" 
             :class="{ 'is-open': isMobileMenuOpen }"
             @click="closeMobileMenu">
        </div>
  
        <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
          <div class="mobile-menu-header">
            <span class="menu-title">Menu</span>
            <button 
              class="close-menu-btn"
              @click="closeMobileMenu"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
  
          <!-- User Info in Mobile Menu -->
          <div class="mobile-user-info" v-if="isAuthenticated">
            <span class="user-email">{{ username }}</span>
            <div class="balance-display">
              <span class="balance-label">Balance:</span>
              <span class="balance-amount">€{{ formatBalance(userBalance) }}</span>
            </div>
          </div>
  
          <!-- Navigation -->
          <nav class="mobile-nav">
            <router-link
              v-for="item in mobileNavItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
              :class="{ active: currentPath === item.path }"
              @click="closeMobileMenu"
            >
              <i :class="item.icon"></i>
              {{ item.label }}
            </router-link>
          </nav>
  
          <!-- Login/Signup in Mobile Menu -->
          <div class="mobile-user-actions" v-if="!isAuthenticated">
            <button class="auth-btn login" @click="openLoginModal">Login</button>
            <button class="auth-btn signup" @click="openSignupModal">Sign Up</button>
          </div>
        </div>
      </div>
  
      <!-- Login Modal -->
      <LoginModal ref="loginModalRef" />
  
      <!-- Signup Modal -->
      <SignUpModal ref="signupModalRef" />
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  import LoginModal from '../Modals/LoginModal.vue';
  import SignUpModal from '../Modals/SignUpModal.vue';
  import { Modal } from 'bootstrap';
  
  const route = useRoute();
  const authStore = useAuthStore();
  const showUserMenu = ref(false);
  
  const currentPath = computed(() => route.path);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const username = computed(() => authStore.user?.username || '');
  const userBalance = computed(() => authStore.user?.balance || '0.00');
  
  const mainNavItems = [
    { path: '/sportsbetting', label: 'Sports', icon: 'fas fa-table-tennis' },
    { path: '/casino', label: 'Casino', icon: 'icon-casino' },
    { path: '/livecasino', label: 'Live Casino', icon: 'icon-live' },
    { path: '/promotions', label: 'Promotions', icon: 'icon-gift' },
  ];
  
  // Separate mobile nav items to include My Bets and Dashboard
  const mobileNavItems = computed(() => [
    ...mainNavItems,
    ...(isAuthenticated.value ? [
      { path: '/my-bets', label: 'My Bets', icon: 'fas fa-ticket-alt' },
      { path: '/dashboard', label: 'Dashboard', icon: 'far fa-user-circle' },
    ] : [])
  ]);
  
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };
  
  const handleLogout = () => {
    authStore.logout();
    showUserMenu.value = false;
  };
  
  // Modal handling
  const openLoginModal = () => {
    loginModalRef.value?.showModal();
  };
  
  const openSignupModal = () => {
    const modalEl = document.getElementById('signUpPin');
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  };
  
  // Add balance formatter
  const formatBalance = (balance: number | string) => {
    return Number(balance).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  const isMobileMenuOpen = ref(false);
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    // Optional: prevent body scroll when menu is open
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
  };
  
  // Close mobile menu when route changes
  watch(currentPath, () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  });
  
  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
  };
  </script>
  
  <style scoped>
  .main-header {
    position: sticky;
    top: 0;
    background: var(--header);
    border-bottom: 1px solid var(--leftpreborder);
    z-index: 100;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    position: relative;
    height: 60px;
  }
  
  .header-brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .header-brand .brand-link {
    text-decoration: none;
  }
  
  .brand-text {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 600;
    transition: color 0.2s ease;
  }
  
  .brand-text:hover {
    color: var(--active-color);
  }
  
  /* Hamburger Button */
  .hamburger-btn {
    position: absolute;
    left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
  }
  
  .hamburger-line {
    width: 100%;
    height: 2px;
    background-color: var(--white);
    transition: all 0.3s ease;
  }
  
  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .mobile-menu-overlay.is-open {
    opacity: 1;
    visibility: visible;
  }
  
  /* Mobile Menu Panel */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100%;
    background: var(--header);
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .mobile-menu.is-open {
    transform: translateX(0);
  }
  
  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--leftpreborder);
  }
  
  .menu-title {
    color: var(--white);
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .close-menu-btn {
    background: none;
    border: none;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .close-menu-btn:hover {
    background: var(--pointbox);
  }
  
  .mobile-nav {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: var(--white);
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .nav-link:hover,
  .nav-link.active {
    background: var(--pointbox);
  }
  
  .mobile-user-actions {
    padding: 1rem;
    border-top: 1px solid var(--leftpreborder);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  /* Hide desktop nav and actions on mobile */
  @media (max-width: 768px) {
    .main-nav,
    .header-actions {
      display: none;
    }
  }
  
  /* Show hamburger only on mobile */
  @media (min-width: 769px) {
    .hamburger-btn {
      display: none;
    }
  }
  
  /* Safe area support */
  @supports (padding: max(0px)) {
    .main-header {
      padding-left: max(2rem, env(safe-area-inset-left));
      padding-right: max(2rem, env(safe-area-inset-right));
      padding-top: max(0px, env(safe-area-inset-top));
    }
  }
  
  /* Modal styles */
  .modal-content {
    background: var(--subheader);
    border: 1px solid var(--leftpreborder);
    border-radius: 8px;
    color: var(--white);
  }
  
  /* Ensure modal appears above header */
  :deep(.modal) {
    z-index: 1050 !important;
  }
  
  :deep(.modal-backdrop) {
    z-index: 1040 !important;
  }
  
  /* Updated Header Balance Styles */
  .header-balance {
    position: absolute;
    right: 1rem;
  }
  
  .balance-display {
    background: var(--pointbox);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    border: 1px solid var(--leftpreborder);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
  }
  
  .balance-label {
    color: var(--textcolor);
    font-size: 0.8rem;
  }
  
  .balance-amount {
    color: var(--active-color);
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  /* Mobile User Info Styles */
  .mobile-user-info {
    padding: 1rem;
    border-bottom: 1px solid var(--leftpreborder);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .user-email {
    color: var(--textcolor);
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  
  /* Auth Button Styles */
  .auth-btn {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .auth-btn.login {
    background: var(--active-color);
    color: var(--black);
  }
  
  .auth-btn.signup {
    background: var(--pointbox);
    color: var(--white);
  }
  
  .auth-btn.logout {
    background: var(--button-one);
    color: var(--white);
  }
  
  .auth-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .header-balance {
      right: 0.5rem;
    }
  
    .balance-display {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
  }
  
  /* Desktop Navigation */
  .main-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: 2rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--white);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }
  
  .nav-link:hover,
  .nav-link.active {
    color: var(--active-color);
  }
  
  /* Desktop Header Actions */
  .header-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .auth-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .user-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .user-menu .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .user-menu .nav-link:hover {
    background: var(--pointbox);
    color: var(--white);
  }
  
  /* Updated Balance Display */
  .balance-display {
    background: var(--pointbox);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    border: 1px solid var(--leftpreborder);
    display: flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
  }
  
  .balance-label {
    color: var(--textcolor);
    font-size: 0.8rem;
  }
  
  .balance-amount {
    color: var(--active-color);
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  /* Auth Buttons */
  .auth-btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .auth-btn.login {
    background: var(--active-color);
    color: var(--black);
  }
  
  .auth-btn.signup {
    background: var(--pointbox);
    color: var(--white);
  }
  
  .auth-btn.logout {
    background: var(--button-one);
    color: var(--white);
  }
  
  .auth-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .main-nav,
    .header-actions {
      display: none; /* Hide desktop nav and actions on mobile */
    }
  
    .hamburger-btn {
      display: flex; /* Show hamburger on mobile */
    }
  }
  
  @media (min-width: 769px) {
    .hamburger-btn {
      display: none; /* Hide hamburger on desktop */
    }
  
    .mobile-menu,
    .mobile-menu-overlay {
      display: none; /* Hide mobile menu on desktop */
    }
  }
  </style>
  