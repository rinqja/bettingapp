<template>
  <div
    class="tab-pane fade text-white mt__30"
    id="casinot3"
    role="tabpanel"
    aria-labelledby="casinot3"
    tabIndex="0"
  >
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-popular"></i>
      </span>
      <span>Popular</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in popularGameData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { popularGameData } from "../../assets/data/gameData";
import CasinoBoxCard from "../Cards/CasinoBoxCard.vue";
</script>

<style scoped></style>
