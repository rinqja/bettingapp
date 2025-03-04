<template>
  <div class="matches-container">
    <!-- Group matches by league -->
    <div
      v-for="(leagueMatches, league) in groupedMatches"
      :key="league"
      class="league-section"
    >
      <div>
        <div class="league-header">
          <h3>{{ formatLeagueName(league) }}</h3>
        </div>
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
              <div class="match-date">
                {{ formatMatchDate(match.commenceTime) }}
              </div>
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
import { ref, onMounted, watch, computed } from "vue";
import { useMatchesStore } from "../../stores/matches";
import { useBettingStore } from "../../stores/betting";
import { SPORTS_CONFIG, LEAGUE_NAMES, type SupportedSport, getLeaguesForSport } from "../../config/sportsConfig";
import type { Match } from "../../types";
import MatchOdds from "./MatchOdds.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  sportKey: string;
  sportTitle: string;
  tabId: string;
  iconClass: string;
  tableClass: string;
}>();

const matchesStore = useMatchesStore();
const bettingStore = useBettingStore();
const selectedStatus = ref("upcoming");
const router = useRouter();

// Get leagues for the current sport
const getSportLeagues = (sportKey: string): string[] => {
  return getLeaguesForSport(sportKey as SupportedSport) || [];
};

// Updated computed property with null checks
const filteredMatches = computed(() => {
  const matches =
    selectedStatus.value === "live"
      ? matchesStore.matches.filter(
          (match) =>
            match &&
            match.status === "live" &&
            match.sportKey &&
            match.sportKey.startsWith(props.sportKey)
        )
      : matchesStore.matches.filter(
          (match) =>
            match &&
            match.sportKey &&
            match.sportKey.startsWith(props.sportKey) &&
            match.status === selectedStatus.value
        );

  // Debug log
  // matches.forEach((match) => {
  //   console.log("Match data:", {
  //     title: match.title,
  //     odds: match.odds,
  //     status: match.status,
  //   });
  // });

  return matches;
});

// Watch for status changes
watch(selectedStatus, async () => {
  // console.log("Status changed to:", selectedStatus.value);
  isLoading.value = true;
  try {
    const leagues = getSportLeagues(props.sportKey);
    await Promise.all(
      leagues.map((key) => matchesStore.fetchMatches(key, selectedStatus.value))
    );
  } finally {
    isLoading.value = false;
  }
});

// Initial fetch
onMounted(() => {
  // console.log("Component mounted, fetching matches for:", props.sportKey);
  const leagues = getSportLeagues(props.sportKey);

  Promise.all(
    leagues.map((key) => matchesStore.fetchMatches(key, selectedStatus.value))
  );
});

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

const formatMatchDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatMatchTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format league names using SPORTS_CONFIG structure
const formatLeagueName = (key: string): string => {
  return LEAGUE_NAMES[key] || key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatOdd = (odd: number) => {
  return odd ? odd.toFixed(2) : "-";
};

// Track expanded leagues
const expandedLeagues = ref({});

// Toggle league expansion
const toggleLeagueExpansion = (league: string) => {
  expandedLeagues.value[league] = !expandedLeagues.value[league];
};

// Add error handling for empty matches
const hasMatches = computed(() => {
  const matches = matchesStore.getMatchesBySport(props.sportKey);
  return matches && matches.length > 0;
});

// Add loading state
const isLoading = ref(false);

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
  width: 660px; /* Reduced for more compact layout */
  margin: 0 auto;
  padding: 0 0.5rem;
}

.league-section {
  background: var(--subheader);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.league-header {
  padding: 1rem;
  background: var(--header);
  color: var(--white);
  display: flex;
  max-width: 800px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--leftpreborder);
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
  font-size: 0.9rem;
}

.match-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.match-datetime {
  min-width: 60px;
  font-size: 0.8rem;
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

.team {
  font-size: 0.85rem;
}

.team.home {
  color: var(--white);
}

.team.away {
  color: var(--textcolor);
}

.odds-container {
  display: flex;
  gap: 0.3rem;
}

.odd-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0.6rem;
  min-width: 45px;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.match-time {
  color: var(--textcolor);
}
.match-date {
  color: var(--textcolor);
}

.odd-value {
  color: var(--active-color);
}
.odd-label {
  font-size: 0.75rem;
  margin-bottom: 0.2rem;
  color: var(--textcolor);
}

.odd-value {
  font-size: 0.9rem;
}

.see-more-container {
  padding: 0.5rem;
  text-align: center;
  border-top: 1px solid var(--leftpreborder);
}

.see-more-button {
  color: var(--textcolor);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  font-size: 0.9rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .matches-container {
    max-width: 100%;
    padding: 0 0.3rem;
    min-width: 300px;
  }

  .match-row {
    padding: 0.4rem;
  }

  .odds-container {
    gap: 0.3rem;
  }

  .odd-box {
    padding: 0.3rem 0.5rem;
    min-width: 45px;
  }
}

@media (max-width: 480px) {
  .matches-container {
    max-width: 100%;
  }

  .match-row {
    padding: 0.4rem;
  }

  .match-datetime {
    min-width: 50px;
  }

  .team {
    font-size: 0.8rem;
  }
}

@media (max-width: 380px) {
  .matches-container {
    max-width: 100%;
    padding: 0 0.2rem;
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

.odd-box.selected .odd-value {
  color: var(--active-color);
}

.odd-box.selected:hover {
  background: var(--preactive);
  transform: translateY(-2px);
}
</style>
