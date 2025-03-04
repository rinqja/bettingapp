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
      </div>
    </div>
    <div class="table__wrap">
      <div class="table__items table__pointnone__items">
        <div class="t__items">
          <div class="t__items__left"></div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right opo">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box bg__none"> 1 </RouterLink>
                <RouterLink to="#0box" class="point__box bg__none"> 2 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box bg__none"> 1 </RouterLink>
                <RouterLink to="#" class="point__box bg__none"> 2 </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink
                to="#"
                class="point__box point__boxpadding bg__none opo"
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
            <h6>Jiri Louda <span>CZE</span></h6>
            <span class="text"> Petr Oliver Korp <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Today / 19:45</RouterLink>
              <RouterLink to="#" class="text__btn"> 35 min </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 3.22 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 5.44 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.15</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.87</span>
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
            <h6>Pavel Kulhanek <span>CZE</span></h6>
            <span class="text"> Jiri Svec <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Starting in</RouterLink>
              <RouterLink to="#" class="text__btn"> 35 min </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 2.28 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 6.50 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.11</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>5.25</span>
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
            <h6>Gas Sales Piacenza</h6>
            <span class="text">Top Volley Cisterna</span>
            <p>
              <RouterLink to="#">Starting in</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 1.19 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 4.33 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.10</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.65</span>
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
            <h6>Jan Mecl Jr. <span>CZE</span></h6>
            <span class="text"> Martin Kowalik <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Tomorrow/ 01:30</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 4.30 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.57 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>3.25</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.10</span>
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
            <h6>Petr Oliver Korp <span>CZE</span></h6>
            <span class="text"> Jan Mecl Jr. <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Today / 23:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 2.70 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 3.50 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.15</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.87</span>
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
            <h6>Martin Kowalik <span>CZE</span></h6>
            <span class="text"> Jiri Louda <span>CZE</span> </span>
            <p>
              <RouterLink to="#">06/12/2022 00:30</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 1.70 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 8.50 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.65</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.87</span>
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
            <h6>Tibor Kolenic <span>CZE</span></h6>
            <span class="text"> Pavel Kulhanek <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Today / 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 5.01 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 9.00 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.36</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.90</span>
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
            <h6>Jiri Louda <span>CZE</span></h6>
            <span class="text"> Jan Mecl Jr. <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Today / 22:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 3.70 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.60 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.45</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.55</span>
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
            <h6>Pavel Kulhanek <span>CZE</span></h6>
            <span class="text"> Radek Bartunek <span>CZE</span> </span>
            <p>
              <RouterLink to="#">Today / 21:00</RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap pr__40">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box"> 5.50 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 3.33 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.15</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.75</span>
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
          OPEN VOLLEYBALL LOBBY
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
import { RouterLink } from 'vue-router';
import Select from '../Select/Select.vue';

const categoris = [
  { id: 2, name: "3way - Who will win?" },
  { id: 3, name: "4way - Who will win?" },
  { id: 4, name: "5way - Who will win?" },
  { id: 5, name: "6way - Who will win?" },
];

const categoris2 = [
  { id: 2, name: "Set Winner" },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
  { id: 5, name: "...." },
];
</script>

<style scoped></style>
