<script setup lang="ts">
import FooterHome from "../Footer/FooterHome.vue";
import TimeTableTab from "./TimeTableTab.vue";
import { ref, watch } from "vue";

import play from "../../assets/img/games/play.png";
import virtual2 from "../../assets/img/virtuals/virtual2.jpg";
import virtual3 from "../../assets/img/virtuals/virtual3.jpg";
import vr1 from "../../assets/img/virtuals/vr1.jpg";
import vr2 from "../../assets/img/virtuals/vr2.jpg";
import vr3 from "../../assets/img/virtuals/vr3.jpg";
import vr4 from "../../assets/img/virtuals/vr4.jpg";
import vr5 from "../../assets/img/virtuals/vr5.jpg";
import vr6 from "../../assets/img/virtuals/vr6.jpg";
import vr7 from "../../assets/img/virtuals/vr7.jpg";
import vr8 from "../../assets/img/virtuals/vr8.jpg";
import vr9 from "../../assets/img/virtuals/vr9.jpg";
import world from "../../assets/img/virtuals/world.jpg";

const images = [vr1, vr2, vr3, vr4, vr5, vr6, vr7, vr8, vr9];

const isOpen = ref(false);
const handleVideoModal = () => {
  isOpen.value = !isOpen.value;
};
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
</script>

