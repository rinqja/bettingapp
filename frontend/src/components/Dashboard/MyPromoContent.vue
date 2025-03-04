<template>
  <div>
    <div class="dashboard__body__wrap">
      <h3 class="account__head mb__30">My Promos</h3>
      <div class="promocode__wrap">
        <h3>Got a Promo Code?</h3>
        <form action="#0">
          <input type="text" />
          <RouterLink to="#" class="cmn--btn">
            <span>Check</span>
          </RouterLink>
        </form>
      </div>
    </div>
    <div class="promor__tab">
      <ul class="nav nav-tabs" id="myTabpro" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#protab1"
            type="button"
            role="tab"
            aria-controls="protab1"
            aria-selected="true"
          >
            Offers 3
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#protab2"
            type="button"
            role="tab"
            aria-controls="protab2"
            aria-selected="false"
          >
            In Progress 0
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#protab3"
            type="button"
            role="tab"
            aria-controls="protab3"
            aria-selected="false"
          >
            Used
          </button>
        </li>
      </ul>
    </div>
    <div class="promo__tab__body">
      <div class="tab-content" id="myTabContentpro">
        <div
          class="tab-pane fade show active"
          id="protab1"
          role="tabpanel"
          aria-labelledby="protab1"
          tabIndex="0"
        >
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo1" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $100 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo2" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $300 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items">
            <div class="thumb">
              <img :src="promo3" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $600 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="protab2"
          role="tabpanel"
          aria-labelledby="protab2"
          tabIndex="0"
        >
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo2" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $300 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo1" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $100 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items">
            <div class="thumb">
              <img :src="promo3" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $600 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="protab3"
          role="tabpanel"
          aria-labelledby="protab3"
          tabIndex="0"
        >
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo3" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $600 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items mb__30">
            <div class="thumb">
              <img :src="promo1" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $100 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
              <RouterLink to="#" class="cmn--btn">
                <span>WELCOME100</span>
              </RouterLink>
            </div>
          </div>
          <div class="promomy__items">
            <div class="thumb">
              <img :src="promo2" alt="img" />
            </div>
            <div class="content">
              <h4>Welcome Bonus</h4>
              <p>
                Get 100% up to $300 as a bonus on your first deposit!Get 100% up
                to $100 as a bonus on your first deposit!
              </p>
              <span class="smalltext">Use code at deposit</span>
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
import { RouterLink } from 'vue-router';

import promo1 from '../../assets/img/profile/promo1.jpg';
import promo2 from '../../assets/img/profile/promo2.jpg';
import promo3 from '../../assets/img/profile/promo3.jpg';

</script>

<style scoped></style>
