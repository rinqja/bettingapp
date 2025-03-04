<template>
  <div class="matches-container">
    <!-- Today's Matches Header -->
    <div class="today-header">
      <h2>Today's Matches</h2>
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
          <span class="count">{{ getSportCount(sport.id) }}</span>
        </button>
      </div>
    </div>

    <div v-if="!hasMatches" class="empty-state">
      <i class="icon-calendar"></i>
      <p>No matches scheduled for today</p>
      <span>Please check back later</span>
    </div>

    <!-- Group matches by league -->
    <div
      v-else
      v-for="(leagueMatches, league) in groupedMatches"
      :key="league"
      class="league-section"
    >
      <div class="league-header">
        <h3>{{ formatLeagueName(String(league)) }}</h3>
      </div>

      <div class="match-list">
        <div
          v-for="(match, index) in leagueMatches"
          :key="match._id"
          class="match-row"
          v-show="index < 2 || expandedLeagues[league]"
        >
          <div class="match-info">
            <div class="match-datetime">
              <div class="match-time">
                {{ formatMatchTime(match.commenceTime) }}
              </div>
            </div>
            <div
              class="match-teams"
              @click="navigateToSGM(match)"
              :class="{ clickable: true }"
            >
              <div class="team home">{{ match.homeTeam }}</div>
              <div class="team away">{{ match.awayTeam }}</div>
            </div>
          </div>

          <div class="odds-container">
            <button
              class="odd-box"
              @click="handleOddSelection(match, '1', match.odds.homeWin)"
              :class="{
                disabled: match.status === 'ended',
                selected: isOddSelected(match._id, '1'),
              }"
            >
              <span class="odd-label">1</span>
              <span class="odd-value">{{ formatOdd(match.odds.homeWin) }}</span>
            </button>
            <button
              class="odd-box"
              @click="handleOddSelection(match, 'X', match.odds.draw)"
              :class="{
                disabled: match.status === 'ended',
                selected: isOddSelected(match._id, 'X'),
              }"
            >
              <span class="odd-label">X</span>
              <span class="odd-value">{{ formatOdd(match.odds.draw) }}</span>
            </button>
            <button
              class="odd-box"
              @click="handleOddSelection(match, '2', match.odds.awayWin)"
              :class="{
                disabled: match.status === 'ended',
                selected: isOddSelected(match._id, '2'),
              }"
            >
              <span class="odd-label">2</span>
              <span class="odd-value">{{ formatOdd(match.odds.awayWin) }}</span>
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
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useMatchesStore } from "../../stores/matches";
import { useBettingStore } from "../../stores/betting";
import { LEAGUE_NAMES } from "../../config/sportsConfig";
import basketballImg from "../../assets/img/logo/Basketball.png";
import footballImg from "../../assets/img/logo/football.webp";
import tennisImg from "../../assets/img/logo/tennis.png";
import allSportsImg from "../../assets/img/logo/allsports.svg";
import { useRouter } from "vue-router";
import type { Match } from "../../types";

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

// Helper function to check if a match is today
const isMatchToday = (matchTime: string) => {
  const matchDate = new Date(matchTime);
  const today = new Date();
  return matchDate.toDateString() === today.toDateString();
};

// Updated filtered matches computation
const filteredMatches = computed(() => {
  return matchesStore.matches.filter((match) => {
    // First check if the match is today
    if (!isMatchToday(match.commenceTime)) return false;

    // Then apply sport filter
    if (selectedSport.value === "all") return true;
    return match.sportKey.startsWith(selectedSport.value);
  });
});

// Updated sport count computation
const getSportCount = (sportId: string) => {
  return matchesStore.matches.filter((match) => {
    if (!isMatchToday(match.commenceTime)) return false;

    if (sportId === "all") return true;
    return match.sportKey.startsWith(sportId);
  }).length;
};

