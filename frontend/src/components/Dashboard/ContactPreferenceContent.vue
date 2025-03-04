<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Contact Preferences</h3>
    <div class="contact__preference__wrap bgbox">
      <div class="preference__items">
        <div class="preference__left">
          <h5>Contact Preferences</h5>
          <h6>Rivalry Bonus Club</h6>
          <p>
            I want to get promos to earn free money and hear about cool new
            features
          </p>
        </div>
        <div class="preference__right">
          <div class="perfer__check">
            <input class="form-check-input" type="checkbox" id="fre1s" />
            <label class="form-check-label" for="fre1s"> SMS </label>
          </div>
          <div class="perfer__check">
            <input class="form-check-input" type="checkbox" id="fre2e" />
            <label class="form-check-label" for="fre2e"> Email </label>
          </div>
        </div>
      </div>
      <div class="preference__items">
        <div class="preference__left">
          <h6>Victory!</h6>
          <p>Tell me when my picks win so I can count my winnings and gloat.</p>
        </div>
        <div class="preference__right">
          <div class="perfer__check">
            <input class="form-check-input" type="checkbox" id="fre3e" />
            <label class="form-check-label" for="fre3e"> Email </label>
          </div>
        </div>
      </div>
      <div class="preference__items">
        <div class="preference__left">
          <h6>Regional Announcements</h6>
          <p>
            Notify me when SportOdds betting and other games become available in
            my region.
          </p>
        </div>
        <div class="preference__right">
          <div class="perfer__check">
            <input class="form-check-input" type="checkbox" id="fre4e" />
            <label class="form-check-label" for="fre4e"> Email </label>
          </div>
        </div>
      </div>
      <div class="save__btn mt-4 d-flex justify-content-end">
        <RouterLink to="#" class="cmn--btn">
          <span>Save</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
