<template>
  <!-- Add class to root element for scoping -->
  <div class="robo-slots">
    <div class="robot-slots-page">
      <div id="slot">
        <!-- Update bet controls with store methods -->
        <div class="bet-controls mobile-controls">
          <button
            @click="halloweenSlotsStore.decreaseBet"
            :disabled="halloweenSlotsStore.isSpinning"
          >
            -
          </button>
          <input
            type="number"
            v-model.number="halloweenSlotsStore.betAmount"
            min="1"
            max="50"
            :disabled="halloweenSlotsStore.isSpinning"
          />
          <button
            @click="halloweenSlotsStore.increaseBet"
            :disabled="halloweenSlotsStore.isSpinning"
          >
            +
          </button>
        </div>

        <div id="jackpot">Jackpot: <span id="jp">250 X</span></div>
        <div id="reels">
          <div class="reel"></div>
          <div class="reel"></div>
          <div class="reel"></div>
          <div class="reel"></div>
          <div class="reel"></div>
        </div>
        <!-- Update controls with responsive class -->
        <div id="controls" class="mobile-controls">
          <button
            type="button"
            id="spin"
            @click="handleSpin"
            :disabled="!halloweenSlotsStore.canSpin"
          >
            SPIN
          </button>
          <button type="button" id="paytable-button">PAYTABLE</button>
        </div>
      </div>

      <div id="paytable" class="hidden">
        <div id="paytable-close" @click="closePaytable">&times;</div>
        <div class="paytable-content">
          <h2>Paytable</h2>
          <div class="symbol-pays">
            <div class="pay-row">
              <img
                src="../../../assets/symbols/death_star.svg"
                alt="Death Star"
              />
              <div class="pays">
                <div>5x = 250 (50 × 5x )</div>
                <div>4x = 150 (50 × 3x )</div>
                <div>3x = 50 (50 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img
                src="../../../assets/symbols/darth_vader.svg"
                alt="Darth Vader"
              />
              <div class="pays">
                <div>5x = 175 (35 × 5x )</div>
                <div>4x = 105 (35 × 3x )</div>
                <div>3x = 35 (35 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/yoda.svg" alt="Yoda" />
              <div class="pays">
                <div>5x = 125 (25 × 5x )</div>
                <div>4x = 75 (25 × 3x )</div>
                <div>3x = 25 (25 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/falcon.svg" alt="Falcon" />
              <div class="pays">
                <div>5x = 85 (17 × 5x )</div>
                <div>4x = 51 (17 × 3x )</div>
                <div>3x = 17 (17 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/at_at.svg" alt="AT-AT" />
              <div class="pays">
                <div>5x = 60 (12 × 5x )</div>
                <div>4x = 36 (12 × 3x )</div>
                <div>3x = 12 (12 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/tie_ln.svg" alt="TIE Fighter" />
              <div class="pays">
                <div>5x = 30 (6 × 5x )</div>
                <div>4x = 18 (6 × 3x )</div>
                <div>3x = 6 (6 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/c3po.svg" alt="C-3PO" />
              <div class="pays">
                <div>5x = 25 (5 × 5x )</div>
                <div>4x = 15 (5 × 3x )</div>
                <div>3x = 5 (5 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img src="../../../assets/symbols/r2d2.svg" alt="R2-D2" />
              <div class="pays">
                <div>5x = 20 (4 × 5x )</div>
                <div>4x = 12 (4 × 3x )</div>
                <div>3x = 4 (4 × 1x )</div>
              </div>
            </div>
            <div class="pay-row">
              <img
                src="../../../assets/symbols/stormtrooper.svg"
                alt="Stormtrooper"
              />
              <div class="pays">
                <div>5x = 10 (2 × 5x )</div>
                <div>4x = 6 (2 × 3x )</div>
                <div>3x = 2 (2 × 1x )</div>
              </div>
            </div>
          </div>
          <div class="-info">
            <h3></h3>
            <p>3 matching symbols = 1x multiplier</p>
            <p>4 matching symbols = 3x multiplier</p>
            <p>5 matching symbols = 5x multiplier (Jackpot!)</p>
            <p class="note">* All wins are multiplied by your bet amount</p>
            <p class="rarity-note">Rarer symbols have higher payouts!</p>
          </div>
        </div>
      </div>

      <!-- Add stats display -->

      <!-- Modified Win Modal -->
      <Transition name="modal">
        <div v-if="showWinModal" class="win-modal">
          <div class="modal-content">
            <h2>WIN!</h2>
            <div class="matched-symbols">
              <img
                :src="symbolImages[matchedSymbol]"
                :alt="matchedSymbol"
                class="winning-symbol"
              />
              <div class="match-count">{{ matchCount }} matches!</div>
            </div>
            <div class="win-amount">{{ currentWin }}x</div>
            <div class="multiplier">Multiplier!</div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { useHalloweenSlotsStore } from "../../../stores/casino/halloweenSlots";

// Static imports for all symbols
import atAt from "../../../assets/symbols/at_at.svg";
import c3po from "../../../assets/symbols/c3po.svg";
import darthVader from "../../../assets/symbols/darth_vader.svg";
import deathStar from "../../../assets/symbols/death_star.svg";
import falcon from "../../../assets/symbols/falcon.svg";
import r2d2 from "../../../assets/symbols/r2d2.svg";
import stormtrooper from "../../../assets/symbols/stormtrooper.svg";
import tieLn from "../../../assets/symbols/tie_ln.svg";
import yoda from "../../../assets/symbols/yoda.svg";

const symbolImages = {
  at_at: atAt,
  c3po: c3po,
  darth_vader: darthVader,
  death_star: deathStar,
  falcon: falcon,
  r2d2: r2d2,
  stormtrooper: stormtrooper,
  tie_ln: tieLn,
  yoda: yoda,
};

const cache = {};

class SymbolClass {
  constructor(name = SymbolClass.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = symbolImages[name];
      cache[name] = this.img;
    }
  }

  static preload() {
    SymbolClass.symbols.forEach((symbol) => new SymbolClass(symbol));
  }

  static get symbols() {
    return [
      "at_at",
      "c3po",
      "darth_vader",
      "death_star",
      "falcon",
      "r2d2",
      "stormtrooper",
      "tie_ln",
      "yoda",
    ];
  }

  // Add weights for each symbol (higher number = more frequent)
  static get weights() {
    return {
      death_star: 1, // Rarest (1% chance)
      darth_vader: 2, // Very rare (2% chance)
      yoda: 3, // Rare (3% chance)
      falcon: 5, // Uncommon (5% chance)
      at_at: 8, // Uncommon (8% chance)
      tie_ln: 12, // Common (12% chance)
      c3po: 18, // Common (18% chance)
      r2d2: 23, // Very common (23% chance)
      stormtrooper: 28, // Most common (28% chance)
    };
  }

  // Modified random method to use weights
  static random() {
    // Calculate total weight
    const totalWeight = Object.values(this.weights).reduce((a, b) => a + b, 0);

    // Get a random number between 0 and total weight
    let random = Math.random() * totalWeight;

    // Find the symbol based on weight
    for (const symbol of this.symbols) {
      random -= this.weights[symbol];
      if (random <= 0) {
        return symbol;
      }
    }

    // Fallback (shouldn't reach here)
    return this.symbols[0];
  }
}

class Reel {
  constructor(reelContainer, idx, initialSymbols) {
    this.reelContainer = reelContainer;
    this.idx = idx;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    // Setup the animation
    this.animation = this.symbolContainer.animate(
      [
        { top: 0, filter: "blur(0)" },
        { filter: "blur(2px)", offset: 0.5 },
        {
          top: `calc((${Math.floor(this.factor) * 10} / 3) * -100% - (${
            Math.floor(this.factor) * 10
          } * 3px))`,
          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 1000,
        easing: "ease-in-out",
      }
    );
    this.animation.cancel();

    initialSymbols.forEach((symbol) => {
      const s = new SymbolClass(symbol);
      this.symbolContainer.appendChild(s.img);
    });
  }

  get factor() {
    // Speed factor for each reel
    return 1 + Math.pow(this.idx / 2, 2);
  }

  renderSymbols(nextSymbols) {
    const fragment = document.createDocumentFragment();
    for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
      const icon = new SymbolClass(
        i >= 10 * Math.floor(this.factor) - 2
          ? nextSymbols[i - Math.floor(this.factor) * 10]
          : undefined
      );
      fragment.appendChild(icon.img);
    }
    this.symbolContainer.appendChild(fragment);
  }

  spin() {
    const animationPromise = new Promise(
      (resolve) => (this.animation.onfinish = resolve)
    );
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, this.factor * 1000)
    );

    this.animation.cancel();
    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      const max = this.symbolContainer.children.length - 3;
      for (let i = 0; i < max; i++) {
        this.symbolContainer.firstChild.remove();
      }
    });
  }
}

class Slot {
  constructor(domElement, config = {}) {
    SymbolClass.preload();

    // Default: 5 reels, each showing 3 symbols of "death_star"
    this.currentSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.nextSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.container = domElement;

    // Create reel objects
    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) => {
        return new Reel(reelContainer, idx, this.currentSymbols[idx]);
      }
    );

    // Set up buttons
    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;

    // Updated symbol base values (halved)
    this.symbolValues = {
      death_star: 50,
      darth_vader: 35,
      yoda: 25,
      falcon: 17,
      at_at: 12,
      tie_ln: 6,
      c3po: 5,
      r2d2: 4,
      stormtrooper: 2,
    };

    // Updated multipliers for better progression
    this.matchMultipliers = {
      3: 1,
      4: 3,
      5: 5,
    };
  }

  spin() {
    // NEW: Prevent spin if bet is not above 0 using config callback.
    if (this.config.getBetAmount && this.config.getBetAmount() <= 0) {
      alert("Bet must be above 0");
      return Promise.resolve();
    }
    // Move nextSymbols -> currentSymbols, generate new nextSymbols
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [SymbolClass.random(), SymbolClass.random(), SymbolClass.random()],
      [SymbolClass.random(), SymbolClass.random(), SymbolClass.random()],
      [SymbolClass.random(), SymbolClass.random(), SymbolClass.random()],
      [SymbolClass.random(), SymbolClass.random(), SymbolClass.random()],
      [SymbolClass.random(), SymbolClass.random(), SymbolClass.random()],
    ];

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;
    if (this.config.onSpinStart) {
      this.config.onSpinStart(symbols);
    }
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    const wins = this.checkWins(symbols);
    if (wins.length > 0) {
      wins.forEach((win) => {
        if (win.isJackpot) {
          console.log("🎰 JACKPOT! 🎰", win);
          // Reset jackpot
          document.getElementById("jp").textContent = "0";
        } else {
          console.log(
            `Winner! ${win.matches} ${win.symbol}s - ${win.value} credits (${win.multiplier}x multiplier)`
          );
        }
      });
    }

    if (this.config.onSpinEnd) {
      this.config.onSpinEnd(symbols);
    }

    // Autoplay if checked
    // if (this.autoPlayCheckbox.checked) {
    //   return window.setTimeout(() => this.spin(), 200);
    // }
  }

  checkWins(symbols) {
    const wins = [];

    // Get all symbols from the second row (index 1)
    const secondRowSymbols = symbols.map((reel) => reel[1]);

    // Remove previous highlights
    document.querySelectorAll(".reel .icons img").forEach((img) => {
      img.classList.remove("matched");
    });

    // Count occurrences of each symbol
    const symbolCounts = {};
    secondRowSymbols.forEach((symbol) => {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });

    // Check for matches and highlight
    Object.entries(symbolCounts).forEach(([symbol, count]) => {
      // Changed condition to only count 3 or more matches
      if (count >= 3) {
        const baseMultiplier = this.symbolValues[symbol];
        const matchMultiplier = this.matchMultipliers[count];
        const totalMultiplier = baseMultiplier * matchMultiplier;

        // Highlight matching symbols
        const reelElements = document.querySelectorAll(".reel");
        reelElements.forEach((reel, index) => {
          if (secondRowSymbols[index] === symbol) {
            // Get the middle symbol (index 1) from each reel
            const symbols = reel.querySelectorAll(".icons img");
            if (symbols[1]) {
              symbols[1].classList.add("matched");
            }
          }
        });

        wins.push({
          symbol,
          matches: count,
          multiplier: matchMultiplier,
          totalMultiplier,
        });
      }
    });

    return wins;
  }
}

