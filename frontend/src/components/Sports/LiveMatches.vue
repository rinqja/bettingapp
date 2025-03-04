<template>
  <div class="matches-container">
    <!-- Live Matches Header -->
    <div class="live-header">
      <h2>Live Matches</h2>
      <div class="sport-filters">
        <button
          v-for="sport in sportFilters"
          :key="sport.id"
          :class="{ active: selectedSport === sport.id }"
          @click="selectedSport = sport.id"
          class="filter-btn"
        >
          <div class="sport-icon-wrapper">
            <img
              :src="sport.image"
              :alt="sport.label"
              class="sport-icon-image"
            />
          </div>
          <span class="sport-label">{{ sport.label }}</span>
          <span class="count">{{ getLiveSportCount(sport.id) }}</span>
        </button>
      </div>
    </div>

    <div v-if="!hasMatches" class="empty-state">
      <i class="icon-calendar"></i>
      <p>No live matches available at the moment</p>
      <span>Please check back later</span>
    </div>

    <!-- Group matches by league -->
    <div
      v-else
      v-for="(leagueMatches, league) in groupedLiveMatches"
      :key="league"
      class="league-section"
    >
      <div class="league-header">
        <h3>{{ formatLeagueName(String(league)) }}</h3>
        <span class="live-indicator">LIVE</span>
      </div>

      <div class="match-list">
        <div
          v-for="(match, index) in leagueMatches"
          :key="match._id"
          class="match-row"
          v-show="index < 2 || expandedLeagues[league]"
        >
          <div class="match-info">
            <div class="match-status">
              <span class="live-time">{{ match.liveTime }}'</span>
              <span class="score">{{ match.score }}</span>
            </div>
            <div class="match-teams">
              <div class="team home">{{ match.homeTeam }}</div>
              <div class="team away">{{ match.awayTeam }}</div>
            </div>
          </div>

          <div class="odds-container">
            <button
              v-for="(odd, type) in match.odds"
              :key="type"
              class="odd-box"
              @click="handleOddSelection(match, type, odd)"
              :class="{
                selected: isOddSelected(match._id, String(type)),
              }"
            >
              <span class="odd-label">{{ type }}</span>
              <span class="odd-value">{{ formatOdd(odd) }}</span>
            </button>
          </div>
        </div>

        <!-- See More button -->
        <div
          v-if="leagueMatches.length > 2"
          class="see-more-container"
          @click="toggleLeagueExpansion(league)"
        >
          <button class="see-more-button">
            {{
              expandedLeagues[league]
                ? "Show Less"
                : `Show ${leagueMatches.length - 2} More Matches`
            }}
            <i
              :class="
                expandedLeagues[league]
                  ? 'icon-chevron-up'
                  : 'icon-chevron-down'
              "
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useMatchesStore } from "../../stores/matches";
import { useBettingStore } from "../../stores/betting";
import { LEAGUE_NAMES } from "../../config/sportsConfig";
import basketballImg from "../../assets/img/logo/Basketball.png";
import footballImg from "../../assets/img/logo/football.webp";
import tennisImg from "../../assets/img/logo/tennis.png";
import allSportsImg from "../../assets/img/logo/allsports.svg";

const matchesStore = useMatchesStore();
const bettingStore = useBettingStore();
const selectedSport = ref("all");
const expandedLeagues = ref({});

const sportFilters = [
  {
    id: "all",
    label: "All Sports",
    icon: "icon-all",
    image: allSportsImg,
  },
  {
    id: "soccer",
    label: "Football",
    icon: "icon-football",
    image: footballImg,
  },
  {
    id: "basketball",
    label: "Basketball",
    icon: "icon-basketball",
    image: basketballImg,
  },
  {
    id: "tennis",
    label: "Tennis",
    icon: "icon-tennis",
    image: tennisImg,
  },
];

// Filter live matches based on selected sport
const liveMatches = computed(() => {
  const matches = matchesStore.matches.filter(
    (match) => match.status === "live"
  );
  if (selectedSport.value === "all") return matches;
  return matches.filter((match) =>
    match.sportKey.startsWith(selectedSport.value)
  );
});

const hasMatches = computed(() => liveMatches.value.length > 0);

const groupedLiveMatches = computed(() => {
  return liveMatches.value.reduce((acc: { [key: string]: any[] }, match) => {
    const league = match.sportKey.split("_").slice(1).join("_");
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(match);
    return acc;
  }, {});
});

const getLiveSportCount = (sportId: string) => {
  if (sportId === "all") return liveMatches.value.length;
  return liveMatches.value.filter((match) => match.sportKey.startsWith(sportId))
    .length;
};

const formatLeagueName = (key: string) => {
  return (
    LEAGUE_NAMES[key] ||
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

const formatOdd = (odd: number | string) => {
  return Number(odd).toFixed(2);
};

const handleOddSelection = (
  match: any,
  type: string | number,
  odd: string | number
) => {
  bettingStore.addBet({
    matchId: match._id,
    type: String(type),
    odd: Number(odd),
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    league: match.league,
  });
};

const isOddSelected = (matchId: string, type: string) => {
  return bettingStore.isBetSelected(matchId, type);
};

const toggleLeagueExpansion = (league: string) => {
  expandedLeagues.value[league] = !expandedLeagues.value[league];
};
</script>

<style scoped>
.matches-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 0.5rem;
  width: 100%;
}

.live-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

.sport-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0.3rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 8px;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  position: relative;
  overflow: hidden;
}

.filter-btn:hover {
  background: var(--header);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--preactive);
  border-color: var(--active-color);
  color: var(--active-color);
}

.sport-icon-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sport-icon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sport-label {
  flex: 1;
  font-weight: 500;
  font-size: 0.95rem;
}

.count {
  background: var(--header);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  min-width: 32px;
  text-align: center;
}

/* Mobile styles */
@media (max-width: 768px) {
  .matches-container {
    max-width: 400px;
    padding: 0 0.3rem;
    min-width: 280px;
  }

  .sport-filters {
    gap: 0.4rem;
  }

  .filter-btn {
    min-width: auto;
    width: 48px; /* Increased touch target */
    height: 48px; /* Increased touch target */
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    position: relative;
  }

  .filter-btn:active {
    transform: scale(0.95);
  }

  .sport-icon-wrapper {
    width: 24px; /* Slightly larger icons for mobile */
    height: 24px;
    margin: 0;
    z-index: 1; /* Ensure icon stays above any effects */
  }

  .sport-label,
  .count {
    display: none;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: var(--textcolor);
  text-align: center;
}

.empty-state i {
  font-size: 3rem;
  color: var(--pointbox);
}

.empty-state p {
  font-size: 1.2rem;
  margin: 0;
}

.empty-state span {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Rest of the styles from SportMatches.vue */
</style>