<template>
  <div>
    <!-- modal-video start -->
    <div :class="`video-modal-container ${isOpen ? 'show' : 'hide'}`">
      <div @click="handleVideoModal" class="video-modal-overlay"></div>
      <div :class="`video-modal ${isOpen ? 'show' : 'hide'}`">
        <iframe
          src="https://www.youtube.com/embed/orf582WJV_c?si=rkCxRSuGanZ_xll4"
          class="video video-iframe aspect-video w-full"
        >
        </iframe>
        <button @click="handleVideoModal" class="video-close-button">
          <i class="icon-cross"></i>
        </button>
      </div>
    </div>
    <!-- modal video end -->
    <div
      class="tab-pane mt__30 text-white fade"
      id="mainTab12"
      role="tabpanel"
      tabIndex="0"
    >
      <!-- {/* main Body */} -->
      <div class="main__body__wrap left__right__space pb-60">
        <div class="virtual__tabs">
          <ul class="nav nav-pills mb-3" id="pills-tabsports" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                data-bs-toggle="pill"
                data-bs-target="#virtualfoot1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                <span class="icon">
                  <i class="icon-football"></i>
                </span>
                <span>Football</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="pill"
                data-bs-target="#virtualfoot2"
                type="button"
                role="tab"
                aria-selected="false"
              >
                <span class="icon">
                  <i class="icon-basketball"></i>
                </span>
                <span>Basketball</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="pill"
                data-bs-target="#virtualfoot3"
                type="button"
                role="tab"
                aria-selected="false"
              >
                <span class="icon">
                  <i class="icon-afootball"></i>
                </span>
                <span>American Foot..</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                data-bs-toggle="pill"
                data-bs-target="#virtualfoot4"
                type="button"
                role="tab"
                aria-selected="false"
              >
                <span class="icon">
                  <i class="icon-live"></i>
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
          <!-- {/* football */} -->
          <div
            class="tab-pane fade show active"
            id="virtualfoot1"
            role="tabpanel"
            aria-labelledby="virtualfoot1"
            tabIndex="0"
          >
            <div class="world__cup__area">
              <div class="world__tabs">
                <ul
                  class="nav nav-pills mb-3"
                  id="pills-tabworld"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds1"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      <span>World Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds2"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Champions Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds3"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Permiership</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="pills-tabContentworldsss100">
                <div
                  class="tab-pane fade active show"
                  id="worlds1"
                  role="tabpanel"
                  aria-labelledby="worlds1"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="world" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds2"
                  role="tabpanel"
                  aria-labelledby="worlds2"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual2" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds3"
                  role="tabpanel"
                  aria-labelledby="worlds3"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual3" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- {/* Time Table Tab */} -->
            <TimeTableTab :id="104" />
          </div>
          <!-- {/* basketball */} -->
          <div
            class="tab-pane fade"
            id="virtualfoot2"
            role="tabpanel"
            aria-labelledby="virtualfoot2"
            tabIndex="0"
          >
            <div class="world__cup__area">
              <div class="world__tabs">
                <ul class="nav nav-pills mb-3" id="pills-tabbas" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds1bas"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      <span>World Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds2bas"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Champions Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds3bas"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Permiership</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="pills-tabContentworldsss101">
                <div
                  class="tab-pane fade active show"
                  id="worlds1bas"
                  role="tabpanel"
                  aria-labelledby="worlds1bas"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual3" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds2bas"
                  role="tabpanel"
                  aria-labelledby="worlds2bas"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual2" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds3bas"
                  role="tabpanel"
                  aria-labelledby="worlds3bas"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual3" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- {/* Time Table Tab */} -->
            <TimeTableTab :id="101" />
          </div>
          <!-- {/* American Football */} -->
          <div
            class="tab-pane fade"
            id="virtualfoot3"
            role="tabpanel"
            aria-labelledby="virtualfoot3"
            tabIndex="0"
          >
            <div class="world__cup__area">
              <div class="world__tabs">
                <ul
                  class="nav nav-pills mb-3"
                  id="pills-tabaffot"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds1afoot"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      <span>World Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds2afoot"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Champions Cup</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      data-bs-toggle="pill"
                      data-bs-target="#worlds3afoot"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      <span>Permiership</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="tab-content" id="pills-tabContentworldsss102">
                <div
                  class="tab-pane fade active show"
                  id="worlds1afoot"
                  role="tabpanel"
                  aria-labelledby="worlds1afoot"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual2" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds2afoot"
                  role="tabpanel"
                  aria-labelledby="worlds2afoot"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual2" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="worlds3afoot"
                  role="tabpanel"
                  aria-labelledby="worlds3afoot"
                  tabIndex="0"
                >
                  <div class="world__thumb__wrap">
                    <div class="thumb">
                      <img :src="virtual3" alt="virtuals" />
                      <button
                        class="play-btn bg-transparent border-0"
                        @click="handleVideoModal"
                      >
                        <img :src="play" alt="img" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- {/* Time Table Tab */} -->
            <TimeTableTab :id="103" />
          </div>
          <!-- {/* Video play */} -->
          <div
            class="tab-pane fade"
            id="virtualfoot4"
            role="tabpanel"
            aria-labelledby="virtualfoot4"
            tabIndex="0"
          >
            <div class="virtual__video__wrap">
              <div v-for="itm in images" class="items">
                <div class="thumb">
                  <img :src="itm" alt="vrimg" />
                  <button
                    class="play-btn bg-transparent border-0"
                    @click="handleVideoModal"
                  >
                    <img :src="play" alt="img" />
                  </button>
                </div>
                <span>Instant Football</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.video-modal-container {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition-duration: 500ms;
}
.video-modal-overlay {
  position: absolute;
  background: rgba(93, 129, 50, 0.3) 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  transition-duration: 500ms;
}
.video-modal {
  position: fixed;
  right: 50%;
  top: 50%;
  z-index: 3;
  height: fit-content;
  transform-origin: center;
  transform: translate(50%, -50%);
  border-radius: 12px;
  background: #000;
  padding: 12px;
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.08);
  transition-duration: 500ms;
  width: 300px;
  @media (min-width: 450px) {
    width: 350px;
  }
  @media (min-width: 576px) {
    width: 430px;
  }
  @media (min-width: 768px) {
    width: 630px;
  }
  @media (min-width: 1200px) {
    width: 800px;
  }
  .video-iframe {
    width: 100%;
  }
}
.video-close-button {
  transition-duration: 300ms;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;
  display: block;
  border-radius: 100%;
  padding: 8px;
  display: flex;
  transition-duration: 300ms;
  &:hover {
    background: var(--act3);
    svg {
      color: var(--act2);
    }
  }
  @media (min-width: 576px) {
    right: -50px;
    padding: 12px;
  }
}
.show {
  visibility: visible;
  scale: 100%;
  opacity: 1;
}
.hide {
  visibility: hidden;
  scale: 0;
  opacity: 0;
}
</style>
