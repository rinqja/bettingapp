<template>
  <div>
    <!-- modal-video start -->
    <div :class="`video-modal-container ${isOpen ? 'show' : 'hide'}`">
      <div @click="handleVideoModal" class="video-modal-overlay"></div>
      <div :class="`video-modal ${isOpen ? 'show' : 'hide'}`">
        <iframe
          v-if="isOpen"
          :src="videoSrc"
          class="video video-iframe aspect-video w-full"
          allowfullscreen
        ></iframe>
        <button @click="handleVideoModal" class="video-close-button">
          <i class="icon-cross"></i>
        </button>
      </div>
    </div>
    <!-- modal video end -->
    <div class="casino__box">
      <img :src="img" alt="game" />

      <RouterLink v-if="live" to="#" class="live"> Live </RouterLink>

      <div class="casino__overlay">
        <button
          class="play-btn bg-transparent border-0"
          @click="handleVideoModal"
        >
          <img :src="play" alt="img" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import play from "../../assets/img/games/play.png";

const isOpen = ref(false);
const videoSrc = ref("");

defineProps<{
  img: string;
  live?: boolean;
}>();

const handleVideoModal = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    videoSrc.value = `https://www.youtube.com/embed/orf582WJV_c?autoplay=1`;
  } else {
    videoSrc.value = "";
  }
};

watch(isOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "auto";
});
</script>

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