export default {
  name: "HalloweenSlots",
  setup() {
    const halloweenSlotsStore = useHalloweenSlotsStore();
    return { halloweenSlotsStore };
  },
  data() {
    return {
      betAmount: 1,
      currentWin: 0,
      showWinModal: false,
      winMessage: "",
      winMultiplier: 0,
      balance: 1000,
      slotInstance: null,
      matchCount: 0,
      matchedSymbol: "",
      currentSymbols: [],
      symbolImages, // Add the symbolImages object to data
    };
  },
  methods: {
    async handleSpin() {
      if (!this.halloweenSlotsStore.canSpin) return;

      try {
        await this.halloweenSlotsStore.startGame();
      } catch (error) {
        console.error("Error during spin:", error);
      }
    },
    increaseBet() {
      if (this.betAmount < 50) this.betAmount++;
    },
    decreaseBet() {
      if (this.betAmount > 1) this.betAmount--;
    },
    calculateWin(matchCount, symbol) {
      const baseValue = this.slotInstance.symbolValues[symbol];
      // NEW: Multiply win amount with betAmount so win equals baseValue * matchCount * betAmount
      return baseValue * matchCount * this.betAmount;
    },
    showWinningModal(matches, symbol, multiplier) {
      this.currentWin = multiplier;
      this.winMultiplier = matches;
      this.matchCount = matches;
      this.matchedSymbol = symbol;
      this.showWinModal = true;
      // Auto-hide modal after 3 seconds
      setTimeout(() => {
        this.showWinModal = false;
      }, 3000);
    },
    closeWinModal() {
      // NEW: Update balance without multiplying by betAmount again.
      this.balance += this.currentWin;
      this.showWinModal = false;
      this.currentWin = 0;
      this.winMultiplier = 0;
    },
    closePaytable() {
      document.getElementById("paytable").classList.add("hidden");
    },
  },
  mounted() {
    /**
     * Replaces your `index.js` code.
     * Once the component is mounted, we can access the DOM.
     */
    const config = {
      inverted: false, // optional
      onSpinStart: (symbols) => {
        console.log("onSpinStart", symbols);
        this.showWinModal = false;
        this.balance -= this.betAmount;
      },
      onSpinEnd: (symbols) => {
        console.log("onSpinEnd", symbols);
        // Check middle row for wins
        const middleRow = symbols.map((reel) => reel[1]);
        const firstSymbol = middleRow[0];
        let matchCount = 1;

        // Count matches from left to right
        for (let i = 1; i < middleRow.length; i++) {
          if (middleRow[i] === firstSymbol) {
            matchCount++;
          } else {
            break;
          }
        }

        // Show win modal for 2 or more matches
        if (matchCount >= 2) {
          const winAmount = this.calculateWin(matchCount, firstSymbol);
          this.showWinningModal(matchCount, firstSymbol, winAmount);
        }

        const wins = this.slotInstance.checkWins(symbols);
        this.currentSymbols = symbols;

        if (wins.length > 0) {
          const highestWin = wins.reduce((prev, current) =>
            current.totalMultiplier > prev.totalMultiplier ? current : prev
          );

          this.showWinningModal(
            highestWin.matches,
            highestWin.symbol,
            highestWin.totalMultiplier
          );
        }
      },
      // NEW: Provide a callback to return the current betAmount.
      getBetAmount: () => this.betAmount,
    };

    // Initialize slot
    const slotInstance = new Slot(document.getElementById("slot"), config);
    this.slotInstance = slotInstance;

    // Add paytable toggle functionality
    const paytableButton = document.getElementById("paytable-button");
    const paytable = document.getElementById("paytable");
    paytableButton.addEventListener("click", () => {
      paytable.classList.toggle("hidden");
    });

    // Close paytable when clicking outside content
    paytable.addEventListener("click", (e) => {
      if (e.target === paytable) {
        paytable.classList.add("hidden");
      }
    });

    /**
     * For a real Vue component, you might prefer
     * using Vue's reactivity or `refs` instead of direct `document.getElementById`.
     */
  },
};
</script>

