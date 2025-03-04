<script setup lang="ts">
import { useRoute } from "vue-router";

const menus = [
  ["Account Settings", "/dashboard"],
  ["Contact Preferences", "/dashboard/contact-preference"],
  ["Identity Details", "/dashboard/identity"],
  ["Verify", "/dashboard/verification"],
  ["Casino bets", "/dashboard/casinobet"],
  ["My Promos", "/dashboard/mypromo"],
  ["Deposit", "/dashboard/deposit"],
  ["Withdraw", "/dashboard/withdraw"],
  ["Transction History", "/dashboard/transaction"],
  ["Notifications", "/dashboard/notification"],
  ["Bet History", "/dashboard/bethistory"],
  ["Bonuses", "/dashboard/bonuses"],
];

const pathName = useRoute().path;
</script>

<template>
  <div class="dashboard__side__bar">
    <ul class="account__menu">
      <li v-for="([itm, url], i) in menus" :key="i">
        <RouterLink :to="url" :class="{ active: pathName === url }">
          <span class="icons">
            <i class="icon-user"></i>
          </span>
          <span>{{ itm }}</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink to="#">
          <span class="icons">
            <i class="icon-logout"></i>
          </span>
          <span>Logout</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
