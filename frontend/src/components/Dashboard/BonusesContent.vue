<template>
    <div>
      <div class="dashboard__body__wrap">
        <h3 class="account__head mb__30">Bonuses</h3>
      </div>
      <div class="bonuses__wrap">
        <h4 class="bonus">Sports bets</h4>
        <div class="row mb-4 g-4">
          <div class="col-xxl-6 col-xl-6 col-lg-12">
            <div class="promomy__items bonus__last__items">
              <div class="thumb">
                <img :src="bonus1" alt="img" />
              </div>
              <div class="content">
                <h4>2022 Winter bonus 3</h4>
                <span class="smalltext">Use code at deposit</span>
                <RouterLink to="#" class="cmn--btn">
                  <span>WELCOME100</span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-12">
            <div class="promomy__items bonus__last__items">
              <div class="thumb">
                <img :src="bonus2" alt="img" />
              </div>
              <div class="content">
                <h4>Betting Welcome Bonus</h4>
                <RouterLink to="#" class="cmn--btn">
                  <span>WELCOME100</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <h4 class="bonus">Sports bets</h4>
        <div class="row g-4">
          <div class="col-xxl-6 col-xl-6 col-lg-12">
            <div class="promomy__items bonus__last__items">
              <div class="thumb">
                <img :src="bonus3" alt="img" />
              </div>
              <div class="content">
                <h4>Christmas Bonus</h4>
                <span class="smalltext">Use code at deposit</span>
                <RouterLink to="#" class="cmn--btn">
                  <span>WELCOME100</span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-xxl-6 col-xl-6 col-lg-12">
            <div class="promomy__items bonus__last__items">
              <div class="thumb">
                <img :src="bonus4" alt="img" />
              </div>
              <div class="content">
                <h4>Welcome Casino Bonus</h4>
                <RouterLink to="#" class="cmn--btn">
                  <span>WELCOME100</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import bonus1 from "../../assets/img/profile/bonus1.jpg";
import bonus2 from "../../assets/img/profile/bonus2.jpg";
import bonus3 from "../../assets/img/profile/bonus3.jpg";
import bonus4 from "../../assets/img/profile/bonus4.jpg";
</script>

<style scoped>

</style>