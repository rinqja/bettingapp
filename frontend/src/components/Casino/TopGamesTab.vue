<template>
  <div
    class="tab-pane fade mt__30 text-white"
    id="casinot1"
    role="tabpanel"
    aria-labelledby="casinot1"
    tabIndex="0"
  >
    <!-- {/* Top Games */} -->
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-top"></i>
      </span>
      <span>Top Games</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in topGameData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { topGameData } from "../../assets/data/gameData";
import CasinoBoxCard from "../Cards/CasinoBoxCard.vue";
</script>

<style scoped></style>