<style>
/* Remove global font import and add it scoped to the component */
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap");

/* Scope all styles to the robo-slots class */
.robo-slots {
  /* Add font-family to root element */
  font-family: "Orbitron", sans-serif;
}

.robo-slots button,
.robo-slots input,
.robo-slots #jackpot,
.robo-slots .paytable-content,
.robo-slots .modal-content {
  font-family: "Orbitron", sans-serif;
}
.paytable-content {
  margin-top: 120px;
}

/* Update variables to be scoped */
.robo-slots {
  --neon-primary: #00f7ff;
  --neon-secondary: #7b2efc;
  --dark-bg: #0a0b1a;
  --metal-light: #2a2d45;
  --metal-dark: #171928;
  --glow-primary: 0 0 15px rgba(0, 247, 255, 0.4);
  --glow-secondary: 0 0 15px rgba(123, 46, 252, 0.4);
  --metal-gradient: linear-gradient(
    135deg,
    var(--metal-dark),
    var(--metal-light)
  );
}

/* Main Container */
.robo-slots #slot {
  background: var(--dark-bg);
  border: 2px solid var(--neon-primary);
  box-shadow: var(--glow-primary);
  position: relative;
  overflow: hidden;
}

/* Circuit Board Pattern Overlay */
.robo-slots #slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      90deg,
      transparent 99%,
      var(--neon-primary) 99.5%
    ),
    linear-gradient(0deg, transparent 99%, var(--neon-primary) 99.5%);
  background-size: 30px 30px;
  opacity: 0.1;
  pointer-events: none;
}

