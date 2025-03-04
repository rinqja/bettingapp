<template>
  <div
    class="tab-pane text-white fade"
    id="mainTab3"
    role="tabpanel"
    tabIndex="0"
  >
    <div class="main__body__wrap left__right__space pb-60">
      <div class="today__body mt__30">
        <div class="tody__tab">
          <ul class="nav nav-tabs" id="todaytab" role="tablist">
            <li>
              <i class="fas fa-chevron-left"></i>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#todaytab1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                <span class="icons">
                  <i class="icon-calender"></i>
                </span>
                <span>Calendar</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#todaytab2"
                type="button"
                role="tab"
                aria-controls="todaytab2"
                aria-selected="false"
              >
                <span class="icons">
                  <i class="icon-clock"></i>
                </span>
                <span>Today</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#todaytab3"
                type="button"
                role="tab"
                aria-controls="todaytab3"
                aria-selected="false"
              >
                <span class="icons">
                  <i class="icon-clock"></i>
                </span>
                <span>Robot Check</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#todaytab4"
                type="button"
                role="tab"
                aria-controls="todaytab4"
                aria-selected="false"
              >
                <span class="icons">
                  <i class="icon-clock"></i>
                </span>
                <span>Live Check</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="tab-content" id="myTabContenttoday">
          <div
            class="tab-pane fade show active"
            id="todaytab1"
            role="tabpanel"
            aria-labelledby="todaytab1"
            tabIndex="0"
          >
            <TodayCalenderTab />
          </div>

          <div
            class="tab-pane fade"
            id="todaytab2"
            role="tabpanel"
            aria-labelledby="todaytab2"
            tabIndex="0"
          >
            <TodayCalenderTab />
          </div>

          <div
            class="tab-pane fade"
            id="todaytab3"
            role="tabpanel"
            aria-labelledby="todaytab3"
            tabIndex="0"
          >
           
            <TodayRobotCheckTab />
          </div>

          <div
            class="tab-pane fade"
            id="todaytab4"
            role="tabpanel"
            aria-labelledby="todaytab4"
            tabIndex="0"
          >
           
            <TodayLiveCheckTab />
          </div>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import FooterHome from "../Footer/FooterHome.vue";
import TodayCalenderTab from "./TodayCalenderTab.vue";
import TodayLiveCheckTab from "./TodayLiveCheckTab.vue";
import TodayRobotCheckTab from "./TodayRobotCheckTab.vue";
</script>

<style scoped></style>
