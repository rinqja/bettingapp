<template>
 <div>
      <div class="section__head b__bottom">
        <div class="left__head">
          <span class="icons">
            <i class="icon-cricket"></i>
          </span>
          <span>Cricket</span>
        </div>
        <div class="right__catagoris">
          <div class="right__cate__items">
          
            <Select :data="categoris" ></Select>
          </div>
          <div class="right__cate__items">
           
            <Select :data="categoris2" ></Select>
          </div>
          <div class="right__cate__items">
          
            <Select :data="categoris3" ></Select>
          </div>
        </div>
      </div>
      <div class="table__wrap">
       
          <div v-if="thead" class="table__items table__pointnone__items">
            <div class="t__items">
              <div class="t__items__left"></div>
              <div class="serial"></div>
            </div>
            <div class="tennis__right">
              <div class="mart__point__two">
                <div class="mart__point__left">
                  <RouterLink to="#" class="point__box bg__none">
                    1
                  </RouterLink>
                  <RouterLink to="#" class="point__box bg__none">
                    2
                  </RouterLink>
                </div>
                <div class="mart__point__right">
                  <RouterLink to="#" class="point__box bg__none opo">
                    <i class="icon-star star"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

        <div class="table__items b__bottom">
          <div class="t__items">
            <div class="t__items__left">
              <h6>Tokyo Great Bears</h6>
              <span class="text">JT Thunders</span>
              <p>
                <RouterLink to="#">Live</RouterLink>
                <span>3rd Set</span>
              </p>
            </div>
            <div class="serial">264/7</div>
          </div>
          <div class="tennis__right">
            <div class="mart__point__two">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  3.05
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  6.50
                </RouterLink>
              </div>
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-star star"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="table__footer">
          <RouterLink to="#" class="lobby text__opa">
            Open <span class="text__btn"> Volleyball Live</span> Events
          </RouterLink>
          <RouterLink to="#" class="footerpoing">
            <span>8</span>
            <span>
              <i class="fas fa-angle-right"></i>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Select from '../Select/Select.vue';

const categoris = [
  { id: 1, name: "Result 1X2" },
  { id: 2, name: "Result 1X3" },
  { id: 3, name: "Result 1X4" },
  { id: 4, name: "Result 1X5" },
];
const categoris2 = [
  { id: 1, name: "Over/Under" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];
const categoris3 = [
  { id: 1, name: "Both teams to score?" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];

defineProps({
  thead: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped></style>
