<template>
  <section class="main__body__area">
    <div class="container">
      <div class="row g-0">
        <div class="casino__tab__area">
          <div class="tab-content" id="nav-tabCcasino">
            <AllGamesTab />

            <TopGamesTab />

            <NewGamesTab />

            <PopularGamesTab />

            <SlotsGamesTab />

            <TableGamesTab />

            <JackpotsTab />

            
            <!-- {/* Live games */} -->
            <div
              class="tab-pane fade text-white show active mt__30"
              id="casinot7"
              role="tabpanel"
              aria-labelledby="casinot7"
              tabIndex="0"
            >
              <!-- {/* Top Games */} -->
              <div class="common__head mb__30">
                <span class="icons">
                  <i class="icon-live"></i>
                </span>
                <span>Top Games</span>
              </div>
              <div class="row g-4 pb-60">
                <div
                  v-for="(itm, i) in topGameData"
                  :key="i"
                  class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <CasinoBoxCard :img="itm" :live="true" />
                </div>
              </div>

              <!-- {/* New Games */} -->
              <div class="common__head mb__30">
                <span class="icons">
                  <i class="icon-game"></i>
                </span>
                <span>New Games</span>
              </div>
              <div class="row g-4 pb-60">
                <div
                  v-for="(itm, i) in newGameData"
                  :key="i"
                  class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <CasinoBoxCard :img="itm" :live="true" />
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
                <div
                  v-for="(itm, i) in popularGameData"
                  :key="i"
                  class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <CasinoBoxCard :img="itm" :live="true" />
                </div>
              </div>

              <!-- {/* Slots Games */} -->
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
                  <CasinoBoxCard :img="itm" :live="true" />
                </div>
              </div>

              <!-- {/* Jackpots Games */} -->
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
                  <CasinoBoxCard :img="itm" :live="true" />
                </div>
              </div>

              <!-- {/* Live Games */} -->
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
                  <CasinoBoxCard :img="itm" :live="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterMobile />
  </section>
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
import AllGamesTab from "../Casino/AllGamesTab.vue";
import JackpotsTab from "../Casino/JackpotsTab.vue";
import NewGamesTab from "../Casino/NewGamesTab.vue";
import PopularGamesTab from "../Casino/PopularGamesTab.vue";
import SlotsGamesTab from "../Casino/SlotsGamesTab.vue";
import TableGamesTab from "../Casino/TableGamesTab.vue";
import TopGamesTab from "../Casino/TopGamesTab.vue";
import FooterMobile from "../Footer/FooterMobile.vue";
</script>

<style scoped></style>
