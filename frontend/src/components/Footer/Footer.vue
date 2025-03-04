<template>
  <footer class="footer__section pt-60">
    <div class="container">
      <div class="footer__top pb-60">
        <div class="row g-5">
          <div
            class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.9s"
          >
            <div class="widget__items">
              <div class="footer-head">
                <RouterLink to="#" class="footer-logo">
                  <img :src="footerlogo" alt="f-logo" />
                </RouterLink>
              </div>
              <div class="content-area">
                <p>
                  Lorem ipsum dolor sit of the cart amet, consectetur adipiscing
                  elit. I talk out of the moon.
                </p>
                <h6>Follow Us</h6>
                <ul class="social">
                  <li>
                    <RouterLink to="#" class="icon">
                      <i class="fa-brands fa-facebook-f"></i>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#" class="icon">
                      <i class="fa-brands fa-instagram"></i>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#" class="icon">
                      <i class="fa-brands fa-linkedin-in"></i>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#" class="icon">
                      <i class="fa-brands fa-twitter"></i>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-xxl-3 col-xl-2 col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.7s"
          >
            <div class="widget__items">
              <div class="footer-head">
                <h3 class="title">Company</h3>
              </div>
              <div class="content-area">
                <ul class="quick-link">
                  <li>
                    <RouterLink to="/">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Home
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Slots
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Tournament
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Jackpots
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/livecasino">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Live Games
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-3 wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <div class="widget__items">
              <div class="footer-head">
                <h3 class="title">Support</h3>
              </div>
              <div class="content-area">
                <ul class="quick-link">
                  <li>
                    <RouterLink to="#">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Faqs
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to="#">
                      <img
                        width="{17}"
                        height="{17}"
                        :src="rightarrow"
                        alt="angle"
                      />
                      Support
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-xxl-4 col-xl-5 col-lg-4 col-md-6 col-sm-9 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="widget__items">
              <div class="footer-head">
                <h3 class="title">Subscribe Our Newslatter</h3>
              </div>

              <p>
                Proin mauris ligula, pretium eu est ut, imperdiet imperdiet
                massa. Nullam sodales ut orci vehicula aliquam. Suspendisse.
              </p>
              <div class="content-area">
                <form>
                  <input type="text" placeholder="Enter Your Email address" />
                  <button class="cmn--btn" type="submit">
                    <span>Subscribe</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="text-white">
          Copyright &copy; 2024,
          <RouterLink to="#" class="text--base"> SportOdds </RouterLink> - All
          Right Reserved
        </p>
        <ul class="bottom__ling">
          <li>
            <RouterLink to="#" class="text-white">
              Affiliate program
            </RouterLink>
          </li>
          <li>
            <RouterLink to="#" class="text-white">
              Terms & conditions
            </RouterLink>
          </li>
          <li>
            <RouterLink to="#" class="text-white">
              Bonus terms & conditions
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import rightarrow from "../../assets/img/footer/rightarrow.png";
import footerlogo from "../../assets/img/logo/footerlogo.png";
</script>

<style scoped></style>
