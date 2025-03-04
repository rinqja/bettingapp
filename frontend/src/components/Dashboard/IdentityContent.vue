<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Identity Details</h3>
    <div class="identity__details bgbox">
      <h5 class="identity__title">About You</h5>
      <div class="identity__left mb-5">
        <form action="#">
          <div class="row g-2 mb-3">
            <div class="col-lg-6">
              <div class="form__box">
                <label for="name">First Name (Given Name)</label>
                <input type="text" id="name" placeholder="First Name" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="name2"> Last Name (Surname / Family Name) </label>
                <input type="text" id="name2" placeholder="Last Name" />
              </div>
            </div>
          </div>

          <div class="row g-2">
            <div class="col-lg-6">
              <label for="dob">Date Of Birth</label>
              <div class="row g-2">
                <div class="col-lg-4">
                  <div class="form__box">
                    <div class="datePicker">
                      <DatePicker />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form__box">
                    <div class="datePicker">
                      <DatePicker />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form__box">
                    <div class="datePicker">
                      <DatePicker />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <label for="dob">Phone Number</label>
              <div class="row g-2">
                <div class="col-lg-4">
                  <div class="form__box">
                    <input type="text" placeholder="+962" />
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="form__box">
                    <div class="datePicker">
                      <DatePicker />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <h5 class="identity__title">Address</h5>
      <div class="identity__left mb-3">
        <form action="#">
          <div class="row g-3">
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add1">Address</label>
                <input type="text" id="add1" placeholder="XXXXX" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add2">Apt, Suite, etc</label>
                <input type="text" id="add2" placeholder="XXXXX" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add3">City / Region</label>
                <input type="text" id="add3" placeholder="XXXXX" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add4">Country</label>
                <input type="text" id="add4" placeholder="United Kingdom" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add5">State / Province</label>
                <input type="text" id="add5" placeholder="XXXXX" />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form__box">
                <label for="add6">Postal Code</label>
                <input type="text" id="add6" placeholder="XXXX" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="authorize__wrap">
        <input class="form-check-input" type="checkbox" value="" id="aut1" />
        <label class="form-check-label" for="aut1">
          I authorize SportOdds to collect and transmit my personal information
          for identity verification or
          <span>similar uses as defined</span> in order to confirm my ability to
          use the website.
        </label>
      </div>
      <div class="save__btn mt-3 d-flex">
        <RouterLink to="#" class="cmn--btn">
          <span>Save</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import DatePicker from "../Common/DatePicker.vue";
</script>

<style scoped></style>
