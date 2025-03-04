<template>
  <div
    class="tab-pane text-white fade"
    id="mainTab2"
    role="tabpanel"
    tabIndex="0"
  >
    <div class="main__body__wrap left__right__space pb-60">
      <div class="live__heightlight mb__30 mt__30">
        <div class="height__table">
          <div class="main__table">
            <LiveFootballTab :thead="false" />
          </div>
        </div>
      </div>

      <div class="live__heightlight">
        <div class="height__table">
          <div class="main__table main__table__tennis">
            <LiveTennisTab :thead="false" />
          </div>
        </div>
      </div>

      <div class="live__heightlight mt__30">
        <div class="height__table">
          <div class="main__table main__table__tennis main__table__basketball">
            <LiveBasketballTab :thead="false" />
          </div>
        </div>
      </div>

      <div class="live__heightlight mt__30">
        <div class="height__table">
          <div class="main__table main__table__tennis">
            <LiveVollyballTab :thead="false" />
          </div>
        </div>
      </div>

      <div class="live__heightlight mt__30">
        <div class="height__table">
          <div class="main__table main__table__tennis main__table__cricket">
            <LiveCricketTab :thead="false" />
          </div>
        </div>
      </div>

      <div class="live__heightlight mt__30">
        <div class="height__table">
          <div class="main__table main__table__tennis main__table__ttennis">
            <LiveTableTennisTab :thead="false" />
          </div>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import FooterHome from "../Footer/FooterHome.vue";
import LiveBasketballTab from "./LiveBasketballTab.vue";
import LiveCricketTab from "./LiveCricketTab.vue";
import LiveFootballTab from "./LiveFootballTab.vue";
import LiveTableTennisTab from "./LiveTableTennisTab.vue";
import LiveTennisTab from "./LiveTennisTab.vue";
import LiveVollyballTab from "./LiveVollyballTab.vue";
</script>

<style scoped></style>
