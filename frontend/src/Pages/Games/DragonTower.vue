<template>
  <MainLayout>
    <Header />
    <div class="dragon-tower-page">
      <nav class="game-nav">
        <div class="left-nav">
          <router-link to="/casino" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Casino
          </router-link>
        </div>
        <div class="right-nav">
          <button class="info-button" @click="showInfo = true">
            <i class="fas fa-question-circle"></i>Info
          </button>
        </div>
      </nav>
      <div class="game-container">
        <h1></h1>
        <div class="game-wrapper">
          <DragonTowerGame />
        </div>
      </div>
    </div>

    <!-- Info Modal -->
    <Transition name="fade">
      <div v-if="showInfo" class="info-modal" @click="showInfo = false">
        <div class="info-content" @click.stop>
          <button class="close-button" @click="showInfo = false">
            <i class="fas fa-times"></i>
          </button>
          <h2 class="header">Si të luani Dragon Tower</h2>
          <div class="info-sections">
            <div class="info-section">
              <h3>Rregullat e Lojës</h3>
              <p>
                Dragon Tower është një lojë ku duhet të ngjitesh në kullë duke
                shmangur dragonjtë dhe duke mbledhur vezë. Sa më lart të
                ngjitesh, aq më i madh është shumëzuesi i fitimit!
              </p>
            </div>
            <div class="info-section">
              <h3>Si të Luash</h3>
              <ul>
                <li>Vendos shumën e bastit që dëshiron të luash</li>
                <li>Zgjidh nivelin e vështirësisë që të përshtatet</li>
                <li>Kliko në kutitë për të zbuluar çfarë fshihet</li>
                <li>Gjej vezët për të vazhduar lart në kullë</li>
                <li>Nëse gjen një dragon, loja përfundon</li>
                <li>Mund të tërhiqesh në çdo moment për të marrë fitimet</li>
              </ul>
            </div>
            <div class="info-section">
              <h3>Nivelet e Vështirësisë</h3>
              <ul>
                <li>E Lehtë: 4 kolona, 1 dragon në rresht (më e sigurt)</li>
                <li>Mesatare: 3 kolona, 1 dragon në rresht</li>
                <li>E Vështirë: 2 kolona, 1 dragon në rresht</li>
                <li>Eksperte: 3 kolona, 2 dragonj në rresht</li>
                <li>
                  Mjeshtër: 4 kolona, 3 dragonj në rresht (rrezik maksimal)
                </li>
              </ul>
            </div>
            <div class="info-section">
              <h3>Shpërblimet</h3>
              <p>
                Çdo herë që kalon një nivel, shumëzuesi rritet. Sa më i vështirë
                niveli, aq më të larta janë shpërblimet. Mund të tërhiqesh në
                çdo moment për të siguruar fitimin tënd!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainLayout from "../../Layouts/MainLayout.vue";
import DragonTowerGame from "../../components/Casino/Games/DragonTower.vue";
import Header from "../../components/Header/Header.vue";

const showInfo = ref(false);
</script>

<style scoped>
.dragon-tower-page {
  padding: 1rem;
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
}

.game-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  width: 100%;
}

.left-nav,
.right-nav {
  display: flex;
  align-items: center;
}

.back-link {
  color: var(--white);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
  font-size: 0.9rem;
}

.back-link:hover {
  color: var(--active-color);
}

.game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h1 {
  color: var(--white);
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

.game-wrapper {
  background: var(--header);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.info-button {
  background: var(--subheader);
  border: 1px solid #4caf50;
  border-radius: 8px;
  color: #4caf50;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  margin-right: 1rem;
}

.info-button i {
  font-size: 1.2rem;
}

.info-button:hover {
  background: #4caf50;
  color: var(--header);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.info-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.info-content {
  background: var(--header);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: var(--active-color);
}

.info-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section {
  color: var(--white);
}

.header {
  color: white;
}
.info-section h2 {
  color: var(--white);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.info-section h3 {
  color: var(--active-color);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.info-section p,
.info-section ul {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.info-section ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0 0 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Tablet and up */
@media (min-width: 768px) {
  .dragon-tower-page {
    padding: 2rem;
  }

  .game-nav {
    margin-bottom: 2rem;
    padding: 0;
  }

  .back-link {
    font-size: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .game-wrapper {
    padding: 2rem;
    border-radius: 20px;
  }
}

/* Mobile landscape */
@media (max-height: 600px) and (orientation: landscape) {
  .dragon-tower-page {
    padding: 0.5rem;
  }

  .game-nav {
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .game-wrapper {
    padding: 0.5rem;
  }
}

/* Small mobile devices */
@media (max-width: 360px) {
  .dragon-tower-page {
    padding: 0.5rem;
  }

  .game-nav {
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .game-wrapper {
    padding: 0.5rem;
    border-radius: 8px;
  }
}

/* Handle notch devices */
@supports (padding-top: env(safe-area-inset-top)) {
  .dragon-tower-page {
    padding-top: calc(1rem + env(safe-area-inset-top));
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    padding-left: calc(1rem + env(safe-area-inset-left));
    padding-right: calc(1rem + env(safe-area-inset-right));
  }
}

@media (max-width: 480px) {
  .info-content {
    padding: 1.5rem;
  }

  .info-section h3 {
    font-size: 1.1rem;
  }

  .info-section p,
  .info-section ul {
    font-size: 0.9rem;
  }
}
</style>
