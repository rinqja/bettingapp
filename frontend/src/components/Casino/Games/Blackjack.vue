<template>
  <div class="blackjack-game">
    <!-- Game Stats -->
    <div class="stats-container">
      <div class="stat-box">
        <span class="stat-label">Bet Amount</span>
        <span class="stat-value">{{
          formatAmount(blackjackStore.betAmount)
        }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Last Win</span>
        <span
          class="stat-value"
          :class="{
            win: blackjackStore.lastWinAmount > 0,
            loss: blackjackStore.lastWinAmount < 0,
          }"
        >
          {{ formatAmount(blackjackStore.lastWinAmount) }}
        </span>
      </div>
    </div>

    <!-- Dealer's Area -->
    <div class="dealer-area">
      <h3 class="area-label">
        Dealer's Hand
        <span
          class="hand-total"
          v-if="blackjackStore.dealerHand.cards.length > 0"
        >
          {{ blackjackStore.dealerHand.value }}
        </span>
      </h3>
      <div class="hand-total-display">
        {{ blackjackStore.dealerHand.value }}
      </div>
      <div class="hand dealer-hand">
        <div class="stacked-cards">
          <TransitionGroup name="card">
            <div
              v-for="(card, index) in blackjackStore.dealerHand.cards"
              :key="index"
              class="card"
              :class="[
                card.suit,
                {
                  hidden: card.hidden,
                  dealing:
                    blackjackStore.isDealing &&
                    index === blackjackStore.dealerHand.cards.length - 1,
                },
              ]"
              :style="{
                left: `${index * 30}px`,
                top: `${index * 15}px`,
              }"
            >
              <template v-if="!card.hidden">
                <div class="card-value">{{ card.value }}</div>
                <div class="card-suit">{{ getSuitSymbol(card.suit) }}</div>
              </template>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <!-- Player's Area -->
    <div class="player-area">
      <h3 class="area-label">Player's Hand</h3>
      <div class="hands-container">
        <TransitionGroup name="hand">
          <div
            v-for="(hand, handIndex) in blackjackStore.playerHands"
            :key="handIndex"
            class="hand player-hand"
            :class="{
              active: handIndex === blackjackStore.currentHandIndex,
              dealing:
                blackjackStore.isDealing &&
                handIndex === blackjackStore.currentHandIndex,
            }"
          >
            <div class="hand-header">
              <span class="hand-label">Hand {{ handIndex + 1 }}</span>
              <div
                class="hand-total-display"
                :class="{
                  bust: hand.value > 21,
                  blackjack: hand.value === 21 && hand.cards.length === 2,
                }"
              >
                {{ hand.value }}
              </div>
            </div>
            <div class="stacked-cards">
              <TransitionGroup name="card">
                <div
                  v-for="(card, cardIndex) in hand.cards"
                  :key="cardIndex"
                  class="card"
                  :class="card.suit"
                  :style="{
                    left: `${cardIndex * 30}px`,
                    top: `${cardIndex * 15}px`,
                  }"
                >
                  <div class="card-value">{{ card.value }}</div>
                  <div class="card-suit">{{ getSuitSymbol(card.suit) }}</div>
                </div>
              </TransitionGroup>
            </div>
            <div class="hand-bet">{{ formatAmount(hand.bet) }}</div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Game Controls -->
    <div class="game-controls">
      <template v-if="blackjackStore.gameStatus === 'betting'">
        <div class="betting-controls">
          <div class="bet-input">
            <label>Bet Amount</label>
            <input
              type="number"
              v-model="blackjackStore.betAmount"
              min="1"
              step="1"
            />
          </div>
          <div class="quick-bets">
            <button @click="setBetAmount(1)" value="1">$1</button>
            <button @click="setBetAmount(5)" value="5">$5</button>
            <button @click="setBetAmount(10)" value="10">$10</button>
            <button @click="setBetAmount(25)" value="25">$25</button>
            <button @click="setBetAmount(50)" value="50">$50</button>
            <button @click="setBetAmount(100)" value="100">$100</button>
          </div>
          <button
            class="deal-button"
            @click="blackjackStore.startGame()"
            :disabled="blackjackStore.loading"
          >
            Deal
          </button>
        </div>
      </template>

      <template v-else-if="blackjackStore.gameStatus === 'playing'">
        <div class="action-buttons">
          <button
            @click="blackjackStore.hit()"
            :disabled="!canHit || blackjackStore.isDealing"
          >
            Hit
          </button>
          <button @click="blackjackStore.stand()" :disabled="!canAct">
            Stand
          </button>
          <button
            @click="blackjackStore.double()"
            :disabled="!blackjackStore.canDouble"
          >
            Double
          </button>
          <button
            @click="blackjackStore.split()"
            :disabled="!blackjackStore.canSplit"
          >
            Split
          </button>
        </div>
      </template>

      <template v-else-if="blackjackStore.gameStatus === 'complete'">
        <div class="result-controls">
          <button
            class="new-hand-button"
            @click="resetGame"
            :disabled="blackjackStore.loading"
          >
            New Hand
          </button>
          <button
            class="rebet-button"
            @click="rebet"
            :disabled="blackjackStore.loading"
          >
            Rebet
          </button>
        </div>
      </template>
    </div>

    <!-- Win Modal -->
    <Transition name="modal">
      <div v-if="showWinModal" class="win-modal">
        <div class="modal-content">
          <h2>{{ winModalTitle }}</h2>
          <div class="win-amount">
            {{ formatAmount(blackjackStore.lastWinAmount) }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useBlackjackStore } from "../../../stores/casino/blackjack";
