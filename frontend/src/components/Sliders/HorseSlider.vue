<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
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
        <div class="horse__slide__items">
          <div class="horse__s__head">
            <h6>PAU 17:15</h6>
            <span class="miu">1m 1f 207y | EW 1/5 1-2-3</span>
          </div>
          <div class="horse__body__wrap">
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>1</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Borndlers</h5>
                  <span class="deg1">J: D Alberca-Gavilan</span>
                  <span class="deg2">T: JL Pelletan</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>2</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Grecian Bonanza</h5>
                  <span class="deg1">J: S Le Quilleuc</span>
                  <span class="deg2">T: JC Rouget</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>4</span>
                  <span>4</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Germinal</h5>
                  <span class="deg1">J: A Bendjama</span>
                  <span class="deg2">T: S Brogi</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
          </div>
          <p class="horse__s__footer">View full race (15 Runners)</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="horse__slide__items">
          <div class="horse__s__head">
            <h6>KENILWORTH 17:15</h6>
            <span class="miu">7f 210y | EW 1/5 1-2-3</span>
          </div>
          <div class="horse__body__wrap">
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>1</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Miss New York</h5>
                  <span class="deg1">J: Devin Ashby</span>
                  <span class="deg2">T: Andries Steyn</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>2</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Fields Of Green</h5>
                  <span class="deg1">J: M Yeni</span>
                  <span class="deg2">T: Glen Kotzen Sanchez</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>4</span>
                  <span>4</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Be Hopeful</h5>
                  <span class="deg1">J: Craig Bantam</span>
                  <span class="deg2">T: Justin Snaith</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
          </div>
          <p class="horse__s__footer">View full race (15 Runners)</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="horse__slide__items">
          <div class="horse__s__head">
            <h6>LINGFIELD 17:20</h6>
            <span class="miu">1m 1y | EW 1/4 1-2-3</span>
          </div>
          <div class="horse__body__wrap">
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>1</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Mcqueen</h5>
                  <span class="deg1">J: D Tudhope</span>
                  <span class="deg2">T: H Spiller</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>2</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Blue Collar Lad</h5>
                  <span class="deg1">J: William Carson</span>
                  <span class="deg2">T: R Brisland</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>4</span>
                  <span>4</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Dutugamunu</h5>
                  <span class="deg1">J: Joshua Bryan</span>
                  <span class="deg2">T:L Carter</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
          </div>
          <p class="horse__s__footer">View full race (15 Runners)</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="horse__slide__items">
          <div class="horse__s__head">
            <h6>PAU 17:15</h6>
            <span class="miu">1m 1f 207y | EW 1/5 1-2-3</span>
          </div>
          <div class="horse__body__wrap">
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>1</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Joy De Montegut</h5>
                  <span class="deg1">J: A Werle</span>
                  <span class="deg2">T: T&G Lemer</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>2</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Saffwan</h5>
                  <span class="deg1">J: A Crastus</span>
                  <span class="deg2">T: JC Rouget</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>4</span>
                  <span>4</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Dhakir</h5>
                  <span class="deg1">J: M Forest</span>
                  <span class="deg2">T: Francisco Sanchez</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
          </div>
          <p class="horse__s__footer">View full race (15 Runners)</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="horse__slide__items">
          <div class="horse__s__head">
            <h6>KENILWORTH 17:15</h6>
            <span class="miu">7f 210y | EW 1/5 1-2-3</span>
          </div>
          <div class="horse__body__wrap">
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>1</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Miss New York</h5>
                  <span class="deg1">J: Devin Ashby</span>
                  <span class="deg2">T: Andries Steyn</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>2</span>
                  <span>2</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Fields Of Green</h5>
                  <span class="deg1">J: M Yeni</span>
                  <span class="deg2">T: Glen Kotzen Sanchez</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
            <div class="horse__body">
              <div class="horse__s__left">
                <p>
                  <span>4</span>
                  <span>4</span>
                </p>
                <div class="icon">
                  <i class="icon-jersy"></i>
                </div>
                <div class="borndles">
                  <h5>Be Hopeful</h5>
                  <span class="deg1">J: Craig Bantam</span>
                  <span class="deg2">T: Justin Snaith</span>
                </div>
              </div>
              <span class="horse__sp">Sp</span>
            </div>
          </div>
          <p class="horse__s__footer">View full race (15 Runners)</p>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<style scoped></style>
