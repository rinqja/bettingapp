<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import arjentina from "../../assets/img/matchfixing/arjentina.png";
import aus from "../../assets/img/matchfixing/aus.png";
import denmark from "../../assets/img/matchfixing/denmark.png";
import farense from "../../assets/img/matchfixing/farense.png";
import france from "../../assets/img/matchfixing/france.png";
import maxico from "../../assets/img/matchfixing/maxico.png";
import oviedo from "../../assets/img/matchfixing/oviedo.png";
import poland from "../../assets/img/matchfixing/poland.png";
import tenerif from "../../assets/img/matchfixing/tenerif.png";
import tunisia from "../../assets/img/matchfixing/tunisia.png";
</script>

<template>
  <div
    class="match__fixing__wrap top__bottom__space left__right__space owl-theme owl-carousel"
  >
    <Swiper
      :loop="true"
      :spaceBetween="30"
      :speed="3000"
      :autoplay="{
        delay: 2000,
      }"
      :modules="[Autoplay]"
      :breakpoints="{
        0: {
          slidesPerView: 1,
        },
        570: {
          slidesPerView: 2,
        },
        1300: {
          slidesPerView: 3,
        },
        1600: {
          slidesPerView: 4,
        },
      }"
    >
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>World Cup 2022</span>
            </div>
            <span class="today">Today / 22:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Argentina</span>
              <span class="flag">
                <img :src="arjentina" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="france" alt="flag" />
              </span>
              <span>France</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>8.55</span>
            </li>
            <li>
              <span>X</span>
              <span>6.50</span>
            </li>
            <li>
              <span>2</span>
              <span>3.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>World Cup 2022</span>
            </div>
            <span class="today">Today / 2:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Poland</span>
              <span class="flag">
                <img :src="poland" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="denmark" alt="flag" />
              </span>
              <span>Denmark</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>3.55</span>
            </li>
            <li>
              <span>X</span>
              <span>4.50</span>
            </li>
            <li>
              <span>2</span>
              <span>2.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>World Cup 2022</span>
            </div>
            <span class="today">Today / 22:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Mexico</span>
              <span class="flag">
                <img :src="maxico" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="poland" alt="flag" />
              </span>
              <span>Poland</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>8.55</span>
            </li>
            <li>
              <span>X</span>
              <span>9.50</span>
            </li>
            <li>
              <span>2</span>
              <span>5.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>WEFA</span>
            </div>
            <span class="today">Tomorrow / 01:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Farense</span>
              <span class="flag">
                <img :src="farense" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="tenerif" alt="flag" />
              </span>
              <span>Tenerife</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>1.55</span>
            </li>
            <li>
              <span>X</span>
              <span>8.50</span>
            </li>
            <li>
              <span>2</span>
              <span>3.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>EFL Trophy</span>
            </div>
            <span class="today">Tomorrow / 01:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Tenerife</span>
              <span class="flag">
                <img :src="tenerif" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="oviedo" alt="flag" />
              </span>
              <span>Real Oviedo</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>3.55</span>
            </li>
            <li>
              <span>X</span>
              <span>9.50</span>
            </li>
            <li>
              <span>2</span>
              <span>6.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="match__fixing__items">
          <div class="match__head">
            <div class="match__head__left">
              <span class="icons">
                <i class="icon-football"></i>
              </span>
              <span>World Cup 2022</span>
            </div>
            <span class="today">Today / 22:00</span>
          </div>
          <div class="match__vs">
            <div class="match__vs__left">
              <span>Australia</span>
              <span class="flag">
                <img :src="aus" alt="flag" />
              </span>
            </div>
            <span class="vs">Vs</span>
            <div class="match__vs__left">
              <span class="flag">
                <img :src="tunisia" alt="flag" />
              </span>
              <span>Tunisia</span>
            </div>
          </div>
          <div class="match__result">
            <span class="matchborder"></span>
            <span class="match__text">Match Reult</span>
          </div>
          <ul class="match__point">
            <li>
              <span>1</span>
              <span>3.55</span>
            </li>
            <li>
              <span>X</span>
              <span>4.50</span>
            </li>
            <li>
              <span>2</span>
              <span>2.20</span>
            </li>
          </ul>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<style scoped></style>
