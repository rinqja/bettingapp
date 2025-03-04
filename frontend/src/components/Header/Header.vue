<template>
  <header class="main-header">
    <div class="header-container">
      <!-- Hamburger Menu Button -->
      <div class="hamburger-container">
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
      </div>
      <!-- Brand -->
      <div class="header-brand">
        <router-link to="/" class="brand-link">
          <span class="brand-text">BET</span>
        </router-link>
      </div>

      <nav class="desktop-nav" v-if="!isMobileMenuOpen">
        <div
          v-for="item in mainNavItems"
          :key="item.tab || item.path"
          class="nav-item"
        >
          <!-- For items with path (Casino, Promotions) -->
          <router-link
            v-if="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: currentPath === item.path }"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </router-link>

          <!-- For Sports (with submenu) -->
          <button
            v-else
            class="nav-link"
            :class="{ active: tabStore.currentTab === 'home' }"
            @click="handleTabClick('home')"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </button>
        </div>

        <!-- Auth Buttons for Desktop -->
        <div v-if="!isAuthenticated" class="auth-buttons">
          <button class="auth-btn login" @click="openLoginModal">Login</button>
          <button class="auth-btn signup" @click="openSignupModal">
            Sign Up
          </button>
        </div>
      </nav>

      <!-- New Profile Dropdown -->
      <!-- <div class="profile-dropdown" v-if="isAuthenticated">
        <button class="profile-btn" @click="showDropdown = !showDropdown">
          <i class="far fa-user-circle"></i>
        </button>
        
        <ul class="dropdown-menu" :class="{ 'show': showDropdown }">
          <li>
            <router-link to="/dashboard">
              <i class="fas fa-columns"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/my-bets">
              <i class="fas fa-ticket-alt"></i> My Bets
            </router-link>
          </li>
          <li>
            <router-link to="/profile">
              <i class="fas fa-user"></i> My Profile
            </router-link>
          </li>
          <li class="divider"></li>
          <li>
            <button @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div> -->

      <!-- Balance Display -->
      <div class="header-balance" v-if="isAuthenticated">
        <div class="balance-display">
          <span class="balance-label">Balance:</span>
          <span class="balance-amount">€{{ formatBalance(userBalance) }}</span>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div
        class="mobile-menu-overlay"
        :class="{ 'is-open': isMobileMenuOpen }"
        @click="closeMobileMenu"
      ></div>

      <!-- Mobile Menu Panel -->
      <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
        <div class="mobile-menu-header">
          <button
            class="close-menu-btn"
            @click="closeMobileMenu"
            aria-label="Close menu"
          ></button>
          <span class="menu-title">Menu</span>
        </div>

        <!-- User Info in Mobile Menu -->
        <div class="mobile-user-info" v-if="isAuthenticated">
          <span class="user-email">{{ username }}</span>
          <!-- Navigation -->
          <nav class="mobile-nav">
            <div
              v-for="item in mainNavItems"
              :key="item.tab || item.path"
              class="nav-item"
            >
              <router-link
                v-if="item.path"
                :to="item.path"
                class="nav-link"
                :class="{ active: currentPath === item.path }"
                @click="closeMobileMenu"
              >
                <i :class="item.icon"></i>
                {{ item.label }}
              </router-link>

              <template v-else>
                <!-- Existing mobile submenu code for Sports -->
                <button
                  class="nav-link submenu-trigger"
                  :class="{
                    active:
                      currentPath === item.path || isSubmenuOpen(item.label),
                  }"
                  @click="toggleSubmenu(item.label)"
                >
                  <i :class="item.icon"></i>
                  {{ item.label }}
                  <i
                    class="fas fa-chevron-down submenu-arrow"
                    :class="{ rotated: isSubmenuOpen(item.label) }"
                  ></i>
                </button>

                <div class="mobile-submenu" v-show="isSubmenuOpen(item.label)">
                  <button
                    v-for="subItem in item.submenu"
                    :key="subItem.tab"
                    class="submenu-link"
                    :class="{ active: tabStore.currentTab === subItem.tab }"
                    @click="handleMobileTabClick(subItem.tab)"
                  >
                    <i :class="subItem.icon"></i>
                    {{ subItem.label }}
                  </button>
                </div>
              </template>
            </div>
          </nav>

          <button class="auth-btn logout" @click="handleLogout">Logout</button>
        </div>
        <!-- Login/Signup in Mobile Menu -->
        <div class="mobile-user-actions" v-if="!isAuthenticated">
          <button class="auth-btn login" @click="openLoginModal">Login</button>
          <button class="auth-btn signup" @click="openSignupModal">
            Sign Up
          </button>
        </div>
      </div>

      <!-- Left Side Menu -->
      <div class="left-side-menu" v-if="isAuthenticated">
        <button class="menu-toggle-btn" @click="toggleLeftMenu">
          <i class="fas fa-bars"></i>
        </button>

        <div class="left-menu-panel" :class="{ 'is-open': isLeftMenuOpen }">
          <div class="left-menu-header">
            <div class="user-info">
              <i class="far fa-user-circle user-icon"></i>
              <span class="username">{{ username }}</span>
            </div>
          </div>

          <nav class="left-menu-nav">
            <router-link to="/profile" class="menu-item">
              <i class="fas fa-user"></i>
              <span>My Profile</span>
            </router-link>
            <router-link to="/my-bets" class="menu-item">
              <i class="fas fa-ticket-alt"></i>
              <span>My Bets</span>
            </router-link>
            <div class="menu-divider"></div>
            <button @click="handleLogout" class="menu-item logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        <!-- Overlay for closing menu -->
        <div
          class="left-menu-overlay"
          :class="{ 'is-open': isLeftMenuOpen }"
          @click="closeLeftMenu"
        ></div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal v-if="authStore.showLoginModal" />

    <!-- Signup Modal -->
    <SignUpModal v-if="authStore.showSignupModal" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useTabStore } from "../../stores/tab"; // Add this import
