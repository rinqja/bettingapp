<script setup lang="ts">
import { ref } from "vue";
import logo from "../../assets/img/logo/logo.png";
import { RouterLink } from "vue-router";

const props = defineProps<{
  isOpen: boolean;
  handleClick: () => void;
}>();

const menuActive = ref(false);

const handleMenuActive = () => {
  menuActive.value = !menuActive.value;
};
const handleIsOpen = (e: any) => {
  e.stopPropagation();
  props.handleClick();
};
</script>

<template>
  <header class="header-section dashboard__header">
    <div class="container p-0">
      <div class="header-wrapper">
        <div class="menu__left__wrap">
          <div class="logo-menu px-2">
            <RouterLink to="/" class="logo">
              <img :src="logo" alt="logo" />
            </RouterLink>
          </div>
          <ul class="main-menu" :class="menuActive && 'active'">
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
              <RouterLink to="/casino" class="active">
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
            <li class="cmn-grp">
              <span class="cmn--btn">
                <span class="rela">Deposit</span>
              </span>
            </li>
          </ul>
        </div>
        <div class="dashboar__wrap">
          <div class="items d__text">
            <span class="small">Your balance</span>
            <h6>$9.22</h6>
          </div>
          <div class="items d__cmn">
            <RouterLink to="#" class="cmn--btn">
              <span>Deposit</span>
            </RouterLink>
          </div>
          <div class="items dashboar__social">
            <RouterLink to="#" class="icons">
              <i class="icon-gift"></i>
              <span class="count">2</span>
            </RouterLink>
            <RouterLink to="#" class="icons">
              <i class="icon-message"></i>
              <span class="count">2</span>
            </RouterLink>
            <div class="custom-dropdown" @click="handleIsOpen">
              <div class="custom-dropdown__user" data-set="custom-dropdown">
                <RouterLink to="#" class="icons">
                  <i class="icon-user text-white"></i>
                </RouterLink>
              </div>
              <div
                class="custom-dropdown__content"
                :class="{ 'is-open': isOpen }"
              >
                <div class="custom-dropdown__body">
                  <ul class="custom-dropdown__list">
                    <li>
                      <RouterLink
                        to="/dashboard"
                        class="custom-dropdown__body-link"
                      >
                        <span class="custom-dropdown__body-icon">
                          <i class="fas fa-layer-group"></i>
                        </span>
                        <span class="custom-dropdown__body-text">
                          Dashboard
                        </span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="#" class="custom-dropdown__body-link">
                        <span class="custom-dropdown__body-icon">
                          <i class="fas fa-cog"></i>
                        </span>
                        <span class="custom-dropdown__body-text">
                          Settings
                        </span>
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="#" class="custom-dropdown__body-link">
                        <span class="custom-dropdown__body-icon">
                          <i class="fas fa-sign-out-alt"></i>
                        </span>
                        <span class="custom-dropdown__body-text"> Logout </span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="lang d-flex align-items-center px-2">
            <div
              class="header-bar d-lg-none"
              :class="menuActive && 'active'"
              @click="handleMenuActive"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
