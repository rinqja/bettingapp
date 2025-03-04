<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-ttennis"></i>
        </span>
        <span>Table Tennis</span>
      </div>
      <div class="right__catagoris">
        <div class="right__cate__items">
          <Select :data="categoris"></Select>
        </div>
        <div class="right__cate__items">
          <Select :data="categoris2"></Select>
        </div>
        <div class="right__cate__items">
          <Select :data="categoris3"></Select>
        </div>
      </div>
    </div>
    <div class="table__wrap">
      <div v-if="thead" class="table__items table__pointnone__items">
        <div class="t__items">
          <div class="t__items__left"></div>
        </div>
        <div class="tennis__cart__wrap"></div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right opo">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart opo">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box bg__none"> 1 </RouterLink>
            <RouterLink to="#0box" class="point__box bg__none"> 2 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none"> 1 </RouterLink>
              <RouterLink to="#" class="point__box bg__none"> 2 </RouterLink>
            </div>
          </div>
          <div class="cart__point">
            <span>Points</span>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none"> Over </RouterLink>
              <RouterLink to="#" class="point__box bg__none">
                Under
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
            <h6>Grzegorz Felkel POL</h6>
            <span class="text">Karol Wisniewski POL</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>4rd Set</span>
            </p>
          </div>
        </div>
        <div class="tennis__cart__wrap">
          <div class="cart__point">
            <span>5</span>
            <span>4</span>
          </div>
          <div class="tennis__cart__right">
            <span>2</span>
            <span>1</span>
            <span>Sets</span>
          </div>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart opo">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 8.50 </RouterLink>
            <RouterLink to="#0box" class="point__box"> 1.03 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>1.75</span>
              </RouterLink>
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>1.87</span>
              </RouterLink>
            </div>
          </div>
          <div class="cart__point">
            <span>16,2</span>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box"> 2.33 </RouterLink>
              <RouterLink to="#" class="point__box"> 4.66 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Denis Hofman CZE</h6>
            <span class="text">Rostyslav Kliuchuk CZE</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>3rd Set</span>
            </p>
          </div>
        </div>
        <div class="tennis__cart__wrap">
          <div class="cart__point">
            <span>11</span>
            <span>17</span>
          </div>
          <div class="tennis__cart__right">
            <span>2</span>
            <span>1</span>
            <span>Sets</span>
          </div>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink
              to="#0box"
              class="point__box point__box__volly bg__none"
            >
              <i class="icon-lock"></i>
            </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink
                to="#0box"
                class="point__box point__box__volly bg__none"
              >
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="cart__point">
            <span>16,2</span>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box"> 3.66 </RouterLink>
              <RouterLink to="#" class="point__box"> 4.33 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Gold City More Asia</h6>
            <span class="text">Kasetsart VC</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>3rd Set</span>
            </p>
          </div>
        </div>
        <div class="tennis__cart__wrap">
          <div class="cart__point">
            <span>11</span>
            <span>12</span>
          </div>
          <div class="tennis__cart__right">
            <span>2</span>
            <span>1</span>
            <span>Sets</span>
          </div>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart opo">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 1.40 </RouterLink>
            <RouterLink to="#0box" class="point__box"> 3.22 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>1.65</span>
              </RouterLink>
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>1.83</span>
              </RouterLink>
            </div>
          </div>
          <div class="cart__point">
            <span>16,2</span>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box"> 3.90 </RouterLink>
              <RouterLink to="#" class="point__box"> 3.50 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Wojciech Gluszek POL</h6>
            <span class="text">Arkadiusz Mugowski POL</span>
            <p>
              <RouterLink to="#" class="text__opa"> Starting </RouterLink>
              <span class="text__btn">now</span>
            </p>
          </div>
        </div>
        <div class="tennis__cart__wrap">
          <div class="cart__point">
            <span>2</span>
            <span>2</span>
          </div>
          <div class="tennis__cart__right">
            <span>2</span>
            <span>2</span>
            <span>Sets</span>
          </div>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart opo">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 2.80 </RouterLink>
            <RouterLink to="#0box" class="point__box"> 1.36 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>2.05</span>
              </RouterLink>
              <RouterLink to="#" class="point__box">
                <span class="set">Set 1</span>
                <span>2.70</span>
              </RouterLink>
            </div>
          </div>
          <div class="cart__point">
            <span>16,2</span>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box"> 2.05 </RouterLink>
              <RouterLink to="#" class="point__box"> 1.50 </RouterLink>
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
          Open <span class="text__btn"> Table Tennis</span> Events
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
import { RouterLink } from "vue-router";
import Select from "../Select/Select.vue";

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
