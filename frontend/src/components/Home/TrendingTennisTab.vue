<template>
    <div>
      <div class="section__head b__bottom">
        <div class="left__head">
          <span class="icons">
            <i class="icon-tennis"></i>
          </span>
          <span>Tennis</span>
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
      <div class="heght__table__points">
        <span>1</span>
        <span>2</span>
        <span>1</span>
        <span>2</span>
        <span>1</span>
        <span>2</span>
      </div>
      <div class="table__wrap">
        <div class="table__items b__bottom">
          <div class="t__items">
            <div class="t__items__left">
              <h6>
                Alycia Parks <span>USA</span>
              </h6>
              <span class="text">
                Cristina Bucsa <span>ESP</span>
              </span>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                1.75
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                2.05
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink to="#0box" class="point__box">
                1.75
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                2.05
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Rebecca Peterson <span>SWE</span>
              </h6>
              <span class="text">
                Ana Konjuh <span>CRO</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                1.75
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                8.50
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink to="#0box" class="point__box">
                1.75
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                1.95
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Nick Hardt <span>DOM</span>
              </h6>
              <span class="text">
                Victor Lilov <span>USA</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                2.70
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                8.50
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Rebecca Peterson <span>SWE</span>
              </h6>
              <span class="text">
                Alycia Parks <span>USA</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                6.56
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                7.55
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Ana Konjuh <span>CRO</span>
              </h6>
              <span class="text">
                Nick Hardt <span>DOM</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                8.66
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                5.11
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Bu Yunchaokete <span>CHN</span>
              </h6>
              <span class="text">
                Mark Lajal <span>EST</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                5.66
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                2.11
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Alexis Gautier <span>FRA</span>
              </h6>
              <span class="text">
                Dino Prizmic <span>CRO</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                4.06
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                3.01
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Cristina Dinu <span>CZE</span>
              </h6>
              <span class="text">
                Daniel Rincon <span>ESP</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                3.55
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                2.36
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Mark Lajal <span>EST</span>
              </h6>
              <span class="text">
                Ana Konjuh <span>CRO</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                6.33
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                4.55
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
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
              <h6>
                Lucija Ciric Bagaric <span>CRO</span>
              </h6>
              <span class="text">
                Ana Konjuh <span>CRO</span>
              </span>
              <p>
                <RouterLink to="#">Today / 21:00</RouterLink>
              </p>
            </div>
          </div>
          <div class="tableright__tennis">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                1.22
              </RouterLink>
              <RouterLink to="#0box" class="point__box">
                3.22
              </RouterLink>
            </div>
            <div class="mart__point__items pl__40">
              <RouterLink
                to="#0box"
                class="point__box icon__lock__box bg__none"
              >
                <i class="icon-lock lock"></i>
              </RouterLink>
            </div>
            <div class="mart__point__two pl__40">
              <div class="mart__point__right">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock"></i>
                </RouterLink>
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-star star"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="table__footer">
          <RouterLink to="#" class="lobby text__opa">
            Open Tennis lobby
          </RouterLink>
          <RouterLink to="#" class="footerpoing">
            <span>50</span>
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
  { id: 1, name: "2way - Who will win?" },
  { id: 2, name: "3way - Who will win?" },
  { id: 3, name: "4way - Who will win?" },
  { id: 4, name: "5way - Who will win?" },
];
const categoris2 = [
  { id: 1, name: "Who will win the set?" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];
const categoris3 = [
  { id: 1, name: "Game Winner" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];

</script>

<style scoped>

</style>