// Fetch matches periodically
const fetchMatches = async () => {
  try {
    // Fetch matches for all sports
    await Promise.all(
      sportFilters
        .map((sport) =>
          sport.id !== "all"
            ? matchesStore.fetchMatches(sport.id, "upcoming")
            : null
        )
        .filter(Boolean)
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};

// Initial fetch and setup periodic updates
onMounted(() => {
  fetchMatches();
  // Refresh matches every 5 minutes
  const interval = setInterval(fetchMatches, 5 * 60 * 1000);

  // Cleanup interval on component unmount
  onUnmounted(() => clearInterval(interval));
});

// Watch for sport filter changes
watch(selectedSport, () => {
  fetchMatches();
});

// Group matches by league
const groupedMatches = computed(() => {
  const groups = {};
  filteredMatches.value.forEach((match) => {
    const league = match.sportKey.split("_").slice(1).join("_");
    if (!groups[league]) {
      groups[league] = [];
    }
    groups[league].push(match);
  });
  return groups;
});

const formatMatchTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatLeagueName = (key: string): string => {
  return LEAGUE_NAMES[key] || key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatOdd = (odd: number) => {
  return odd ? odd.toFixed(2) : "-";
};

const handleOddSelection = (match: any, type: string, odds: number) => {
  if (match.status === "ended") return;

  bettingStore.addSelection({
    matchId: match._id,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    type: type,
    selection: type,
    odds: odds,
    sportKey: match.sportKey,
    market: "Match Winner",
    status: match.status,
    event: `${match.homeTeam} vs ${match.awayTeam}`,
    commenceTime: match.commenceTime,
  });
};

const isOddSelected = (matchId: string, type: string) => {
  return bettingStore.selections.some(
    (s) => s.matchId === matchId && s.type === type
  );
};

const toggleLeagueExpansion = (league: string) => {
  expandedLeagues.value[league] = !expandedLeagues.value[league];
};

const hasMatches = computed(() => filteredMatches.value.length > 0);

const router = useRouter();

const navigateToSGM = (match: any) => {
  router.push({
    name: "SameGameMulti",
    params: {
      matchId: match._id || "default",
      homeTeam: encodeURIComponent(match.homeTeam),
      awayTeam: encodeURIComponent(match.awayTeam),
    },
  });
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

.today-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; /* Center header content */
  text-align: center; /* Center text */
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
}

.filter-btn:hover {
  background: var(--preactive);
  transform: translateY(-2px);
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

/* Reuse all match display styles from SportMatches.vue */
.league-section {
  width: 100%;
  background: var(--subheader);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.league-header {
  padding: 1rem;
  background: var(--header);
  color: var(--white);
  border-bottom: 2px solid var(--active-color);
}

.match-list {
  width: 100%;
}

.match-row {
  width: 100%;
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid var(--leftpreborder);
  justify-content: space-between;
  align-items: center;
}

.match-row:hover {
  background: var(--signbet);
}

.match-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.match-datetime {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 60px;
}

.match-date {
  color: var(--textcolor);
  font-size: 0.85rem;
}

.match-time {
  color: var(--white);
  font-weight: 500;
  font-size: 0.9rem;
}

.match-teams {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.match-teams:hover {
  background-color: var(--pointbox);
}

.clickable {
  cursor: pointer;
}

.odds-container {
  display: flex;
  gap: 0.5rem;
}

.odd-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.6rem;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.odd-box:hover:not(.disabled) {
  background: var(--preactive);
  border-color: var(--active-color);
  transform: translateY(-2px);
}

.odd-label {
  font-size: 0.75rem;
  color: var(--textcolor);
  margin-bottom: 0.2rem;
}

.odd-value {
  font-size: 0.9rem;
  color: var(--active-color);
}

.team {
  font-size: 0.85rem;
}

.team.home {
  color: var(--white);
}

.team.away {
  color: var(--textcolor);
}

.see-more-container {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-top: 1px solid var(--leftpreborder);
}

.see-more-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: var(--active-color);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.see-more-button:hover {
  color: var(--active-two);
}

.see-more-button i {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

/* Updated mobile styles */
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
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
  }

  .sport-icon-wrapper {
    width: 22px;
    height: 22px;
    margin: 0;
  }

  .sport-label,
  .count {
    display: none;
  }

  .match-row {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .match-info {
    gap: 0.5rem;
  }

  .odds-container {
    gap: 0.3rem;
  }

  .odd-box {
    padding: 0.4rem 0.6rem;
    min-width: 50px;
  }

  .match-datetime {
    min-width: 60px;
    font-size: 0.8rem;
  }

  .team {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .matches-container {
    max-width: 340px;
  }

  .match-row {
    padding: 0.4rem;
  }

  .odd-box {
    padding: 0.3rem 0.5rem;
    min-width: 45px;
  }
}

@media (max-width: 380px) {
  .matches-container {
    max-width: 300px;
    padding: 0 0.2rem;
  }

  .match-datetime {
    min-width: 50px;
  }

  .team {
    font-size: 0.8rem;
  }
}

/* Animations */
@keyframes selectOdd {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotateChevron {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.odd-box.selected {
  animation: selectOdd 0.3s ease;
  background: var(--preactive);
  border-color: var(--active-color);
  transform: translateY(-2px);
}

.icon-chevron-up {
  animation: rotateChevron 0.3s ease forwards;
}

.icon-chevron-down {
  animation: rotateChevron 0.3s ease reverse forwards;
}

/* States */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.odd-box.disabled {
  transform: none;
  background: var(--pointbox);
  border-color: var(--leftpreborder);
}

.odd-box.disabled:hover {
  transform: none;
  background: var(--pointbox);
}

/* Include empty state styles */
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

/* Animation for active state */
.filter-btn.active .sport-icon-wrapper {
  animation: pulseIcon 0.3s ease;
}

@keyframes pulseIcon {
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

/* Add smooth transitions */
.filter-btn {
  transition: all 0.3s ease;
}

.sport-icon-wrapper {
  transition: transform 0.3s ease;
}
</style>
