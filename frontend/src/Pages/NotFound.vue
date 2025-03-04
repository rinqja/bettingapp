<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 text-center"
  >
    <div>
      <h2 class="text-white">Page Not Found</h2>
      <p class="text-white fs-seven mt-2 mt-md-3">
        The page you are looking for could not be found.
      </p>

      <RouterLink to="/" class="create__btn">
        <button class="cmn--btn text-white mt-3">
          <span>Go Home</span>
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
