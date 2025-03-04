<template>
  <div>
    <div class="section__head b__bottom">
      <div class="left__head">
        <span class="icons">
          <i class="icon-volly"></i>
        </span>
        <span>Vollyball</span>
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
                <RouterLink to="#0box" class="point__box bg__none">
                  1
                </RouterLink>
                <RouterLink to="#0box" class="point__box bg__none">
                  2
                </RouterLink>
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
            <h6>ZAKSA Kedzierzyn-Kozle</h6>
            <span class="text">Cerrad Czarni Radom</span>
            <p>
              <RouterLink to="#">Today / 19:45</RouterLink>
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
                <RouterLink to="#0box" class="point__box"> 1.04 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.26 </RouterLink>
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
            <h6>Sao Paulo Barueri VC</h6>
            <span class="text">Unilife Maringa</span>
            <p>
              <RouterLink to="#">Tomorrow / 02:00</RouterLink>
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
                <RouterLink to="#0box" class="point__box"> 1.28 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 9.50 </RouterLink>
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
            <h6>Gas Sales Piacenza</h6>
            <span class="text">Top Volley Cisterna</span>
            <p>
              <RouterLink to="#">Tomorrow / 02:00</RouterLink>
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
            <h6>Verona</h6>
            <span class="text">Volley Siena</span>
            <p>
              <RouterLink to="#">Tomorrow / 02:00</RouterLink>
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
                <RouterLink to="#0box" class="point__box"> 2.30 </RouterLink>
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
            <h6>Vero Volley Monza</h6>
            <span class="text">Modena Volley</span>
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
                <RouterLink to="#0box" class="point__box"> 8.50 </RouterLink>
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
            <h6>Volley Bergamo</h6>
            <span class="text">ASD Pallavolo Pinerolo</span>
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
                <RouterLink to="#0box" class="point__box"> 1.15 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 4.33 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>3.65</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.35</span>
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
            <h6>Volley Milano</h6>
            <span class="text">Volley Civitanova</span>
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
                <RouterLink to="#0box" class="point__box"> 2.70 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 8.50 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.65</span>
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
            <h6>ZAKSA Kedzierzyn-Kozle</h6>
            <span class="text">Cerrad Czarni Radom</span>
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
                <RouterLink to="#0box" class="point__box"> 1.01 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 10.00 </RouterLink>
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
            <h6>Unet E-Work Busto Arsizio</h6>
            <span class="text">Helvia Recina Macerata</span>
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
                <RouterLink to="#0box" class="point__box"> 2.70 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 160 </RouterLink>
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
            <h6>Reale Mutua Fenera Chieri</h6>
            <span class="text">Volley Vallefoglia</span>
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
                <RouterLink to="#0box" class="point__box"> 4.50 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 4.33 </RouterLink>
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
            <h6>Cuneo Granda Volley</h6>
            <span class="text">Vero Volley Milano</span>
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
                <RouterLink to="#0box" class="point__box"> 6.03 </RouterLink>
                <RouterLink to="#0box" class="point__box"> 2.35 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>2.35</span>
                </RouterLink>
                <RouterLink to="#" class="point__box">
                  <span class="spoint">Set 1</span>
                  <span>3.87</span>
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
          OPEN VOLLEYBALL LOBBY
        </RouterLink>
        <RouterLink to="#" class="footerpoing">
          <span>100</span>
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