import { storeToRefs } from "pinia";

const blackjackStore = useBlackjackStore();
const showWinModal = ref(false);

// Computed properties
const canHit = computed(() => {
  const currentHand =
    blackjackStore.playerHands[blackjackStore.currentHandIndex];
  return currentHand?.canHit && blackjackStore.gameStatus === "playing";
});

const canAct = computed(() => {
  return blackjackStore.gameStatus === "playing";
});

const winModalTitle = computed(() => {
  const amount = blackjackStore.lastWinAmount;
  if (amount > 0) return "WIN!";
  if (amount < 0) return "LOSS";
  return "PUSH";
});

// Watch for game completion
watch(
  () => blackjackStore.gameStatus,
  (newStatus) => {
    if (newStatus === "complete") {
      showWinModal.value = true;
      setTimeout(() => {
        showWinModal.value = false;
      }, 3000);
    }
  }
);

// Methods
const formatAmount = (amount: number) => {
  return `$${Math.abs(amount).toFixed(2)}`;
};

const setBetAmount = (amount: number) => {
  if (blackjackStore.gameStatus === "betting") {
    blackjackStore.betAmount = amount;
  }
};

const resetGame = () => {
  blackjackStore.$reset();
};

const rebet = () => {
  resetGame();
  blackjackStore.startGame();
};

const getSuitSymbol = (suit: string) => {
  switch (suit) {
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    case "spades":
      return "♠";
    default:
      return "";
  }
};
</script>

