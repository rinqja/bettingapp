<template>
  <div
    class="tab-pane fade text-white mt__30"
    id="casinot7"
    role="tabpanel"
    aria-labelledby="casinot7"
    tabIndex="0"
  >
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-live"></i>
      </span>
      <span>Live Games</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in liveGameData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" :live="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { liveGameData } from "../../assets/data/gameData";
import CasinoBoxCard from "../Cards/CasinoBoxCard.vue";
</script>

<style scoped></style>
