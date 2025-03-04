<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-cycling"></i>
        </span>
        <span>Cycling</span>
      </div>
      <div class="right__catagoris">
        <div class="right__cate__items">
          <Select :data="mainBets"></Select>
        </div>
      </div>
    </div>
    <div class="heght__table__points">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>1</span>
      <span>2</span>
    </div>
    <div class="table__wrap">
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Milano-San Remo 2023</h6>
            <p>
              <RouterLink to="#">23/07/2023 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box aroow__text bg__none">
                  <span>Bet now</span>
                  <span class="icons">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box point__boxpadding bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6 class="p__max">Paris-Roubaix 2023</h6>
            <p>
              <RouterLink to="#">23/07/2023 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box aroow__text bg__none">
                  <span>Bet now</span>
                  <span class="icons">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box point__boxpadding bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Tour de France 2023 - General Classification</h6>
            <p>
              <RouterLink to="#">23/07/2023 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box aroow__text bg__none">
                  <span>Bet now</span>
                  <span class="icons">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box point__boxpadding bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Tour of Flanders 2023</h6>
            <p>
              <RouterLink to="#">23/07/2023 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box aroow__text bg__none">
                  <span>Bet now</span>
                  <span class="icons">
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box point__boxpadding bg__none">
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="table__footer">
        <RouterLink to="#" class="lobby text__opa">
          OPEN GOLF LOBBY
        </RouterLink>
        <RouterLink to="#" class="footerpoing">
          <span>4</span>
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

const mainBets = [
  { id: 2, name: "Main bets 1" },
  { id: 3, name: "Main bets 2" },
  { id: 4, name: "Main bets 3" },
  { id: 5, name: "Main bets 4" },
];
</script>

<style scoped></style>
