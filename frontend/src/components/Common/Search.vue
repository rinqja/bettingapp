<template>
  <div class="search-button">
    <button class="nav-link" @click="handleSearch">
      <span class="icons">
        <i class="icon-search"></i>
      </span>
      <span>Search</span>
    </button>
    <div class="search-popup" :class="searchActive && 'd-block'">
      <div class="search-bg" @click="handleSearch"></div>
      <div class="searchActive" :class="searchActive && 'end-0'">
        <form>
          <div class="form">
            <input
              type="text"
              id="searchs"
              placeholder="Search Your Favourites Game"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchActive = ref(false);
const handleSearch = () => {
  searchActive.value = !searchActive.value;
};
</script>

<style scoped></style>
