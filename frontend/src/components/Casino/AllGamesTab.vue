<template>
  <div
    class="tab-pane mt__30 fade text-white"
    :class="`${show}`"
    id="casinot8"
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
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <CasinoBoxCard :img="t1" />
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="topGameData[1]" />
          <CasinoBoxCard :img="topGameData[2]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="topGameData[3]" />
          <CasinoBoxCard :img="topGameData[4]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="topGameData[5]" />
          <CasinoBoxCard :img="topGameData[6]" />
        </div>
      </div>
    </div>
    <!-- {/* New Games */} -->
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-new"></i>
      </span>
      <span>New Games</span>
    </div>
    <div class="row g-4 pb-60">
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <CasinoBoxCard :img="n1" />
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="newGameData[1]" />
          <CasinoBoxCard :img="newGameData[2]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="newGameData[3]" />
          <CasinoBoxCard :img="newGameData[4]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="newGameData[5]" />
          <CasinoBoxCard :img="newGameData[6]" />
        </div>
      </div>
    </div>
    <!-- {/* Popular Games */} -->
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-popular"></i>
      </span>
      <span>Popular Games</span>
    </div>
    <div class="row g-4 pb-60">
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <CasinoBoxCard :img="popu" />
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="popularGameData[1]" />
          <CasinoBoxCard :img="popularGameData[2]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="popularGameData[3]" />
          <CasinoBoxCard :img="popularGameData[4]" />
        </div>
      </div>
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="casino__box__dobble">
          <CasinoBoxCard :img="popularGameData[5]" />
          <CasinoBoxCard :img="popularGameData[6]" />
        </div>
      </div>
    </div>
    <!-- {/* slots Games */} -->
    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-slots"></i>
      </span>
      <span>Slots</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in slotsData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" />
      </div>
    </div>
    <!-- {/* jackpots Games */} -->
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

    <div class="common__head mb__30">
      <span class="icons">
        <i class="icon-game"></i>
      </span>
      <span>All Games</span>
    </div>
    <div class="row g-4 pb-60">
      <div
        v-for="(itm, i) in allGameData"
        :key="i"
        class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
      >
        <CasinoBoxCard :img="itm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  allGameData,
  jackpotData,
  liveGameData,
  newGameData,
  popularGameData,
  slotsData,
  topGameData,
} from "../../assets/data/gameData";
import CasinoBoxCard from "../Cards/CasinoBoxCard.vue";
import n1 from "../../assets/img/games/n1.jpg";
import popu from "../../assets/img/games/popu.jpg";
import t1 from "../../assets/img/games/t1.jpg";

defineProps<{
  show?: string;
}>();
</script>

<style scoped></style>
