<template>
  <div
    class="tab-pane mt__30 text-white fade"
    id="mainTab11"
    role="tabpanel"
    tabIndex="0"
  >
    <div class="container">
      <div class="row justify-content-end">
        <div class="col-xl-8 col-lg-8">
          <div class="racing__tab">
            <nav>
              <div class="nav nav-tabs" id="nav-tabo" role="tablist">
                <!--  Today Btn  -->
                <button
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#horsein1"
                  type="button"
                  role="tab"
                  aria-selected="true"
                >
                  Today
                </button>

                <!--  Tomorrow Btn  -->
                <button
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#horsein2"
                  type="button"
                  role="tab"
                  aria-selected="false"
                >
                  Tomorrow
                </button>

                <!-- Future & Btn  -->
                <button
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#horsein3"
                  type="button"
                  role="tab"
                  aria-selected="false"
                >
                  Future & Specials
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <!--  Horse Slider -->
      <HorseSlider />
    </div>
    <!--  Main Body  -->
    <div class="main__body__wrap left__space pb-60">
      <div class="horse__racing__wrap">
        <div class="tab-content" id="nav-tabContenttoday">
          <!--Today  -->
          <div
            class="tab-pane fade show active"
            id="horsein1"
            role="tabpanel"
            aria-labelledby="horsein1"
            tabIndex="0"
          >
            <div class="horse__chart__wrap">
              <h4 class="head__horse">United Kingdom & Ireland</h4>
              <div class="horse__chart__items">
                <h5>Lingfield</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Hexham</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Kempton</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Leicester</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Dundalk</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">France</h4>
              <div class="horse__chart__items">
                <h5>Pau</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">USA</h4>
              <div class="horse__chart__items">
                <h5>Mountaineer</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>1:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>7:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>8:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>9:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>2:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Gulfstream</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Tampa Bay Downs</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Turf Paradise</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">France</h4>
              <div class="horse__chart__items">
                <h5>Kenilworth</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <!-- Tomorrow  -->
          <div
            class="tab-pane fade"
            id="horsein2"
            role="tabpanel"
            aria-labelledby="horsein2"
            tabIndex="0"
          >
            <div class="horse__chart__wrap">
              <h4 class="head__horse">France</h4>
              <div class="horse__chart__items">
                <h5>Pau</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">USA</h4>
              <div class="horse__chart__items">
                <h5>Mountaineer</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>1:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>7:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>8:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>9:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>2:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Gulfstream</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Tampa Bay Downs</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
              <div class="horse__chart__items">
                <h5>Turf Paradise</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>19:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">France</h4>
              <div class="horse__chart__items">
                <h5>Kenilworth</h5>
                <div class="chart__point__wrap">
                  <RouterLink to="#">
                    <span>17:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>17:30</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>18:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>12:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                  <RouterLink to="#">
                    <span>11:20</span>
                    <span class="ptext">p</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <!-- special -->
          <div
            class="tab-pane fade"
            id="horsein3"
            role="tabpanel"
            aria-labelledby="horsein3"
            tabIndex="0"
          >
            <div class="horse__chart__wrap">
              <h4 class="head__horse">Planing Step One</h4>
              <div class="horse__chart__items">
                <h5>Ante Post Flat Racing</h5>
                <div class="racing__list">
                  <RouterLink to="#">1000 Guineeas</RouterLink>
                  <RouterLink to="#">Derby</RouterLink>
                  <RouterLink to="#">200 Guineeas</RouterLink>
                  <RouterLink to="#">500 Guineeas</RouterLink>
                  <RouterLink to="#">Planing</RouterLink>
                  <RouterLink to="#">Grand National</RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">Planing Step Two</h4>
              <div class="horse__chart__items">
                <h5>Cheltenham Festival</h5>
                <div class="racing__list">
                  <RouterLink to="#">Stayers Hurdle</RouterLink>
                  <RouterLink to="#">Derby</RouterLink>
                  <RouterLink to="#">200 Guineeas</RouterLink>
                  <RouterLink to="#">500 Guineeas</RouterLink>
                  <RouterLink to="#">Planing</RouterLink>
                  <RouterLink to="#">Grand National</RouterLink>
                </div>
              </div>
            </div>
            <div class="horse__chart__wrap mt__30">
              <h4 class="head__horse">Planing Step Three</h4>
              <div class="horse__chart__items">
                <h5>Anitree Grand Festival</h5>
                <div class="racing__list">
                  <RouterLink to="#">Champion Durdle</RouterLink>
                  <RouterLink to="#">Chanllenge Trophy</RouterLink>
                  <RouterLink to="#">Leage Match</RouterLink>
                  <RouterLink to="#">500 Guineeas</RouterLink>
                  <RouterLink to="#">Planing pint</RouterLink>
                  <RouterLink to="#">Grand National</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import FooterHome from "../Footer/FooterHome.vue";
import HorseSlider from "../Sliders/HorseSlider.vue";
</script>

<style scoped></style>
