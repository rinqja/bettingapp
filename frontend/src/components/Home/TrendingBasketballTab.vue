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
    <div class="table__wrap">
      <div class="table__items table__pointnone__items">
        <div class="t__items">
          <div class="t__items__left"></div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right opo">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart opo">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box bg__none">
                  1
                </RouterLink>
                <RouterLink to="#0box" class="point__box bg__none">
                  X
                </RouterLink>
                <RouterLink to="#0box" class="point__box bg__none">
                  2
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none">
              Goals
            </RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box bg__none">
                  Over
                </RouterLink>
                <RouterLink to="#" class="point__box bg__none">
                  Under
                </RouterLink>
              </div>
            </div>
            <div class="mart__point__right">
              <RouterLink to="#" class="point__box point__boxpadding bg__none">
                No
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="table__items b__bottom">
        <div class="t__items">
          <div class="t__items__left">
            <h6>Memphis Grizzlies @</h6>
            <span class="text">Detroit Pistons</span>
            <p>
              <RouterLink to="#">Tomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>3.25</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none">
              <i class="icon-lock lock"></i>
            </RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 79,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 2.25 </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 79,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 1.60 </RouterLink>
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
            <h6>Boston Celtics @</h6>
            <span class="text">Brooklyn Nets</span>
            <p>
              <RouterLink to="#">Tomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>3.25</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>6.33</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none">
              <i class="icon-lock lock"></i>
            </RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 79,5</span>
                  <span>9.36</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 3.25 </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 79,5</span>
                  <span>6.35</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 1.60 </RouterLink>
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
            <h6>Los Angeles Lakers @</h6>
            <span class="text">Washington Wizards</span>
            <p>
              <RouterLink to="#">Tomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none"></RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast martbas__pointlast__width">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock lock"></i>
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
            <h6>Phoenix Suns @</h6>
            <span class="text">San Antonio Spurs</span>
            <p>
              <RouterLink to="#">Today / 21:00</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none"></RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast martbas__pointlast__width">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock lock"></i>
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
            <h6>Chicago Bulls @</h6>
            <span class="text">Sacramento Kings</span>
            <p>
              <RouterLink to="#">TTomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>3.25</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>6.33</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none">
              <i class="icon-lock lock"></i>
            </RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 79,5</span>
                  <span>9.36</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 3.25 </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 79,5</span>
                  <span>6.35</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 1.60 </RouterLink>
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
            <h6>Denver Nuggets @</h6>
            <span class="text">New Orleans Pelicans</span>
            <p>
              <RouterLink to="#">Today / 21:00</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none"></RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast martbas__pointlast__width">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock lock"></i>
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
            <h6>Indiana Pacers @</h6>
            <span class="text">Portland Trail Blazers</span>
            <p>
              <RouterLink to="#">Today / 21:00</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>2.70</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>8.50</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none"></RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast martbas__pointlast__width">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box bg__none">
                  <i class="icon-lock lock"></i>
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
            <h6>Chicago Bulls @</h6>
            <span class="text">Sacramento Kings</span>
            <p>
              <RouterLink to="#">TTomorrow / 05:10</RouterLink>
              <RouterLink to="#" class="today"> BUILD A BET </RouterLink>
            </p>
          </div>
        </div>
        <div class="tablebasket__main__wrap">
          <div class="tablebasket__martpoin__wrap">
            <div class="mart__point__items">
              <RouterLink to="#" class="twing twing__right">
                <i class="icon-twer"></i>
              </RouterLink>
              <RouterLink to="#" class="mart">
                <i class="icon-pmart"></i>
              </RouterLink>
            </div>
            <div class="tablemartbasket__colum">
              <div class="mart__point__items mb__10">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">+6,5</span>
                  <span>3.25</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">O 109,5</span>
                  <span>6.33</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 7.50 </RouterLink>
              </div>
              <div class="mart__point__items">
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">-6,5</span>
                  <span>1.80</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box">
                  <span class="spoint">U 109,5</span>
                  <span>1.87</span>
                </RouterLink>
                <RouterLink to="#0box" class="point__box"> 1.55 </RouterLink>
              </div>
            </div>
          </div>
          <div class="mart__point__items pl__40 pr__40">
            <RouterLink to="#0box" class="point__box bg__none">
              <i class="icon-lock lock"></i>
            </RouterLink>
          </div>
          <div class="mart__point__items">
            <div class="martbas__pointlast">
              <div class="mart__point__left mb__10">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">O 79,5</span>
                  <span>9.36</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 3.25 </RouterLink>
              </div>
              <div class="mart__point__left">
                <RouterLink to="#" class="point__box">
                  <span class="spoint">U 79,5</span>
                  <span>6.35</span>
                </RouterLink>
                <RouterLink to="#" class="point__box"> 1.60 </RouterLink>
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
          Open Football lobby
        </RouterLink>
        <RouterLink to="#" class="footerpoing">
          <span>222</span>
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
</script>

<style scoped></style>