/* Scanning Line Animation */
.robo-slots #slot::after {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--neon-primary),
    transparent
  );
  animation: scanning 3s linear infinite;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes scanning {
  0% {
    top: -100%;
  }
  100% {
    top: 200%;
  }
}

/* Updated Controls Styling */
.robo-slots .bet-controls,
.robo-slots #controls {
  background: var(--metal-gradient);
  border: 1px solid var(--neon-primary);
  box-shadow: var(--glow-primary);
  padding: 15px;
  border-radius: 10px;
}

/* Button Styling */
.robo-slots button {
  font-family: "Orbitron", sans-serif;
  background: var(--metal-dark);
  border: 1px solid var(--neon-primary);
  color: var(--neon-primary);
  text-shadow: 0 0 5px var(--neon-primary);
  transition: all 0.3s ease;
}

.robo-slots button:hover:not(:disabled) {
  background: var(--neon-primary);
  color: var(--dark-bg);
  box-shadow: var(--glow-primary);
  transform: scale(1.05);
}

/* Spin Button Special Styling */
.robo-slots #spin {
  background: linear-gradient(
    45deg,
    var(--neon-primary),
    var(--neon-secondary)
  );
  border: none;
  color: var(--dark-bg);
  font-weight: 700;
  letter-spacing: 2px;
}