<style scoped>
.blackjack-game {
  background: #006b3e;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.stats-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.stat-box {
  background: linear-gradient(135deg, #1a1a1a, #2c3e50);
  border: 1px solid #ffd700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dealer-area,
.player-area {
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  transform-origin: center center;
  backface-visibility: hidden;
}

.card.hidden {
  background: linear-gradient(135deg, #1e488f, #1a237e);
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5L20.5 20L20 19.5L19.5 20L20 20.5zM20 0.5L20.5 0L20 -0.5L19.5 0L20 0.5zM20 40.5L20.5 40L20 39.5L19.5 40L20 40.5z' stroke='%23152456' fill='none' stroke-width='1'/%3E%3C/svg%3E");
  border: 1px solid #0d1b3f;
}

.quick-bets {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
}

.quick-bets button {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.2rem;
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Chip designs for different values */
.quick-bets button[value="1"] {
  background: linear-gradient(135deg, #f0f0f0, #d4d4d4);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #333;
  border: 8px dashed #fff;
}

.quick-bets button[value="5"] {
  background: linear-gradient(135deg, #ff4646, #dc1c1c);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(220, 28, 28, 0.3);
  border: 8px dashed #ff6b6b;
}

.quick-bets button[value="10"] {
  background: linear-gradient(135deg, #4169e1, #0000cd);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 139, 0.3);
  border: 8px dashed #6495ed;
}

.quick-bets button[value="25"] {
  background: linear-gradient(135deg, #228b22, #006400);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 100, 0, 0.3);
  border: 8px dashed #32cd32;
}

.quick-bets button[value="50"] {
  background: linear-gradient(135deg, #9932cc, #4b0082);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(75, 0, 130, 0.3);
  border: 8px dashed #ba55d3;
}

.quick-bets button[value="100"] {
  background: linear-gradient(135deg, #ffd700, #daa520);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(218, 165, 32, 0.3);
  border: 8px dashed #ffd700;
}

.quick-bets button:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.4);
}

.quick-bets button:active {
  transform: translateY(2px);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
}

.action-buttons button {
  background: linear-gradient(to bottom, #f4b13e, #ec9f24);
  border: 2px solid #c17b10;
  color: #3d1f00;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.action-buttons button:hover:not(:disabled) {
  background: linear-gradient(to bottom, #f5bb55, #f4b13e);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.win-modal {
  backdrop-filter: blur(8px);
}

.modal-content {
  background: linear-gradient(135deg, #2c3e50, #1a1a1a);
  border: 2px solid #ffd700;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.blackjack-game {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
}

.stats-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  flex: 1;
  padding: 1rem;
  background: var(--subheader);
  border-radius: 12px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--white);
}

.stat-value.win {
  color: var(--success);
  color: white;
}

.stat-value.loss {
  color: var(--danger);
}

.dealer-area,
.player-area {
  margin: 0.75rem 0;
  padding: 1.5rem;
  background: var(--subheader);
  border-radius: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.area-label {
  color: var(--white);
  margin-bottom: 1rem;
}

.hand {
  position: relative;
  padding: 0.75rem;
  padding-left: 1rem;
  background: var(--background);
  border-radius: 12px;
  border: 2px solid var(--border);
  transition: all 0.3s ease;
  min-height: 140px;
  margin-bottom: 1rem;
  flex: 1;
}

.player-hand {
  border: 2px solid transparent;
  border-radius: 12px;
}

.player-hand.active {
  border-color: var(--active-color);
}

.hand-total-display {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--header);
  color: var(--white);
  padding: 0.25rem 1rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hand-total-display.bust {
  background: var(--error);
  animation: pulse 0.5s ease-in-out;
}

.hand-total-display.blackjack {
  background: var(--success);
  animation: pulse 0.5s ease-in-out;
}

.stacked-cards {
  position: relative;
  height: 160px;
  margin: 1rem 0;
}

.card {
  position: absolute;
  width: 90px;
  height: 126px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card.hidden {
  background: linear-gradient(135deg, #1a237e, #0d47a1);
}

.card.dealing {
  animation: dealCard 0.5s ease-out;
}

@keyframes dealCard {
  0% {
    opacity: 0;
    transform: translateY(-100px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-value {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 1.3rem;
  font-weight: bold;
}

.card-suit {
  font-size: 2.5rem;
  line-height: 1;
  margin-top: 0.5rem;
}

.hearts .card-suit,
.diamonds .card-suit {
  color: #ff0000;
}

.clubs .card-suit,
.spades .card-suit {
  color: #000000;
}

.game-controls {
  margin-top: 1.5rem;
}

.betting-controls,
.action-buttons,
.result-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.bet-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bet-input input {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--subheader);
  color: var(--white);
  width: 150px;
}

.quick-bets {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: var(--active-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.deal-button,
.new-hand-button,
.rebet-button {
  background: var(--success);
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.hand.dealing {
  border-color: var(--active-color);
  box-shadow: 0 0 15px var(--active-color);
}

/* Transitions */
.card-enter-active {
  transition: all 0.5s ease-out;
}

.card-leave-active {
  transition: all 0.3s ease-in;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(-50px) scale(0.8);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0.8);
}

.hand-enter-active,
.hand-leave-active {
  transition: all 0.3s ease;
}

.hand-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.hand-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.win-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--header);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.hand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: var(--subheader);
  border-radius: 8px;
}

.hand-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@keyframes pulse {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

@media (max-width: 768px) {
  .blackjack-game {
    padding: 0.5rem;
  }

  .stats-container {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .stat-box {
    padding: 0.75rem;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .dealer-area,
  .player-area {
    padding: 1rem;
    margin: 0.5rem 0;
    min-height: 180px;
  }

  .hand {
    min-height: 120px;
  }

  .stacked-cards {
    position: relative;
    height: 140px;
    margin: 1rem 0;
  }

  .card {
    position: absolute;
    width: 60px;
    height: 84px;
  }

  .stacked-cards .card {
    transform: translate(
      calc(var(--index, 0) * 15px),
      calc(var(--index, 0) * 8px)
    );
  }

  .betting-controls {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .bet-input {
    width: 100%;
    max-width: 300px;
  }

  .bet-input input {
    width: 100%;
    padding: 0.5rem;
  }

  .quick-bets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    width: 100%;
    max-width: 300px;
  }

  .quick-bets button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .action-buttons button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .deal-button,
  .new-hand-button,
  .rebet-button {
    width: 100%;
    max-width: 300px;
    padding: 0.75rem;
    font-size: 1rem;
  }

  .modal-content {
    padding: 1.5rem;
    width: 90%;
    max-width: 300px;
  }

  .modal-content h2 {
    font-size: 1.5rem;
  }

  .win-amount {
    font-size: 1.25rem;
  }

  .card-value {
    font-size: 0.9rem;
    top: 4px;
    left: 4px;
  }

  .card-suit {
    font-size: 1.8rem;
    margin-top: 0.2rem;
  }
}

@media (max-width: 480px) {
  .stacked-cards {
    height: 120px;
  }

  .card {
    width: 50px;
    height: 70px;
  }

  .stacked-cards .card {
    transform: translate(
      calc(var(--index, 0) * 12px),
      calc(var(--index, 0) * 6px)
    );
  }

  .stat-box {
    padding: 0.5rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .stat-value {
    font-size: 1rem;
  }

  .card-value {
    font-size: 0.8rem;
    top: 3px;
    left: 3px;
  }

  .card-suit {
    font-size: 1.4rem;
    margin-top: 0.1rem;
  }
}
</style>
