<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-afootball"></i>
        </span>
        <span>American Football</span>
      </div>
      <div class="right__catagoris">
        <div class="right__cate__items">
          <Select :data="gameLine"></Select>
        </div>
      </div>
    </div>
    <div class="table__wrap">
      <div class="table__items table__pointnone__items">
        <div class="t__items">
          <div class="t__items__left"></div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right opo">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box bg__none">
                  Spread
                </RouterLink>
                <RouterLink to="#" class="point__box bg__none">
                  Total
                </RouterLink>
                <RouterLink to="#" class="point__box bg__none">
                  Money Line
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box opo point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>New Orleans Saints @</h6>
            <span class="text">Tampa Bay Buccaneers</span>
            <p>
              <RouterLink to="#">Tomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today">
                BUILD A BET
              </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+3,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 40,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  2.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-3,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 40,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.53
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Kansas City Chiefs @</h6>
            <span class="text">Denver Broncos</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-8,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 42,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  4.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+9,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 44,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.22
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>New York Jets @</h6>
            <span class="text">Buffalo Bills</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+9,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 44,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  7.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 44,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Las Vegas Raiders @</h6>
            <span class="text">Los Angeles Rams</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 43</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  7.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 43</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Philadelphia Eagles @</h6>
            <span class="text">New York Giants</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  7.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Jacksonville Jaguars @</h6>
            <span class="text">Tennessee Titans</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 44,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.48
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 44,5</span>
                  <span>1.91</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  3.20
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Cleveland Browns @</h6>
            <span class="text">Cincinnati Bengals</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+3,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">0 42</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  7.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-3,5</span>
                  <span>U 42</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 44,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Carolina Panthers @</h6>
            <span class="text">Seattle Seahawks</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+1</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  6.33
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-1</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Minnesota Vikings @</h6>
            <span class="text">Detroit Lions</span>
            <p>
              <RouterLink to="#">12/12/2022 03:05</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__10">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast americanf__point__box">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  7.50
                </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-1</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  1.55
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none"
              >
                <i class="icon-star star"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="table__footer">
        <RouterLink to="#" class="lobby text__opa">
          OPEN AMERICAN FOOTBALL LOBBY
        </RouterLink>
        <RouterLink to="#" class="footerpoing">
          <span>42</span>
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

const gameLine = [
  { id: 1, name: "Game Lines" },
  { id: 2, name: "Game Lines 1" },
  { id: 3, name: "Game Lines 2" },
  { id: 4, name: "Game Lines 3" },
  { id: 5, name: "Game Lines 4" },
];
</script>

<style scoped></style>