/* Input Styling */
.robo-slots input[type="number"] {
  font-family: "Orbitron", sans-serif;
  background: var(--metal-dark);
  border: 1px solid var(--neon-primary);
  color: var(--neon-primary);
  text-shadow: 0 0 5px var(--neon-primary);
}

/* Matched Symbols Animation */
.robo-slots .reel > .icons > img.matched {
  animation: futuristicPulse 1.5s infinite;
  box-shadow: 0 0 20px var(--neon-secondary);
}

@keyframes futuristicPulse {
  0% {
    box-shadow: 0 0 20px var(--neon-primary);
  }
  50% {
    box-shadow: 0 0 30px var(--neon-secondary);
  }
  100% {
    box-shadow: 0 0 20px var(--neon-primary);
  }
}

/* Modal Updates */
.robo-slots .win-modal .modal-content {
  background: var(--metal-gradient);
  border: 2px solid var(--neon-secondary);
  box-shadow: var(--glow-secondary);
  font-family: "Orbitron", sans-serif;
}

/* Enhanced Mobile Responsiveness */
@media screen and (max-width: 768px) {
  .robo-slots #slot {
    border-width: 1px;
    border-radius: 10px;
  }

  .robo-slots .bet-controls,
  .robo-slots #controls {
    padding: 10px;
    gap: 8px;
  }

  .robo-slots button {
    padding: 12px 20px;
    font-size: 0.9em;
  }

  .robo-slots #spin {
    width: 100%;
    max-width: none;
    margin: 5px 0;
  }

  .robo-slots .mobile-controls {
    flex-direction: column;
    align-items: stretch;
  }
}

@media screen and (max-width: 480px) {
  .robo-slots #slot {
    padding: 10px;
  }

  .robo-slots button {
    padding: 10px 15px;
    font-size: 0.8em;
  }

  .robo-slots input[type="number"] {
    width: 60px;
    padding: 8px;
    font-size: 0.9em;
  }

  .robo-slots .bet-controls {
    flex-direction: row;
    justify-content: center;
  }

  .robo-slots #controls {
    gap: 5px;
  }

  .robo-slots label {
    font-size: 0.8em;
  }
}

/* Body and background */

/* #slot container styling */
.robo-slots #slot {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: #34495e;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Jackpot styling */
.robo-slots #jackpot {
  color: #d5ad6d;
  font-size: 2em;
  text-align: center;
  text-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
  margin-bottom: 20px;
}

/* Reels container */
.robo-slots #reels {
  display: flex;

  background: #2c3e50;
  border-radius: 10px;
  /* 
     Responsive sizing if desired:
     width: 100vw;
     height: calc((3 / 5) * 100vw);
     max-height: calc(90vh - 50px - 40px);
     max-width: calc((5 / 3) * (90vh - 50px - 40px));
  */
}

/* Individual reel styling */
.robo-slots .reel {
  flex: 1;
  background: #1a1a1a;
  border-radius: 5px;
  overflow: hidden;
  height: 300px;
  position: relative;
}

/* Icons wrapper inside each reel */
.robo-slots .reel > .icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

/* Symbol (img) styling inside reels */
.robo-slots .reel > .icons > img {
  width: 100%;
  height: 100px;
  object-fit: contain;
  /* GPU acceleration */
  transform: translate3d(0, 0, 0);
}

/* Inverted mode (if config.inverted = true) */
.robo-slots #slot.inverted .reel {
  transform: scaleY(-1);
}

.robo-slots #slot.inverted .reel > .icons > img {
  transform: scaleY(-1);
}

