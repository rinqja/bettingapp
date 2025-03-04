<template>
  <VueDatePicker
    v-model="date"
    placeholder="mm/dd/yyyy"
    position="left"
    :enable-time-picker="false"
  >
    <template #input-icon>
      <i class="icon-calender"></i>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref();
</script>

<style scoped>
.dp__menu_inner {
  margin-left: 20px !important;
}
</style>
