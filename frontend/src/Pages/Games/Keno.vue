<template>
  <MainLayout>
    <Header />
    <div class="keno-page">
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
        <h1>Keno</h1>
        <div class="game-wrapper">
          <KenoGame />
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
          <h2 class="header">Si të luani Keno</h2>
          <div class="info-sections">
            <div class="info-section">
              <h3>Rreth Lojës</h3>
              <p>
                Keno është një lojë e thjeshtë ku duhet të zgjidhni numra nga 1
                deri në 40. Zgjidhni numrat tuaj dhe shikoni nëse përputhen me
                numrat e zgjedhur nga loja.
              </p>
            </div>
            <div class="info-section">
              <h3>Rregullat e Lojës</h3>
              <ul>
                <li>Zgjidhni minimalisht 1 dhe maksimalisht 10 numra</li>
                <li>Çdo numër duhet të jetë nga 1 deri në 40</li>
                <li>Vendosni shumën që dëshironi të luani</li>
                <li>Shtypni 'Luaj' për të filluar raundet</li>
                <li>Loja do të zgjedhë 10 numra në mënyrë të rastësishme</li>
              </ul>
            </div>
            <div class="info-section">
              <h3>Tabela e Pagesave</h3>
              <p>
                Sa më shumë numra të përputhni, aq më i madh është shumëzuesi i
                fitimit. Fitimet përcaktohen nga numri i numrave që keni
                zgjedhur dhe sa prej tyre përputhen me numrat e zgjedhur nga
                loja. Shikoni tabelën e fitimeve potenciale në lojë për
                shumëzuesit aktualë.
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
import KenoGame from "../../components/Casino/Games/Keno.vue";
import Header from "../../components/Header/Header.vue";

const showInfo = ref(false);
</script>

<style scoped>
.keno-page {
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
  color: var(--white);
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

@media (max-width: 768px) {
  .game-wrapper {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
