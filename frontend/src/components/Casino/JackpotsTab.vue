<template>
  <div
    class="tab-pane fade text-white mt__30"
    id="casinot6"
    role="tabpanel"
    aria-labelledby="casinot6"
    tabIndex="0"
  >
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-jackpot"></i>
      </span>
      <span>Jackpots</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in jackpotData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { jackpotData } from "../../assets/data/gameData";
import CasinoBoxCard from "../Cards/CasinoBoxCard.vue";
</script>

<style scoped></style>
