<script setup lang="ts">
import uk from "../../assets/img/header/uk.png";
import logo from "../../assets/img/logo/logo.png";
import { ref } from "vue";
import Select from "../Select/Select.vue";
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const active = ref(false);

const lang = [
  { id: 1, name: "En" },
  { id: 2, name: "Cy" },
  { id: 3, name: "Et" },
];

const handleActive = () => {
  active.value = !active.value;
};

const formatBalance = (balance: number) => {
  return balance.toFixed(2);
};
</script>

<template>
  <header class="header-section py-1 py-lg-3">
    <div class="container-fluid p-0">
      <div class="header-wrapper">
        <div class="menu__left__wrap">
          <div class="logo-menu px-2">
            <RouterLink to="/" class="logo">
              <img :src="logo" alt="logo" />
            </RouterLink>
          </div>
          <div class="lang d-flex align-items-center px-2">
            <div class="language__wrap">
              <div class="flag">
                <img :src="uk" alt="flag" />
              </div>
              <Select :data="lang" />
            </div>
            <div
              class="header-bar d-lg-none"
              :class="active ? 'active' : ''"
              @click="handleActive"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ul class="main-menu" :class="active ? 'active' : ''">
            <li>
              <RouterLink to="/">
                <span>Live</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/sportsbetting">
                <span>Sports Betting</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/casino">
                <span>Casino</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#">
                <span>Lucky Drops</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/livecasino">
                <span>Live Casino</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/promotions">
                <span>Promotions</span>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="mneu-btn-grp">
          <div v-if="authStore.isAuthenticated" class="user-balance">
            <i class="icon-coins"></i>
            <span class="balance-amount">{{ formatBalance(authStore.userBalance) }}</span>
          </div>

          <div class="language__wrap">
            <div class="flag">
              <img :src="uk" alt="flag" />
            </div>
            <Select :data="lang" />
          </div>

          <template v-if="!authStore.isAuthenticated">
            <RouterLink
              to="#"
              class="cmn--btn"
              data-bs-toggle="modal"
              data-bs-target="#signInPin"
            >
              <span>Sign In</span>
            </RouterLink>
            <RouterLink
              to="#"
              class="cmn--btn2"
              data-bs-toggle="modal"
              data-bs-target="#signUpPin"
            >
              <span class="rela">Sign Up</span>
            </RouterLink>
          </template>

          <template v-else>
            <button @click="authStore.logout" class="cmn--btn">
              <span>Logout</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.user-balance {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--signbet);
  border-radius: 20px;
  margin-right: 1rem;
}

.icon-coins {
  color: var(--active-color);
}

.balance-amount {
  font-weight: 600;
  color: var(--active-color);
}

@media (max-width: 768px) {
  .user-balance {
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
