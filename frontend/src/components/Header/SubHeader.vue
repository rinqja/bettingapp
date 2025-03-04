<template>
  <section class="main__tab__slide">
    <ul class="nav nav-tabs" id="myTabmain" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          :class="active === 'allGames' ? 'active' : ''"
          class="nav-link"
          id="main-tab8cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot8"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-game"></i>
          </span>
          <span>All Games</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tabcasino"
          data-bs-toggle="tab"
          data-bs-target="#casinot1"
          type="button"
          role="tab"
          aria-selected="true"
        >
          <span class="icons">
            <i class="icon-top"></i>
          </span>
          <span>Top</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tab2cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot2"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-new"></i>
          </span>
          <span>New</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tab3cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot3"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-popular"></i>
          </span>
          <span>Popular</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tab4cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot4"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-slots"></i>
          </span>
          <span>Slots</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tab5cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot5"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-ttennis"></i>
          </span>
          <span>Table Games</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="main-tab6cas"
          data-bs-toggle="tab"
          data-bs-target="#casinot6"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-jackpot"></i>
          </span>
          <span>Jackpots</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="active === 'live-games' ? 'active' : ''"
          class="nav-link"
          id="main-tabcass"
          data-bs-toggle="tab"
          data-bs-target="#casinot7"
          type="button"
          role="tab"
          aria-selected="false"
        >
          <span class="icons">
            <i class="icon-live"></i>
          </span>
          <span>Live Games</span>
        </button>
      </li>
      <li class="nav-item">
        <Search />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import Search from "../Common/Search.vue";

defineProps<{
  active: string;
}>();
</script>

<style scoped></style>
