<script setup lang="ts">
import s1 from "../../assets/img/sponsor/s1.png";
import s10 from "../../assets/img/sponsor/s10.png";
import s12 from "../../assets/img/sponsor/s12.png";
import s3 from "../../assets/img/sponsor/s3.png";
import s4 from "../../assets/img/sponsor/s4.png";
import s5 from "../../assets/img/sponsor/s5.png";
import s6 from "../../assets/img/sponsor/s6.png";
import s7 from "../../assets/img/sponsor/s7.png";
import s8 from "../../assets/img/sponsor/s8.png";
import s9 from "../../assets/img/sponsor/s9.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { RouterLink } from "vue-router";

const imagesList = [
  s1,
  s10,
  s12,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  s1,
  s10,
  s12,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
];
</script>

<template>
  <div class="footer__sponsor owl-theme owl-carousel">
    <Swiper
      :slidesPerView="'auto'"
      :spaceBetween="30"
      :loop="true"
      :speed="3000"
      :freeMode="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :modules="[Autoplay]"
    >
      <swiper-slide v-for="image in imagesList" class="w-fit">
        <div class="footer__sponsor__items">
          <RouterLink to="#">
            <img :src="image" alt="Brand" />
          </RouterLink>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<style scoped></style>