/* Controls bar */
.robo-slots #controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 10px;
}

/* Spin button */
.robo-slots #spin {
  padding: 15px 40px;
  font-size: 1.2em;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.robo-slots #spin:hover {
  background: #c0392b;
}

.robo-slots #spin:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

/* Autoplay checkbox styling */
.robo-slots #autoplay {
  margin-right: 5px;
}

/* Label styling */
.robo-slots label {
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* PAYTABLE overlay */
.robo-slots #paytable {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.robo-slots #paytable.hidden {
  display: none;
}

.robo-slots .paytable-content {
  background: #2c3e50;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
}

.robo-slots .symbol-pays {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.robo-slots .pay-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.robo-slots .pay-row img {
  width: 50px;
  height: 50px;
}

.robo-slots .pays {
  font-size: 0.9rem;
}

.robo-slots .multiplier-info {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
}

/* Paytable button */
.robo-slots #paytable-button {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  background: #34495e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Win Modal */
.robo-slots .win-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.robo-slots .win-content {
  background: #2c3e50;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  color: white;
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.robo-slots .win-amount {
  font-size: 2.5em;
  color: #ffd700;
  margin: 1rem 0;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.robo-slots .win-multiplier {
  font-size: 1.8em;
  color: #2ecc71;
  margin: 0.5rem 0;
}

.robo-slots .collect-btn {
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  font-size: 1.2em;
  background: #e74c3c;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.robo-slots .collect-btn:hover {
  background: #c0392b;
  transform: scale(1.05);
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.robo-slots .bet-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
}
.robo-slots .bet-controls input {
  width: 60px;
  text-align: center;
  font-size: 1.2em;
  padding: 5px;
}

/* Add Keno-style modal animations */
.robo-slots .modal-enter-active,
.robo-slots .modal-leave-active {
  transition: opacity 0.3s ease;
}

.robo-slots .modal-enter-from,
.robo-slots .modal-leave-to {
  opacity: 0;
}

.robo-slots .modal-content {
  background: var(--header, #2c3e50);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 200px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.robo-slots .modal-content h2 {
  color: var(--success, #20e920);
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px rgba(32, 233, 32, 0.5);
}

.robo-slots .win-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--white, #ffffff);
  margin-bottom: 0.3rem;
}

.robo-slots .multiplier {
  font-size: 1.2rem;
  color: var(--text-secondary, #95a5a6);
}

/* Add new styles for matched symbols */
.robo-slots .reel > .icons > img.matched {
  animation: pulse 0.5s ease-in-out;
  box-shadow: 0 0 20px rgba(32, 233, 32, 0.6);
  border: 2px solid var(--success, #20e920);
  border-radius: 8px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Add new styles */
.robo-slots .stats-container {
  background: var(--header);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  color: white;
}

.robo-slots .match-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1.2rem;
}

.robo-slots .winning-symbol {
  width: 60px;
  height: 60px;
  margin: 1rem 0;
}

.robo-slots .matched-symbols {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}

.robo-slots .match-count {
  color: var(--success);
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.robo-slots .note {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 1rem;
  font-style: italic;
}

.robo-slots .rarity-note {
  font-size: 0.8em;
  color: #e74c3c;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Add new responsive styles */
.robo-slots .mobile-controls {
  flex-wrap: wrap;
}

/* Mobile responsive adjustments */
@media screen and (max-width: 768px) {
  .robo-slots .mobile-controls {
    gap: 10px;
  }

  .robo-slots #spin {
    width: 100%;
    max-width: 200px;
    padding: 12px 20px;
  }

  .robo-slots .bet-controls input {
    width: 50px;
    font-size: 1em;
  }

  .robo-slots .bet-controls button {
    padding: 8px 15px;
    font-size: 1.2em;
  }

  .robo-slots #paytable-button {
    padding: 8px 15px;
    font-size: 0.9em;
  }
}

/* Small mobile devices */
@media screen and (max-width: 480px) {
  .robo-slots .mobile-controls {
    gap: 8px;
  }

  .robo-slots #spin {
    font-size: 1em;
    padding: 10px 15px;
  }

  .robo-slots .bet-controls {
    margin-bottom: 5px;
  }

  .robo-slots .bet-controls input {
    width: 40px;
    font-size: 0.9em;
  }

  .robo-slots .bet-controls button {
    padding: 6px 12px;
    font-size: 1em;
  }

  .robo-slots #paytable-button {
    padding: 6px 12px;
    font-size: 0.8em;
  }

  .robo-slots label {
    font-size: 0.9em;
  }
}

/* Robot Theme Variables */
.robo-slots {
  --robot-primary: #4deeea;
  --robot-secondary: #2fc5ff;
  --robot-accent: #7b2efc;
  --metal-dark: #0d1117;
  --metal-medium: #161b22;
  --metal-light: #21262d;
  --circuit-color: rgba(77, 238, 234, 0.1);
  --metal-shine: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    transparent 50%
  );
  --bolt-gradient: linear-gradient(
    45deg,
    var(--robot-primary),
    var(--robot-secondary)
  );
}

/* Enhanced Main Container */
.robo-slots #slot {
  background: var(--metal-dark);
  border: 2px solid var(--robot-primary);
  box-shadow: 0 0 20px rgba(77, 238, 234, 0.2),
    inset 0 0 30px rgba(77, 238, 234, 0.1);
  position: relative;
  overflow: hidden;
}

/* Robotic Panel Effect */
.robo-slots #slot::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--circuit-color) 1px, transparent 1px)
      0 0 / 20px 20px,
    linear-gradient(0deg, var(--circuit-color) 1px, transparent 1px) 0 0 / 20px
      20px,
    radial-gradient(
        circle at 50% 50%,
        var(--circuit-color) 1px,
        transparent 1px
      )
      0 0 / 30px 30px;
  pointer-events: none;
}

/* Metallic Reels Container */
.robo-slots #reels {
  background: var(--metal-medium);
  border: 1px solid var(--robot-primary);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(77, 238, 234, 0.3);
  position: relative;
  overflow: hidden;
}

