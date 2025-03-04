<template>
  <div
    class="tab-pane text-white fade show active"
    id="mainTab"
    role="tabpanel"
    tabIndex="0"
  >
    <MatchFixingSlider />
    
    <div class="main__body__wrap left__right__space">
      <!-- {/* Live__heightlight Here */} -->
      <div class="live__heightlight mb__30">
        <div class="section__title">
          <h4>Live Highlights</h4>
        </div>

        <LiveHeightLight />
      </div>
      <!-- {/* Next-To-Go Here */} -->
      <div class="live__heightlight mb__30">
        <div class="section__title">
          <h4>Next To Go</h4>
        </div>
        <NextToGo />
      </div>

      <!-- {/* Trending section Here */} -->
      <div class="live__heightlight trending__now">
        <div class="section__title">
          <h4>Trending Now</h4>
        </div>
        <Trending />
      </div>

      <!-- {/* Footer Content Here */} -->
      <div class="footer__content__section pt-60 pb-60">
        <div class="footer__content__items">
          <h5>Sports Betting at Sportingbet</h5>
          <p>
            Nulla facilisis scelerisque leo, nec accumsan metus. Vestibulum
            molestie augue vel erat molestie accumsan. In placerat dolor ut leo
            porttitor facilisis in a ante. Quisque vitae nibh arcu. Nam vitae
            cursus purus. Suspendisse sit amet auctor massa. Nulla ac urna in
            erat molestie maximus. Aliquam a velit vitae ex vehicula suscipit
            non in enim. Phasellus iaculis libero non dui consequat, vitae
            vulputate ipsum posuere. Praesent sagittis ipsum venenatis pharetra
            eleifend. Maecenas commodo mauris vitae leo faucibus fermentum at
            quis arcu. Nunc malesuada purus ex, vitae posuere turpis
            pellentesque eget. Curabitur rutrum a tellus et suscipit. Phasellus
            rhoncus dui et enim aliquet, et tincidunt mi laoreet. Nulla sagittis
            nibh purus, quis commodo nulla molestie nec. Donec et purus
            accumsan, sodales nunc at, pretium orci.
          </p>
        </div>
        <div class="footer__content__items">
          <h5>Bet online at Sportingbet</h5>
          <p>
            Nulla facilisis scelerisque leo, nec accumsan metus. Vestibulum
            molestie augue vel erat molestie accumsan. In placerat dolor ut leo
            porttitor facilisis in a ante. Quisque vitae nibh arcu. Nam vitae
            cursus purus. Suspendisse sit amet auctor massa. Nulla ac urna in
            erat molestie maximus. Aliquam a velit vitae ex vehicula suscipit
            non in enim. Phasellus iaculis libero non dui consequat, vitae
            vulputate ipsum posuere. Praesent sagittis ipsum venenatis pharetra
            eleifend. Maecenas commodo mauris vitae leo faucibus fermentum at
            quis arcu. Nunc malesuada purus ex, vitae posuere turpis
            pellentesque eget. Curabitur rutrum a tellus et suscipit. Phasellus
            rhoncus dui et enim aliquet, et tincidunt mi laoreet. Nulla sagittis
            nibh purus, quis commodo nulla molestie nec. Donec et purus
            accumsan, sodales nunc at, pretium orci.
          </p>
        </div>
        <div class="footer__content__items">
          <h5>Bet on Football</h5>
          <p>
            Nulla facilisis scelerisque leo, nec accumsan metus. Vestibulum
            molestie augue vel erat molestie accumsan. In placerat dolor ut leo
            porttitor facilisis in a ante. Quisque vitae nibh arcu. Nam vitae
            cursus purus. Suspendisse sit amet auctor massa. Nulla ac urna in
            erat molestie maximus. Aliquam a velit vitae ex vehicula suscipit
            non in enim. Phasellus iaculis libero non dui consequat, vitae
            vulputate ipsum posuere. Praesent sagittis ipsum venenatis pharetra
            eleifend. Maecenas commodo mauris vitae leo faucibus fermentum at
            quis arcu. Nunc malesuada purus ex, vitae posuere turpis
            pellentesque eget. Curabitur rutrum a tellus et suscipit. Phasellus
            rhoncus dui et enim aliquet, et tincidunt mi laoreet. Nulla sagittis
            nibh purus, quis commodo nulla molestie nec. Donec et purus
            accumsan, sodales nunc at, pretium orci.
          </p>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import FooterHome from "../Footer/FooterHome.vue";
import MatchFixingSlider from "../Sliders/MatchFixingSlider.vue";
import LiveHeightLight from "./LiveHeightLight.vue";
import NextToGo from "./NextToGo.vue";
import Trending from "./Trending.vue";
</script>

<style scoped></style>
