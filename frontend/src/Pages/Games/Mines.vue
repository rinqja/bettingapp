<template>
  <MainLayout>
    <Header />
    <div class="mines-page">
      <nav class="game-nav">
        <div class="left-nav">
          <router-link to="/casino" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Casino
          </router-link>
        </div>
        <div class="right-nav">
          <button class="info-button" @click="showInfo = true">
            <i class="fas fa-question-circle"></i> Info
          </button>
        </div>
      </nav>
      <div class="game-container">
        <h1>Mines</h1>
        <div class="game-wrapper">
          <MinesGame />
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
          <h2 class="header">Si të luani Mines</h2>
          <div class="info-sections">
            <div class="info-section">
              <h3>Rreth Lojës</h3>
              <p>
                Mines është një lojë strategjike ku duhet të zbuloni kutitë e
                sigurta duke shmangur minat e fshehura. Sa më shumë kuti të
                sigurta të zbuloni, aq më i madh është shumëzuesi juaj!
              </p>
            </div>
            <div class="info-section">
              <h3>Rregullat e Lojës</h3>
              <ul>
                <li>Zgjidhni numrin e minave që dëshironi të luani (1-24)</li>
                <li>Vendosni shumën e bastit tuaj</li>
                <li>Klikoni në kutitë për të zbuluar çfarë fshihet</li>
                <li>Gjeni paratë për të rritur shumëzuesin</li>
                <li>Nëse zbuloni një minë, loja përfundon</li>
                <li>Mund të tërhiqeni në çdo moment për të marrë fitimet</li>
              </ul>
            </div>
            <div class="info-section">
              <h3>Shumëzuesit</h3>
              <p>
                Sa më shumë mina të vendosni në lojë dhe sa më shumë kuti të
                sigurta të zbuloni, aq më i lartë bëhet shumëzuesi. Tërhiquni në
                momentin e duhur për të maximizuar fitimet tuaja!
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
import MinesGame from "../../components/Casino/Games/Mines.vue";
import Header from "../../components/Header/Header.vue";

const showInfo = ref(false);
</script>

<style scoped>
.mines-page {
  padding: 2rem;
  min-height: calc(100vh - 60px);
}

.game-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.left-nav,
.right-nav {
  display: flex;
  align-items: center;
}

.back-link {
  color: #fff;
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

.info-button {
  background: var(--subheader);
  border: 1px solid #4caf50;
  border-radius: 8px;
  color: #4caf50;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.info-button:hover {
  background: #4caf50;
  color: var(--header);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.game-wrapper {
  background: var(--header);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
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

@media (max-width: 768px) {
  .mines-page {
    padding: 1rem;
  }

  .game-wrapper {
    padding: 1rem;
    border-radius: 16px;
  }

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .game-nav {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .mines-page {
    padding: 0.75rem;
  }

  .game-wrapper {
    padding: 0.75rem;
    border-radius: 12px;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .game-nav {
    margin-bottom: 1rem;
  }

  .back-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .mines-page {
    padding: 0.5rem;
  }

  .game-wrapper {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.25rem;
  }
}
</style>