/* Enhanced Reel Styling */
.robo-slots .reel {
  background: var(--metal-dark);
  border: 1px solid var(--robot-secondary);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
  position: relative;
}

/* Metallic Shine Effect on Reels */
.robo-slots .reel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--metal-shine);
  pointer-events: none;
}

/* Robotic Border Effect */
.robo-slots .reel::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: 1px solid rgba(77, 238, 234, 0.1);
  pointer-events: none;
}

/* Enhanced Jackpot Display */
.robo-slots #jackpot {
  font-family: "Orbitron", sans-serif;
  color: var(--robot-primary);
  text-shadow: 0 0 10px var(--robot-primary);
  background: var(--metal-medium);
  border: 1px solid var(--robot-primary);
  border-radius: 5px;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

/* Scanning Effect for Jackpot */
.robo-slots #jackpot::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--robot-primary),
    transparent
  );
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    top: -100%;
  }
  100% {
    top: 200%;
  }
}

/* Robotic Controls */
.robo-slots .bet-controls,
.robo-slots #controls {
  background: var(--metal-medium);
  border: 1px solid var(--robot-primary);
  box-shadow: 0 0 15px rgba(77, 238, 234, 0.2);
  position: relative;
  overflow: hidden;
}

/* Circuit Pattern for Controls */
.robo-slots .bet-controls::before,
.robo-slots #controls::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
        45deg,
        transparent 48%,
        var(--robot-primary) 49%,
        transparent 51%
      )
      0 0 / 10px 10px,
    linear-gradient(
        -45deg,
        transparent 48%,
        var(--robot-primary) 49%,
        transparent 51%
      )
      0 0 / 10px 10px;
  opacity: 0.1;
  pointer-events: none;
}

/* Enhanced Button Styling */
.robo-slots button {
  background: var(--metal-dark);
  border: 1px solid var(--robot-primary);
  color: var(--robot-primary);
  text-shadow: 0 0 5px var(--robot-primary);
  font-family: "Orbitron", sans-serif;
  position: relative;
  overflow: hidden;
}

/* Special Spin Button */
.robo-slots #spin {
  background: var(--bolt-gradient);
  border: none;
  color: var(--metal-dark);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.robo-slots #spin::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  animation: pulse 2s linear infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

/* Keep existing responsive styles */

/* Enhanced Robotic Paytable */
.robo-slots #paytable {
  background: rgba(13, 17, 23, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--robot-primary);
}

.robo-slots .paytable-content {
  background: var(--metal-dark);
  border: 2px solid var(--robot-primary);
  box-shadow: 0 0 30px rgba(77, 238, 234, 0.2),
    inset 0 0 20px rgba(77, 238, 234, 0.1);
  font-family: "Orbitron", sans-serif;
  position: relative;
  overflow: hidden;
}

/* Circuit Pattern for Paytable */
.robo-slots .paytable-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
        circle at 30% 30%,
        var(--circuit-color) 1px,
        transparent 1px
      )
      0 0 / 30px 30px,
    radial-gradient(
        circle at 70% 70%,
        var(--circuit-color) 1px,
        transparent 1px
      )
      0 0 / 30px 30px;
  pointer-events: none;
  opacity: 0.1;
}

