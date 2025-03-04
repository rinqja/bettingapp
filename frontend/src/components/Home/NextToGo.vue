<template>
  <div>
    <div class="heightlight__tab nexttogo__tab">
      <div class="nav pt-20" id="nav-tabheightnextgo" role="tablist">
        <button
          class="nav-link active"
          id="lightnext"
          data-bs-toggle="tab"
          data-bs-target="#height1next"
          type="button"
          role="tab"
          aria-selected="true"
        >
          <span class="icons">
            <i class="icon-football"></i>
          </span>
          <span>All</span>
        </button>
        <button
          class="nav-link"
          id="lightall"
          data-bs-toggle="tab"
          data-bs-target="#nextfootball"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-football"></i>
          </span>
          <span>Football</span>
        </button>
        <button
          class="nav-link"
          id="lightnext2"
          data-bs-toggle="tab"
          data-bs-target="#nextgotennistab"
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
          id="lightlighttab3next"
          data-bs-toggle="tab"
          data-bs-target="#nextbaskettab"
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
          id="lightlighttab4next"
          data-bs-toggle="tab"
          data-bs-target="#nexticehockytab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-icehockey"></i>
          </span>
          <span>Ice Hockey</span>
        </button>
        <button
          class="nav-link"
          id="lightlighttab5next"
          data-bs-toggle="tab"
          data-bs-target="#afootballtab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-afootball"></i>
          </span>
          <span>American Football</span>
        </button>
      </div>
    </div>

    <div class="height__table">
      <div class="tab-content" id="nav-tabContentheightnext">
        <div
          class="tab-pane fade text-white show active"
          id="height1next"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div class="main__table">
            <NextAllTab />
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="nextfootball"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__nextfootball">
            <NextFootballTab />
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="nextgotennistab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__nextfootball">
            <NextTennisTab />
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="nextbaskettab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__nextfootball">
            <NextBasketBallTab />
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="nexticehockytab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__nextfootball">
            <NextIceHockeyTab />
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="afootballtab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__nextfootball">
            <NextAmericanFootballTab />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NextAllTab from "./NextAllTab.vue";
import NextAmericanFootballTab from "./NextAmericanFootballTab.vue";
import NextBasketBallTab from "./NextBasketBallTab.vue";
import NextFootballTab from "./NextFootballTab.vue";
import NextIceHockeyTab from "./NextIceHockeyTab.vue";
import NextTennisTab from "./NextTennisTab.vue";
</script>

<style scoped></style>
