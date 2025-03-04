<template>
  <MainLayout>
    <Header />
    <div class="game-page">
      <nav class="game-nav">
        <div class="left-nav">
          <router-link to="/casino" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Casino
          </router-link>
        </div>
      </nav>
      <div class="game-container">
        <h1></h1>
        <div class="game-wrapper">
          <SlotGame />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "../../Layouts/MainLayout.vue";
import Header from "../../components/Header/Header.vue";
import SlotGame from "../../components/Casino/Games/SlotGame.vue";
import starsBackground from "../../assets/img/header/stars.avif";

// Make stars background available to template
const backgroundStyle = {
  backgroundImage: `url(${starsBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
</script>

<style scoped>
.game-page {
  padding: 2rem;
  min-height: calc(100vh - 60px);
  background: var(--background);
  position: relative;
  display: flex;
  flex-direction: column;
}

.game-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: v-bind("backgroundStyle.backgroundImage");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

.game-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--active-color);
}

.game-wrapper {
  background: linear-gradient(45deg, #2b3dbb, #4657e8);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(70, 87, 232, 0.3),
    inset 0 0 80px rgba(255, 255, 255, 0.1);
  flex: 1;
  display: flex;
  overflow: hidden;
}

h1 {
  color: var(--white);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .game-page {
    padding: 1rem;
  }

  .game-wrapper {
    padding: 1rem;
    border-radius: 16px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .game-page {
    padding: 0.75rem;
  }

  .game-wrapper {
    padding: 0.75rem;
    border-radius: 12px;
  }

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
}

/* Handle notch devices */
@supports (padding-top: env(safe-area-inset-top)) {
  .game-page {
    padding-top: calc(1rem + env(safe-area-inset-top));
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    padding-left: calc(1rem + env(safe-area-inset-left));
    padding-right: calc(1rem + env(safe-area-inset-right));
  }
}
</style>