.robo-slots .paytable-content h2 {
  color: var(--robot-primary);
  text-shadow: 0 0 10px var(--robot-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.robo-slots .paytable-content h2::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--robot-primary),
    transparent
  );
}

.robo-slots .pay-row {
  background: var(--metal-medium);
  border: 1px solid rgba(77, 238, 234, 0.2);
  border-radius: 5px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.robo-slots .pay-row:hover {
  border-color: var(--robot-primary);
  box-shadow: 0 0 15px rgba(77, 238, 234, 0.2);
  transform: translateX(5px);
}

/* Symbol Container */
.robo-slots .pay-row img {
  background: var(--metal-dark);
  padding: 5px;
  border: 1px solid var(--robot-secondary);
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.robo-slots .pays {
  color: var(--robot-secondary);
  font-size: 0.9rem;
  text-shadow: 0 0 5px rgba(47, 197, 255, 0.3);
  letter-spacing: 1px;
}

.robo-slots .multiplier-info {
  background: var(--metal-medium);
  border: 1px solid var(--robot-primary);
  border-radius: 5px;
  padding: 1rem;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
}

.robo-slots .multiplier-info h3 {
  color: var (--robot-primary);
  text-shadow: 0 0 5px var(--robot-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.robo-slots .multiplier-info p {
  color: var(--robot-secondary);
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

/* Scanning Effect */
.robo-slots .multiplier-info::after {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--robot-primary),
    transparent
  );
  animation: scanPaytable 3s linear infinite;
}

@keyframes scanPaytable {
  0% {
    top: -100%;
  }
  100% {
    top: 200%;
  }
}

.robo-slots .note,
.robo-slots .rarity-note {
  color: var(--robot-accent);
  font-style: normal;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  text-shadow: 0 0 5px var(--robot-accent);
}

/* Mobile Adjustments */
@media screen and (max-width: 768px) {
  .robo-slots .paytable-content {
    padding: 1rem;
    margin: 1rem;
  }

  .robo-slots .pay-row {
    padding: 0.5rem;
  }

  .robo-slots .pays {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 480px) {
  .robo-slots .paytable-content h2 {
    font-size: 1.2rem;
  }

  .robo-slots .pay-row img {
    width: 40px;
    height: 40px;
  }

  .robo-slots .pays {
    font-size: 0.7rem;
  }

  .robo-slots .multiplier-info p {
    font-size: 0.8rem;
  }
}

/* Mobile-Optimized Paytable Styles */
.robo-slots #paytable {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.robo-slots .paytable-content {
  margin-top: 120px;
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: thin;
  max-width: min(600px, 95vw);
}

/* Compact layout for pay rows */
.robo-slots .pay-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 8px;
}

/* Symbol image container */
.robo-slots .pay-row img {
  width: 40px;
  height: 40px;
  align-self: center;
}

/* Pays information layout */
.robo-slots .pays {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 5px;
  font-size: 0.85rem;
}

.robo-slots .pays div {
  background: var(--metal-dark);
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  white-space: nowrap;
}

/* Adjustments for smaller screens */
@media screen and (max-width: 480px) {
  .robo-slots .paytable-content {
    padding: 15px;
    margin: 0;
    margin-top: 120px;
  }

  .robo-slots .pay-row {
    gap: 8px;
    padding: 6px;
  }

  .robo-slots .pay-row img {
    width: 32px;
    height: 32px;
  }

  .robo-slots .pays {
    font-size: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  }

  .robo-slots .pays div {
    padding: 3px 6px;
  }

  .robo-slots .multiplier-info {
    padding: 12px;
    margin-top: 15px;
  }

  .robo-slots .multiplier-info h3 {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .robo-slots .multiplier-info p {
    font-size: 0.75rem;
    margin: 4px 0;
  }

  .robo-slots .note,
  .robo-slots .rarity-note {
    font-size: 0.7rem;
  }
}

/* Custom scrollbar styling */
.robo-slots .paytable-content::-webkit-scrollbar {
  width: 6px;
}

.robo-slots .paytable-content::-webkit-scrollbar-track {
  background: var(--metal-dark);
  border-radius: 3px;
}

.robo-slots .paytable-content::-webkit-scrollbar-thumb {
  background: var(--robot-primary);
  border-radius: 3px;
  opacity: 0.8;
}

/* Close button for paytable */
.robo-slots #paytable-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--metal-dark);
  border: 1px solid var(--robot-primary);
  color: var(--robot-primary);
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
}

.robo-slots #paytable-close:hover {
  background: var(--robot-primary);
  color: var(--metal-dark);
}
</style>
