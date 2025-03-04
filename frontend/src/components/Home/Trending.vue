<template>
  <div>
    <div class="heightlight__tab">
      <div class="nav b__bottom" id="nav-tabheighttrending" role="tablist">
        <button
          class="nav-link active"
          id="lightlighttabtrend"
          data-bs-toggle="tab"
          data-bs-target="#height1trend"
          type="button"
          role="tab"
          aria-selected="true"
        >
          <span class="icons">
            <i class="icon-football"></i>
          </span>
          <span>Football</span>
        </button>
        <button
          class="nav-link"
          id="treading1"
          data-bs-toggle="tab"
          data-bs-target="#treand2"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-tennis"></i>
          </span>
          <span>Tennis</span>
        </button>
        <button
          class="nav-link"
          id="treading2"
          data-bs-toggle="tab"
          data-bs-target="#treand3"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-basketball"></i>
          </span>
          <span>Basketball</span>
        </button>
        <button
          class="nav-link"
          id="treading3"
          data-bs-toggle="tab"
          data-bs-target="#treand4"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-volly"></i>
          </span>
          <span>Volleyball</span>
        </button>
        <button
          class="nav-link"
          id="treading4"
          data-bs-toggle="tab"
          data-bs-target="#treand5"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-ttennis"></i>
          </span>
          <span>Table Tennis</span>
        </button>
        <button
          class="nav-link"
          id="treading5"
          data-bs-toggle="tab"
          data-bs-target="#treand6"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-afootball"></i>
          </span>
          <span>American Football</span>
        </button>
        <button
          class="nav-link"
          id="treading7"
          data-bs-toggle="tab"
          data-bs-target="#treand7"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-golf"></i>
          </span>
          <span>Golf</span>
        </button>
        <button
          class="nav-link"
          id="treading8"
          data-bs-toggle="tab"
          data-bs-target="#treand8"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-cycling"></i>
          </span>
          <span>Cycling</span>
        </button>
        <button
          class="nav-link"
          id="treading9"
          data-bs-toggle="tab"
          data-bs-target="#treand9"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-golf"></i>
          </span>
          <span>Beach Volleyball</span>
        </button>
      </div>
    </div>

    <div class="height__table">
      <div class="tab-content" id="nav-tabContentheighttrending">
        <!-- {/* football */} -->
        <div
          class="tab-pane fade text-white show active"
          id="height1trend"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div class="main__table larg__width treanding__table">
            <TrendingFootballTab />
          </div>
        </div>
        <!-- {/* Tennis */} -->
        <div
          class="tab-pane fade text-white"
          id="treand2"
          role="tabpanel"
          tabIndex="0"
        >
          <div
            class="main__table larg__width2 treanding__table main__tabletennis"
          >
            <TrendingTennisTab />
          </div>
        </div>
        <!-- {/* Basketball */} -->
        <div
          class="tab-pane fade text-white"
          id="treand3"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width4 treanding__table main__basketballtable"
          >
            <TrendingBasketballTab />
          </div>
        </div>
        <!-- {/* Vollyball */} -->
        <div
          class="tab-pane fade text-white"
          id="treand4"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width5 treanding__table main__basketballtable"
          >
            <TrendingVollyballTab />
          </div>
        </div>
        <!-- {/* Table Tennis */} -->
        <div
          class="tab-pane fade text-white"
          id="treand5"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width6 treanding__table main__basketballtable"
          >
            <TrendingTableTennisTab />
          </div>
        </div>
        <!-- {/* American Football */} -->
        <div
          class="tab-pane fade text-white"
          id="treand6"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table treanding__table main__basketballtable larg__width7"
          >
            <TrendingAmericanFootballTab />
          </div>
        </div>
        <!-- {/* Golf Playing */} -->
        <div
          class="tab-pane fade text-white"
          id="treand7"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width6 treanding__table main__basketballtable"
          >
            <TrendingGolfTab />
          </div>
        </div>
        <!-- {/* Cycling Playing */} -->
        <div
          class="tab-pane fade text-white"
          id="treand8"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width6 treanding__table main__basketballtable"
          >
            <TrendingCyclingTab />
          </div>
        </div>
        <!-- {/* Beach Playing */} -->
        <div
          class="tab-pane fade text-white"
          id="treand9"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div
            class="main__table larg__width6 treanding__table main__basketballtable"
          >
            <TrendingBeachVolleyballTab />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrendingAmericanFootballTab from "./TrendingAmericanFootballTab.vue";
import TrendingBasketballTab from "./TrendingBasketballTab.vue";
import TrendingBeachVolleyballTab from "./TrendingBeachVolleyballTab.vue";
import TrendingCyclingTab from "./TrendingCyclingTab.vue";
import TrendingFootballTab from "./TrendingFootballTab.vue";
import TrendingGolfTab from "./TrendingGolfTab.vue";
import TrendingTableTennisTab from "./TrendingTableTennisTab.vue";
import TrendingTennisTab from "./TrendingTennisTab.vue";
import TrendingVollyballTab from "./TrendingVollyballTab.vue";
</script>

<style scoped></style>
