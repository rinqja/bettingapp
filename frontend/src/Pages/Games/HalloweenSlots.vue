<template>
  <MainLayout>
    <Header />
    <div class="game-page">
      <nav class="game-nav">
        <router-link to="/casino" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to Casino
        </router-link>
      </nav>
      <div class="game-container">
        <h1>Robo Slot</h1>
        <div class="game-wrapper">
          <HalloweenSlotsGame />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "../../Layouts/MainLayout.vue";
import Header from "../../components/Header/Header.vue";
import HalloweenSlotsGame from "../../components/Casino/Games/HalloweenSlots.vue";
</script>

<style scoped>
/* Robotic Theme Variables */

.game-page {
  padding: 2rem;
  min-height: calc(100vh - 60px);
  background: var(--cyber-dark);
  position: relative;
  overflow: hidden;
}

/* Circuit Grid Background */
.game-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--grid-color) 1px, transparent 1px) 0 0 /
      50px 50px,
    linear-gradient(0deg, var(--grid-color) 1px, transparent 1px) 0 0 / 50px
      50px;
  pointer-events: none;
}

/* Scanning Line Effect */
.game-page::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--cyber-primary),
    transparent
  );
  animation: scanline 3s linear infinite;
  opacity: 0.5;
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

.game-nav {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.back-link {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Orbitron", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--cyber-primary);
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.back-link:hover {
  color: var(--cyber-dark);
  background: var(--cyber-primary);
  box-shadow: var(--cyber-glow);
  transform: translateX(-5px);
}

.back-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(77, 238, 234, 0.2),
    transparent
  );
  transition: 0.5s;
}

.back-link:hover::before {
  left: 100%;
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.game-wrapper {
  background: var(--cyber-medium);
  border: 2px solid var(--cyber-primary);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: var(--cyber-glow), inset 0 0 30px rgba(77, 238, 234, 0.1);
  position: relative;
  overflow: hidden;
}

/* Circuit Pattern for Game Wrapper */
.game-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
        circle at 50% 50%,
        var(--grid-color) 1px,
        transparent 1px
      )
      0 0 / 30px 30px,
    linear-gradient(
        45deg,
        transparent 48%,
        var(--cyber-primary) 49%,
        transparent 51%
      )
      0 0 / 20px 20px;
  opacity: 0.1;
  pointer-events: none;
}

h1 {
  color: var(--cyber-primary);
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Orbitron", sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px var(--cyber-primary);
  position: relative;
}

/* Glowing lines under title */
h1::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--cyber-primary),
    var(--cyber-secondary),
    var(--cyber-primary),
    transparent
  );
}

@media (max-width: 768px) {
  .game-page {
    padding: 1rem;
  }

  .game-wrapper {
    padding: 1rem;
    border-width: 1px;
  }

  h1 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h1::after {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .back-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .game-wrapper::before {
    background-size: 20px 20px, 15px 15px;
  }
}
</style>
