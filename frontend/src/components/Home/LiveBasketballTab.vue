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

<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-basketball"></i>
        </span>
        <span>Basketball</span>
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

    <div v-if="thead" class="heght__table__points tennis__table__points">
      <span>Spread</span>
      <span>Total</span>
      <span>Money Line</span>
      <span>Spread</span>
      <span>Total</span>
      <span>Money Line</span>
    </div>
    <div class="table__wrap">
      <div class="table__items mb__10 paddingbnone">
        <div class="t__items t__items__basket">
          <div class="t__items__left">
            <h6>Niigata Albirex BB</h6>
            <span class="text">Sendai 89ERS</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>2H 11:15</span>
            </p>
          </div>
        </div>
        <div class="cart__point">
          <span>21</span>
        </div>

        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items paddingtnone b__bottom">
        <div class="t__items"></div>
        <div class="cart__point">
          <span>26</span>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items mb__10 paddingbnone">
        <div class="t__items t__items__basket">
          <div class="t__items__left">
            <h6>Tokyo United BC</h6>
            <span class="text">Rizing Fukuoka</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>2min</span>
            </p>
          </div>
        </div>
        <div class="cart__point">
          <span>11</span>
        </div>

        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items paddingtnone b__bottom">
        <div class="t__items"></div>
        <div class="cart__point">
          <span>12</span>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items mb__10 paddingbnone">
        <div class="t__items t__items__basket">
          <div class="t__items__left">
            <h6>Fukushima Firebonds</h6>
            <span class="text">Earth Friends Tokyo Z</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>2min</span>
            </p>
          </div>
        </div>
        <div class="cart__point">
          <span>30</span>
        </div>

        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-lock"></i>
              </RouterLink>
              <RouterLink to="#" class="point__box opo"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items paddingtnone b__bottom">
        <div class="t__items"></div>
        <div class="cart__point">
          <span>16</span>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
              <RouterLink to="#" class="point__box opo"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items mb__10 paddingbnone">
        <div class="t__items t__items__basket">
          <div class="t__items__left">
            <h6>Saitama Broncos</h6>
            <span class="text">Kagawa Five Arrows</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>2min</span>
            </p>
          </div>
        </div>
        <div class="cart__point">
          <span>10</span>
        </div>

        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items paddingtnone b__bottom">
        <div class="t__items"></div>
        <div class="cart__point">
          <span>16</span>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box">
                <span class="tov">o 79,5</span>
                <span>8.50</span>
              </RouterLink>
              <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items mb__10 paddingbnone">
        <div class="t__items t__items__basket">
          <div class="t__items__left">
            <h6>Saitama Broncos</h6>
            <span class="text">Kumamoto Volters</span>
            <p>
              <RouterLink to="#">Live</RouterLink>
              <span>2min</span>
            </p>
          </div>
        </div>
        <div class="cart__point">
          <span>30</span>
        </div>

        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-lock"></i>
              </RouterLink>
              <RouterLink to="#" class="point__box opo"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none spacing__lock">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items paddingtnone b__bottom">
        <div class="t__items"></div>
        <div class="cart__point">
          <span>33</span>
        </div>
        <div class="tennis__right">
          <div class="mart__point__items">
            <RouterLink to="#" class="twing twing__right">
              <i class="icon-twer"></i>
            </RouterLink>
            <RouterLink to="#" class="mart">
              <i class="icon-pmart"></i>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">+6,5</span>
              <span>2.70</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box">
              <span class="tov">o 109,5</span>
              <span>8.50</span>
            </RouterLink>
            <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__two">
            <div class="mart__point__left">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-lock"></i>
              </RouterLink>
              <RouterLink to="#" class="point__box opo"> 2.25 </RouterLink>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box bg__none opo">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="table__footer">
        <RouterLink to="#" class="lobby">
          All <span class="text__btn">Basketball Live</span> Events
        </RouterLink>
        <RouterLink to="#" class="footerpoing">
          <span>12</span>
          <span>
            <i class="fas fa-angle-right"></i>
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