import LoginModal from "../Modals/LoginModal.vue";
import SignUpModal from "../Modals/SignUpModal.vue";
import { Modal } from "bootstrap";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const tabStore = useTabStore(); // Add this
const showUserMenu = ref(false);

const currentPath = computed(() => route.path);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const username = computed(() => authStore.user?.username || "");
const userBalance = computed(() => authStore.user?.balance || "0.00");

// Add admin nav items
const adminNavItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "fas fa-columns" },
  { path: "/admin/users", label: "Users", icon: "fas fa-users" },
  {
    path: "/admin/transactions",
    label: "Transactions",
    icon: "fas fa-exchange-alt",
  },
  { path: "/admin/coins", label: "Coin Management", icon: "fas fa-coins" },
];

// Update mainNavItems computation to include admin items when appropriate
const mainNavItems = computed(() => {
  const isAdmin =
    authStore.user?.role === "admin" || authStore.user?.role === "superuser";
  const baseItems = [
    {
      tab: "sports",
      label: "Sports",
      icon: "fas fa-table-tennis",
      submenu: [
        { tab: "live", label: "Live", icon: "fas fa-play" },
        { tab: "today", label: "Today", icon: "icon-calendar" },
        { tab: "football", label: "Football", icon: "fas fa-futbol" },
        {
          tab: "basketball",
          label: "Basketball",
          icon: "fas fa-basketball-ball",
        },
        { tab: "tennis", label: "Tennis", icon: "fas fa-table-tennis" },
      ],
    },
    { path: "/casino", label: "Casino", icon: "icon-casino" },
    { path: "/promotions", label: "Promotions", icon: "icon-gift" },
  ];

  return isAdmin ? [...adminNavItems] : baseItems;
});

// Separate mobile nav items to include My Bets and Dashboard
const mobileNavItems = computed(() => [
  ...mainNavItems.value,
  ...(isAuthenticated.value
    ? [
        { path: "/my-bets", label: "My Bets", icon: "fas fa-ticket-alt" },
        { path: "/dashboard", label: "Dashboard", icon: "far fa-user-circle" },
      ]
    : []),
]);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    // Close any open menus
    isMobileMenuOpen.value = false;
    showDropdown.value = false;

    // Redirect to auth page
    router.push("/auth");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Modal handling
const openLoginModal = () => {
  authStore.toggleLoginModal();
};

const openSignupModal = () => {
  authStore.toggleSignupModal();
};

// Add balance formatter
const formatBalance = (balance: number | string) => {
  return Number(balance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // Optional: prevent body scroll when menu is open
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

// Close mobile menu when route changes
watch(currentPath, () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
});

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

const isProfileMenuOpen = ref(false);

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el._clickOutside = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el._clickOutside);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener("click", el._clickOutside);
  },
};

// Close profile menu when route changes
watch(currentPath, () => {
  closeProfileMenu();
});

const showDropdown = ref(false);

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    const dropdown = document.querySelector(".profile-dropdown");
    const target = e.target as HTMLElement;
    if (dropdown && !dropdown.contains(target)) {
      showDropdown.value = false;
    }
  });
});

const isLeftMenuOpen = ref(false);

const toggleLeftMenu = () => {
  isLeftMenuOpen.value = !isLeftMenuOpen.value;
};

