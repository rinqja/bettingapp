<script setup lang="ts">
import { RouterLink } from "vue-router";
import Select from "../Select/Select.vue";

const idCard1 = [
  { id: 1, name: "Choose document type" },
  { id: 2, name: "Categories One" },
  { id: 3, name: "Categories One" },
  { id: 4, name: "Categories One" },
];
const idCard2 = [
  { id: 1, name: "Choose document type" },
  { id: 2, name: "Categories One" },
  { id: 3, name: "Categories One" },
  { id: 4, name: "Categories One" },
];
const idCard3 = [
  { id: 1, name: "Choose document type" },
  { id: 2, name: "Categories One" },
  { id: 3, name: "Categories One" },
  { id: 4, name: "Categories One" },
];
const idCard4 = [
  { id: 1, name: "Choose document type" },
  { id: 2, name: "Categories One" },
  { id: 3, name: "Categories One" },
  { id: 4, name: "Categories One" },
];
</script>

<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Verification</h3>
    <div class="verification__wrap">
      <div class="row g-4">
        <div class="col-xxl-6 col-xl-6 col-lg-12">
          <div class="verification__box">
            <h4 class="veri__title">ID card</h4>
            <div class="attach__wrap">
              <Select :data="idCard1" />
              <RouterLink to="#" class="cmn--btn">
                <span>Attach</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-12">
          <div class="verification__box">
            <h4 class="veri__title">ID card</h4>
            <div class="attach__wrap">
              <Select :data="idCard2" />
              <RouterLink to="#" class="cmn--btn">
                <span>Attach</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-12">
          <div class="verification__box">
            <h4 class="veri__title">ID card</h4>
            <div class="attach__wrap">
              <Select :data="idCard3" />
              <RouterLink to="#" class="cmn--btn">
                <span>Attach</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-12">
          <div class="verification__box">
            <h4 class="veri__title">ID card</h4>
            <div class="attach__wrap">
              <Select :data="idCard4" />
              <RouterLink to="#" class="cmn--btn">
                <span>Attach</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom__text pt-120">
      <h4>Additional information</h4>
      <p>
        The verification procedure usually takes up to 48 hours from the moment
        of successful download and receiving of client’s data. However, we
        always try to process information as soon as possible. As soon as an
        account is verified, you will receive an email notification. You can
        also contact customer support (online chat or by phone) to clarify this
        information.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
