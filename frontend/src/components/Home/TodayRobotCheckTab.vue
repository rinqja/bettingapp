<template>
  <div>
    <div class="robot__wrap">
      <form>
        <div class="g-recaptcha"></div>
        <div class="left__capcha">
          <input type="number" placeholder="Enter your bet slip number" />
          <button class="cmn--btn" type="submit">
            <span>Check</span>
          </button>
        </div>
      </form>
    </div>
    <div class="robot__content">
      <p>
        Bet slip number is shown in the bet history section of the user account.
      </p>
      <div class="robot__inner">
        <div class="robot__content__wrap">
          <div class="robot__content__items">
            <span class="ttext">№ 953340653</span>
            <h6>from 01.01.2016 | 12:00</h6>
          </div>
          <div class="robot__content__items">
            <span class="ttext">ENGLAND. PREMIER LEAGUE</span>
            <h6>Burnley F.C. - Hull City A.F.C.</h6>
          </div>
          <div class="robot__content__items">
            <span class="ttext">BET TYPE</span>
            <h6>Single bet</h6>
          </div>
          <div class="robot__content__items">
            <span class="ttext">BET SLIP STATUS</span>
            <h6>Win</h6>
          </div>
          <div class="robot__content__items">
            <RouterLink to="#" class="point"> 8.50 </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
