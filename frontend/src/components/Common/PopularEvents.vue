<template>
  <div class="popular__events__left display991">
    <div class="popular__events__head">
      <h5>Popular events</h5>
      <ul>
        <li>
          <span>
            <img :src="cup" alt="img" />
          </span>
          <span>World Cup 2022</span>
        </li>
        <li>
          <span>
            <img :src="europ" alt="img" />
          </span>
          <span>Euroleague. Season 22/23</span>
        </li>
      </ul>
    </div>
    <div class="star__wrap">
      <span>
        <img :src="start" alt="img" />
      </span>
      <span>Favorites</span>
    </div>
    <div class="prematch__wrap">
      <div class="nav" id="nav-tabpre" role="tablist">
        <button
          class="nav-link active"
          id="nav-home-tabpre"
          data-bs-toggle="tab"
          data-bs-target="#nav-homepre"
          type="button"
          role="tab"
          aria-controls="nav-homepre"
          aria-selected="true"
        >
          Live
        </button>
        <button
          class="nav-link"
          id="nav-profile-tabpre"
          data-bs-toggle="tab"
          data-bs-target="#nav-profilepre"
          type="button"
          role="tab"
          aria-controls="nav-profilepre"
          aria-selected="false"
        >
          Prematch
        </button>
      </div>
      <div class="tab-content" id="nav-tabContentpre">
        <div
          class="tab-pane fade text-white show active"
          id="nav-homepre"
          role="tabpanel"
          aria-labelledby="nav-home-tabpre"
          tabIndex="0"
        >
          <div class="prematch__scopre">
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-football"></i>
                </span>
                <span class="score">Soccer</span>
              </div>
              <div class="prescore__right">
                <span>2</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-tennis"></i>
                </span>
                <span class="score">Tennis</span>
              </div>
              <div class="prescore__right">
                <span>4</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-basketball"></i>
                </span>
                <span class="score">Basketball</span>
              </div>
              <div class="prescore__right">
                <span>4</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-ttennis"></i>
                </span>
                <span class="score">Table Tennis</span>
              </div>
              <div class="prescore__right">
                <span>8</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-volly"></i>
                </span>
                <span class="score">Volleyball</span>
              </div>
              <div class="prescore__right">
                <span>2</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
            <RouterLink to="#pre" class="prescore__items">
              <div class="prescore__left">
                <span>
                  <i class="icon-handball"></i>
                </span>
                <span class="score">Handball</span>
              </div>
              <div class="prescore__right">
                <span>1</span>
                <span>
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
        <div
          class="tab-pane fade text-white"
          id="nav-profilepre"
          role="tabpanel"
          aria-labelledby="nav-profile-tabpre"
          tabIndex="0"
        >
          <div class="multiple__components">
            <div class="prematch__scopre">
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-football"></i>
                  </span>
                  <span class="score">Soccer</span>
                </div>
                <div class="prescore__right">
                  <span>2</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-tennis"></i>
                  </span>
                  <span class="score">Tennis</span>
                </div>
                <div class="prescore__right">
                  <span>4</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-basketball"></i>
                  </span>
                  <span class="score">Basketball</span>
                </div>
                <div class="prescore__right">
                  <span>4</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-ttennis"></i>
                  </span>
                  <span class="score">Table Tennis</span>
                </div>
                <div class="prescore__right">
                  <span>8</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-volly"></i>
                  </span>
                  <span class="score">Volleyball</span>
                </div>
                <div class="prescore__right">
                  <span>2</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
              <RouterLink to="#pre" class="prescore__items">
                <div class="prescore__left">
                  <span>
                    <i class="icon-handball"></i>
                  </span>
                  <span class="score">Handball</span>
                </div>
                <div class="prescore__right">
                  <span>1</span>
                  <span>
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cup from "../../assets/img/leftmenu/cup.png";
import europ from "../../assets/img/leftmenu/europ.png";
import start from "../../assets/img/leftmenu/start.png";
</script>

<style scoped></style>
