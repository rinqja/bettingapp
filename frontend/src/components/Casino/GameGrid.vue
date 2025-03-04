<template>
  <div class="game-grid-container">
    <!-- Featured Game Banner -->
    <div class="featured-game" v-if="currentGame === 'originals'">
      <div class="featured-content">
        <h2>Stake Originals</h2>
        <p>Experience our exclusive in-house games</p>
      </div>
    </div>

    <!-- Games Grid -->
    <div class="games-wrapper">
      <div
        v-for="game in games"
        :key="game.id"
        class="game-card"
        @click="handleGameClick(game)"
      >
        <div class="game-thumbnail">
          <img :src="game.thumbnail" :alt="game.name" />
          <div class="game-overlay">
            <button class="play-button">Play Now</button>
          </div>
        </div>
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <span class="provider">{{ game.provider }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DiagnosticCategory, TypeFlags } from "typescript";
import { computed, provide } from "vue";
import { useRouter } from "vue-router";
import minator from "../../assets/img/header/mines.jpg";
import kenotar from "../../assets/img/header/keno.jpg";
import rouletter from "../../assets/img/header/roulette.webp";
import dragon from "../../assets/img/header/dragon.jpg";
import blacki from "../../assets/img/header/blackjack.jpg";
import slotser from "../../assets/img/header/slots.jpg";
import slotseri from "../../assets/img/header/slotsi.avif";
import robot from "../../assets/img/games/robot.webp";

const router = useRouter();
const props = defineProps<{
  currentGame: string;
}>();

const emit = defineEmits(["launch-game"]);

const games = [
  {
    id: "mines",
    name: "Mines",
    provider: "Stake Originals",
    thumbnail: minator,
    type: "mines",
    category: "originals",
    path: "/casino/mines",
  },
  {
    id: "keno",
    name: "Keno",
    provider: "Stake Originals",
    thumbnail: kenotar,
    type: "keno",
    category: "originals",
    path: "/casino/keno",
  },
  {
    id: "roulette",
    name: "Roulette",
    provider: "Stake Originals",
    thumbnail: rouletter,
    type: "roulette",
    category: "originals",
    path: "/casino/roulette",
  },
  {
    id: "dragontower",
    name: "DragonTower",
    provider: "Stake Originals",
    thumbnail: dragon,
    type: "dragontower",
    category: "originals",
    path: "/casino/dragontower",
  },
  {
    id: "wheel",
    name: "Wheel",
    provider: "Stake Originals",
    thumbnail: slotseri,
    Type: "wheel",
    category: "originals",
    path: "/casino/wheel",
  },
  {
    id: "blackjack",
    name: "Blackjack",
    provider: "Stake Originals",
    thumbnail: blacki,
    type: "blackjack",
    category: "originals",
    path: "/casino/blackjack",
  },
  {
    id: "slots",
    name: "Slots",
    provider: "Stake Originals",
    thumbnail: slotser,
    type: "slots",
    category: "originals",
    path: "/casino/slots",
  },

  {
    id: "halloween-slots",
    name: "Robot Slots",
    provider: "Stake Originals",
    thumbnail: robot,
    type: "halloween-slots",
    category: "originals",
    path: "/casino/halloween-slots",
  },
  {
    id: "NewSlot",
    name: "New Slot",
    provider: "Stake Originals",
    thumbnail: slotseri,
    type: "NewSlot",
    categoryL: "originals",
    path: "/casino/NewSlot",
  },

  // ... other games
];

const handleGameClick = (game: any) => {
  if (game.path) {
    // If game has a path, use router navigation
    router.push(game.path);
  } else {
    // Otherwise emit the launch event as before
    emit("launch-game", {
      type: game.type,
      name: game.name,
    });
  }
};

const filteredGames = computed(() => {
  return games.filter((game) => game.category === props.currentGame);
});
</script>

<style scoped>
.game-grid-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.featured-game {
  height: 200px;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
}

.featured-content {
  color: var(--white);
}

.featured-content h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.featured-content p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.games-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background: var(--header);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.game-card:hover {
  transform: translateY(-4px);
}

.game-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.game-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.play-button {
  background: var(--active-color);
  color: var(--white);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.play-button:hover {
  background: var(--active-hover);
}

.game-info {
  padding: 1rem;
}

.game-info h3 {
  color: var(--white);
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.provider {
  color: var(--textcolor);
  font-size: 0.875rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .games-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .featured-game {
    height: 150px;
    padding: 1.5rem;
  }

  .featured-content h2 {
    font-size: 1.5rem;
  }

  .featured-content p {
    font-size: 1rem;
  }
}
</style>