const closeLeftMenu = () => {
  isLeftMenuOpen.value = false;
};

// Close left menu on route change
watch(currentPath, () => {
  closeLeftMenu();
});

// Add submenu state management
const openSubmenus = ref<string[]>([]);

const toggleSubmenu = (label: string) => {
  if (openSubmenus.value.includes(label)) {
    openSubmenus.value = openSubmenus.value.filter((item) => item !== label);
  } else {
    openSubmenus.value.push(label);
  }
};

const isSubmenuOpen = (label: string) => {
  return openSubmenus.value.includes(label);
};

// Add tab handling function
const handleTabClick = async (tab: string, shouldNavigate: boolean = false) => {
  if (shouldNavigate || route.path !== "/") {
    await router.push("/");
  }
  tabStore.setCurrentTab(tab);
};

// Optional: Update mobile menu handler to use the same logic
const handleMobileTabClick = async (
  tab: string,
  shouldNavigate: boolean = false
) => {
  if (shouldNavigate || route.path !== "/") {
    await router.push("/");
  }
  tabStore.setCurrentTab(tab);
  closeMobileMenu();
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
  justify-content: space-around;
  padding: 0.5rem 1rem;
  position: relative;
  height: 60px;
  max-width: 1440px;
  margin: 0 auto;
}

.hamburger-container {
  order: 1; /* Make it first in the flex order */
  margin-right: auto; /* Push other items to the right */
}

.header-brand {
  order: 2;
  position: relative;
  left: auto;
  transform: none;
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
  position: relative; /* Change from absolute to relative */
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1250; /* Increased z-index to be above mobile menu */
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: var(--white);
  transition: all 0.3s ease;
}

/* Add these new styles for the active state */
.hamburger-btn.is-active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-btn.is-active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.is-active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1150; /* Increased z-index to be between menu and betslip */
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
  width: 100%; /* Changed from 280px to 100% */
  height: 100vh;
  background: var(--header);
  z-index: 1200; /* Increased z-index to be higher than betslip */
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 0; /* Remove default padding */
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
  display: none;
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
  display: none;
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

/* Header Balance Styles */
.header-balance {
  order: 4;
  position: relative;
  right: auto;
  margin-left: 1rem;
  margin-right: 1rem;
}

.balance-display {
  background: var(--pointbox);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--leftpreborder);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.balance-label {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.balance-amount {
  color: var(--active-color);
  font-weight: 600;
  font-size: 1rem;
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
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 0.9rem;
  line-height: 1;
}

.auth-btn.login {
  background: var(--active-color);
  color: var(--black);
}

.auth-btn.signup {
  background: var(--pointbox);
  color: var(--white);
  font-size: 0.85rem;
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
  .header-container {
    justify-content: space-between;
    padding: 0.5rem;
  }

  .header-balance {
    margin-left: auto;
    margin-right: 0.5rem;
  }

  .hamburger-btn {
    position: relative;
    left: 0;
  }

  .mobile-user-actions .auth-btn {
    flex: 1;
    height: 40px;
  }
}

.desktop-nav {
  order: 3;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.desktop-nav .nav-link {
  color: var(--white);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.desktop-nav .nav-link:hover,
.desktop-nav .nav-link.active {
  background: var(--pointbox);
}

/* Hide desktop nav on mobile */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}

/* Update Auth Button Styles */
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.auth-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 0.9rem;
  line-height: 1;
}

.auth-btn.login {
  background: var(--active-color);
  color: var(--black);
}

.auth-btn.signup {
  background: var(--pointbox);
  color: var(--white);
  font-size: 0.85rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .auth-buttons {
    display: none;
  }

  .mobile-user-actions {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
  }

  .mobile-user-actions .auth-btn {
    flex: 1;
    height: 40px;
  }
}

.profile-menu-wrapper {
  position: relative;
  margin-right: 1rem;
}

.profile-circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--pointbox);
  border: none;
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.profile-circle-btn i {
  font-size: 1.2rem;
}

.profile-circle-btn:hover,
.profile-circle-btn.active {
  background: var(--active-color);
  transform: translateY(-1px);
}

.profile-dropdown {
  position: relative;
  margin-right: 1rem;
}

.profile-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--pointbox);
  border: none;
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-btn i {
  font-size: 1.2rem;
}

