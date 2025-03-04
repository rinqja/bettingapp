<script setup lang="ts">
import { ref } from "vue";
import bitcoin from "../../assets/img/profile/bitcoin.png";
import bvisa from "../../assets/img/profile/bvisa.png";
import coins from "../../assets/img/profile/coins.png";
import inovarav from "../../assets/img/profile/inovarav.png";
import much from "../../assets/img/profile/much.png";
import neteller from "../../assets/img/profile/neteller.png";
import paypal from "../../assets/img/profile/paypal.png";
import phonerpe from "../../assets/img/profile/phonerpe.png";
import skrill from "../../assets/img/profile/skrill.png";
import visa from "../../assets/img/profile/visa.png";
import visap from "../../assets/img/profile/visap.png";
import visas from "../../assets/img/profile/visas.png";
import webpay from "../../assets/img/profile/webpay.png";
import yandex from "../../assets/img/profile/yandex.png";
import { RouterLink } from "vue-router";

const imagesList = [
  visa,
  webpay,
  skrill,
  inovarav,
  bitcoin,
  paypal,
  much,
  visas,
  yandex,
  coins,
  phonerpe,
  neteller,
];

const depositeAmount = ref<number>(20);
const handleAmount = (amount: number) => {
  depositeAmount.value = amount;
};
</script>

<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Deposit</h3>
    <div class="payment__cart__check">
      <div class="row g-4">
        <div
          v-for="(itm, i) in imagesList"
          :key="i"
          class="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
        >
          <div class="payment__cart__items">
            <input
              class="form-check-input"
              type="radio"
              :id="`deposit${i}`"
              name="deposite"
            />
            <label class="form-check-label" :for="`deposit${i}`">
              <img :src="itm" alt="visa" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="deposit__complate">
      <h3>Complete Your Deposit</h3>
      <div class="deposit__wallet">
        <div class="deopsit__wallet__items">
          <p>Deposit to Wallet</p>
          <div class="usd__chacnge">
            <span>USD</span>
            <div class="icons" id="profile-picture">
              <i class="fas fa-pen"></i>
            </div>
          </div>
        </div>
        <div class="deopsit__wallet__items">
          <p>Payment Provider</p>
          <div class="usd__chacnge">
            <span>
              <img :src="bvisa" alt="vissa" />
            </span>
            <div class="icons" id="profile-picture2">
              <i class="fas fa-pen"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="promo__code">
        <span class="promo">Promo Code</span>
        <RouterLink to="#">
          <span>Enter Code</span>
          <span>
            <i class="fas fa-plus"></i>
          </span>
        </RouterLink>
      </div>
      <RouterLink to="#" class="visa__card">
        <img :src="visap" alt="visa" />
      </RouterLink>
      <ul class="quick-value">
        <li v-for="(itm, i) in [20, 30, 200]" :key="i">
          <h5
            :class="depositeAmount === itm ? 'active' : ''"
            @click="handleAmount(itm)"
          >
            {{ itm }}
          </h5>
        </li>

        <li>
          <RouterLink to="#">Custom</RouterLink>
        </li>
      </ul>
      <form action="#">
        <div class="single-input mb__20">
          <input
            type="text"
            id="dAmount"
            placeholder="Enter Amount"
            :value="`$${depositeAmount}`"
            @change="() => {}"
          />
        </div>
        <div class="single-input">
          <input type="text" id="eemail" placeholder="Email" />
        </div>
        <div class="total__amount">
          <div class="items">
            <span>Amount Fee</span>
            <span>$20</span>
          </div>
          <div class="items">
            <span>Total</span>
            <span>$20</span>
          </div>
        </div>
        <div class="btn-area">
          <button class="cmn--btn">
            <span>Deposit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
