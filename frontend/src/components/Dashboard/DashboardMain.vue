<script setup lang="ts">
import { ref } from "vue";
import DashboardHeader from "../Header/DashboardHeader.vue";
import FooterMobile from "../Footer/FooterMobile.vue";
import DashboardSidebar from "../Common/DashboardSidebar.vue";

const isOpen = ref(false);

const handleClick = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <DashboardHeader :isOpen="isOpen" :handleClick="handleClick" />

    <section class="dashboard__body mt__30 pb-60">
      <div class="container">
        <div class="row g-4">
          <div class="col-xxl-3 col-xl-3 col-lg-4">
            <DashboardSidebar />
          </div>
          <div class="col-xxl-9 col-xl-9 col-lg-8">
            <slot />
          </div>
        </div>
      </div>

      <FooterMobile />
    </section>
  </div>
</template>

<style scoped></style>
