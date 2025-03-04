<template>
  <main class="promotion-container">
    <h1 class="promotion-title">Special Bonuses & Promotions</h1>

    <div class="promotions-grid">
      <div v-for="bonus in bonuses" :key="bonus.id" class="bonus-card">
        <img :src="bonus.image" :alt="bonus.title" class="bonus-image" />
        <div class="bonus-content">
          <h2 class="bonus-title">{{ bonus.title }}</h2>
          <p class="bonus-period">{{ bonus.period }}</p>
          <p class="bonus-description">{{ bonus.description }}</p>
          <div class="bonus-value">Up to {{ bonus.value }}</div>
          <button class="claim-button" @click="claimBonus(bonus.id)">
            Claim Bonus
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Bonus {
  id: number;
  title: string;
  period: string;
  description: string;
  value: string;
  image: string;
}

const bonuses = ref<Bonus[]>([
  {
    id: 1,
    title: "Christmas Special",
    period: "December 20 - December 31",
    description:
      "Celebrate the holidays with our special Christmas bonus package!",
    value: "$500",
    image: "/images/christmas-bonus.jpg",
  },
  {
    id: 2,
    title: "New Year Kickstart",
    period: "January 1 - January 15",
    description: "Start your year right with our New Year bonus boost!",
    value: "$300",
    image: "/images/new-year-bonus.jpg",
  },
  {
    id: 3,
    title: "Valentine's Day Special",
    period: "February 13 - February 15",
    description: "Share the love with our Valentine's Day bonus package!",
    value: "$200",
    image: "/images/valentine-bonus.jpg",
  },
]);

const claimBonus = (bonusId: number) => {
  // TODO: Implement bonus claim logic
  console.log(`Claiming bonus with ID: ${bonusId}`);
};
</script>

<style scoped>
.promotion-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  flex: 1;
}

.promotion-title {
  text-align: center;
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.bonus-card {
  background: var(--subheader);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  border: 1px solid var(--leftpreborder);
}

.bonus-card:hover {
  transform: translateY(-5px);
}

.bonus-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.bonus-content {
  padding: 1.5rem;
}

.bonus-title {
  color: var(--white);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.bonus-period {
  color: var(--textcolor);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.bonus-description {
  color: var(--white);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.bonus-value {
  color: var(--active-color);
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.claim-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--preactive);
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

.claim-button:hover {
  background: var(--pointbox);
}

@media (max-width: 1400px) {
  .promotion-container {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .promotion-title {
    font-size: 2rem;
  }

  .promotions-grid {
    grid-template-columns: 1fr;
  }

  .promotion-container {
    padding: 0.8rem;
  }
}

/* Safe area support */
@supports (padding: max(0px)) {
  .promotion-container {
    padding-left: max(2rem, env(safe-area-inset-left));
    padding-right: max(2rem, env(safe-area-inset-right));
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }
}
</style>
