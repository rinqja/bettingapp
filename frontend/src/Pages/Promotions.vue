<template>
  <div class="main-layout">
    <Header />
    <PromotionMain />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header/Header.vue";
import PromotionMain from "../components/Promotions/PromotionMain.vue";
</script>

<style scoped>
.main-layout {
  width: 100%;
  min-height: 100vh;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
}
</style>
