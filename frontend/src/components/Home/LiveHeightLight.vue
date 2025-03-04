<template>
  <div>
    <div class="heightlight__tab">
      <div class="nav b__bottom" id="nav-tabheight" role="tablist">
        <button
          class="nav-link active"
          id="lightlighttab"
          data-bs-toggle="tab"
          data-bs-target="#height1"
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
          id="lightlighttab2tennis"
          data-bs-toggle="tab"
          data-bs-target="#height2tennis"
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
          id="lightlighttab3basket"
          data-bs-toggle="tab"
          data-bs-target="#basketbtab"
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
          id="lightlighttabvolly"
          data-bs-toggle="tab"
          data-bs-target="#vollyballs"
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
          id="lightlighttab5cricket"
          data-bs-toggle="tab"
          data-bs-target="#crickettab"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-cricket"></i>
          </span>
          <span>Cricket</span>
        </button>
        <button
          class="nav-link"
          id="lightlighttable"
          data-bs-toggle="tab"
          data-bs-target="#tabletennis"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-ttennis"></i>
          </span>
          <span>Table Tennis</span>
        </button>
      </div>
    </div>

    <div class="height__table">
      <div class="tab-content" id="nav-tabContentheight">
        <!-- {/* Football */} -->
        <div
          class="tab-pane fade text-white show active"
          id="height1"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div class="main__table">
            <LiveFootballTab />
          </div>
        </div>

        <!-- {/* Tennis */} -->
        <div
          class="tab-pane fade text-white"
          id="height2tennis"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__tennis">
            <LiveTennisTab />
          </div>
        </div>
        <!-- {/* Tennis */} -->

        <!-- {/* Basketball */} -->
        <div
          class="tab-pane fade text-white"
          id="basketbtab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__tennis main__table__basketball">
            <!-- {/* Live Basketball Tab */} -->
            <LiveBasketballTab />
          </div>
        </div>
        <!-- {/* Basketball */} -->

        <!-- {/* Vollyball */} -->
        <div
          class="tab-pane fade text-white"
          id="vollyballs"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table volloy__max main__table__tennis">
            <!-- {/* Live Vollyball Tab */} -->
            <LiveVollyballTab />
          </div>
        </div>
        <!-- {/* Vollyball */} -->

        <!-- {/* Cricket */} -->
        <div
          class="tab-pane fade text-white"
          id="crickettab"
          role="tabpanel"
          tabIndex="0"
        >
          <div class="main__table main__table__tennis main__table__cricket">
            <!-- {/* Live Cricket Tab */} -->
            <LiveCricketTab />
          </div>
        </div>
        <!-- {/* Cricket */} -->

        <!-- {/* Table Tennis */} -->
        <div
          class="tab-pane fade text-white"
          id="tabletennis"
          role="tabpanel"
          tabIndex="0"
        >
          <div
            class="main__table volloy__max main__table__tennis main__table__ttennis"
          >
            <!-- {/* Live Table Tennis Tab */} -->
            <LiveTableTennisTab />
          </div>
        </div>
        <!-- {/* Table Tennis */} -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LiveBasketballTab from "./LiveBasketballTab.vue";
import LiveCricketTab from "./LiveCricketTab.vue";
import LiveFootballTab from "./LiveFootballTab.vue";
import LiveTableTennisTab from "./LiveTableTennisTab.vue";
import LiveTennisTab from "./LiveTennisTab.vue";
import LiveVollyballTab from "./LiveVollyballTab.vue";
</script>

<style scoped></style>