.profile-btn:hover {
  background: var(--active-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 200px;
  background: var(--header);
  border: 1px solid var(--leftpreborder);
  border-radius: 8px;
  padding: 0.5rem 0;
  list-style: none;
  display: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu.show {
  display: block;
}

.dropdown-menu li {
  padding: 0;
}

.dropdown-menu li a,
.dropdown-menu li button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: var(--white);
  text-decoration: none;
  width: 100%;
  border: none;
  background: none;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu li a:hover,
.dropdown-menu li button:hover {
  background: var(--pointbox);
}
.dropdown-menu li:last-child button {
  color: #ff4d4d; /* Red color for logout */
}
.dropdown-menu li:last-child button:hover {
  background: rgba(255, 77, 77, 0.1); /* Slight red tint on hover */
}
.dropdown-menu .divider {
  border-top: 1px solid var(--leftpreborder);
  margin: 0.5rem 0;
}

.dropdown-menu li button {
  color: var(--danger);
}

@media (max-width: 768px) {
  .profile-dropdown {
    display: none;
  }
}

/* Left Side Menu Styles */
.left-side-menu {
  position: relative;
  margin-right: 1rem;
}

.menu-toggle-btn {
  width: 40px;
  height: 40px;
  padding-left: 0.5rem;
  border-radius: 50%;
  background: var(--pointbox);
  border: none;
  color: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.menu-toggle-btn:hover {
  background: var(--active-color);
}

.menu-toggle-btn i {
  font-size: 1.2rem;
}

.left-menu-panel {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: var(--header);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  border-right: 1px solid var(--leftpreborder);
}

.left-menu-panel.is-open {
  transform: translateX(0);
}

.left-menu-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--leftpreborder);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-icon {
  font-size: 2rem;
  color: var(--active-color);
}

.username {
  color: var(--white);
  font-weight: 600;
  font-size: 1.1rem;
}

.left-menu-nav {
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: var(--white);
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--pointbox);
}

.menu-item i {
  width: 20px;
  text-align: center;
}

.menu-divider {
  height: 1px;
  background: var(--leftpreborder);
  margin: 0.5rem 0;
}

.menu-item.logout {
  color: #ff4d4d;
}

.menu-item.logout:hover {
  background: rgba(255, 77, 77, 0.1);
}

.left-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.left-menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .left-side-menu {
    display: none;
  }
}

/* Update the media queries */
@media (max-width: 768px) {
  /* Adjust left menu button position for mobile */
  .menu-toggle-btn {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  /* Make left menu panel take full width on mobile */
  .left-menu-panel {
    width: 100%;
  }

  .mobile-menu {
    width: 100%; /* Ensure menu takes full width */
    max-width: 100vw; /* Prevent overflow */
    padding: 0 1rem; /* Add some padding */
  }
}

/* Mobile Menu Auth Buttons */
@media (max-width: 768px) {
  .mobile-user-actions {
    padding: 1rem;
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }

  .mobile-user-actions .auth-btn {
    flex: 1;
    height: 44px; /* Increased height */
    width: 100%; /* Full width */
    min-width: 140px; /* Minimum width */
    font-size: 1rem; /* Slightly larger font */
    padding: 0.75rem 1.5rem; /* More padding */
  }

  .mobile-menu {
    width: 100%; /* Ensure menu takes full width */
    max-width: 100vw; /* Prevent overflow */
    padding: 0 1rem; /* Add some padding */
  }
}

/* Ensure safe area support on mobile */
@supports (padding: max(0px)) {
  @media (max-width: 768px) {
    .mobile-user-actions {
      padding: 1rem max(1rem, env(safe-area-inset-right))
        max(1rem, env(safe-area-inset-bottom))
        max(1rem, env(safe-area-inset-left));
    }
  }
}

/* Add new styles for submenu */
.nav-item-with-submenu {
  position: relative;
}

.submenu-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--white);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.submenu-arrow {
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.submenu-arrow.rotated {
  transform: rotate(180deg);
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--header);
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  min-width: 200px;
  z-index: 1000;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Update submenu-link styles to match parent nav-link */
.submenu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.submenu-link:hover,
.submenu-link.active {
  background: var(--pointbox);
  color: var(--active-color);
}

/* Mobile submenu styles */
.mobile-submenu {
  background: var(--pointbox);
  margin: 0.5rem 0;
  border-radius: 4px;
}

.mobile-submenu .submenu-link {
  padding: 1rem 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .submenu {
    position: static;
    border: none;
    background: transparent;
  }

  .mobile-submenu {
    padding-left: 1rem;
  }
}

/* Update desktop nav styles */
@media (min-width: 769px) {
  .nav-item-with-submenu .submenu,
  .submenu-trigger .submenu-arrow {
    display: none;
  }

  .nav-item-with-submenu {
    position: static;
  }
}

/* Keep mobile submenu styles */
@media (max-width: 768px) {
  .nav-item-with-submenu,
  .submenu,
  .submenu-arrow {
    display: block;
  }
}
</style>
