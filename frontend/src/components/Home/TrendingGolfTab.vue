<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-golf"></i>
        </span>
        <span>Golf</span>
      </div>
      <div class="right__catagoris">
        <div class="right__cate__items">
          <Select :data="categoris"></Select>
        </div>
        <div class="right__cate__items">
          <Select :data="categoris"></Select>
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
            <h6>To win a Major in 2023</h6>
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
            <h6 class="p__max">
              Rory McIlroy major championship wins in 2023 (bets void if he does
              not play in all...
            </h6>
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
            <h6>The Match VII</h6>
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
import Select from "../Select/Select.vue";

const categoris = [
  { id: 2, name: "3-ball Match" },
  { id: 3, name: "4-ball Match" },
  { id: 4, name: "5-ball Match" },
  { id: 5, name: "6-ball Match" },
];

</script>

<style scoped></style>
