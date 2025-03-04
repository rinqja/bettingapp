<template>
  <div class="tab-pane mt__30 text-white fade" :id="tabId" role="tabpanel" tabIndex="0">
    <div class="main__body__wrap left__right__space pb-60">
      <div class="live__heightlight">
        <div class="height__table">
          <div class="main__table treanding__table" :class="tableClass">
            <!-- Header section -->
            <div class="section__head b__bottom">
              <div class="left__head">
                <span class="icons">
                  <i :class="iconClass"></i>
                </span>
                <span>{{ sportTitle }}</span>
              </div>
              <div class="right__catagoris">
                <div class="right__cate__items">
                  <Select :data="categoris"></Select>
                </div>
                <div class="right__cate__items">
                  <Select :data="categoris2"></Select>
                </div>
                <div class="right__cate__items">
                  <Select :data="categoris3"></Select>
                </div>
              </div>
            </div>

            <!-- Matches table -->
            <div class="table__wrap" v-if="!oddsStore.loading">
              <div v-for="match in filteredMatches" 
                   :key="match.id" 
                   class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>{{ match.home_team }}</h6>
                    <span class="text">{{ match.away_team }}</span>
                    <p>
                      <RouterLink to="#">{{ formatDate(match.commence_time) }}</RouterLink>
                    </p>
                  </div>
                </div>

                <!-- Odds display -->
                <div class="mart__point__items">
                  <RouterLink to="#" class="twing twing__right">
                    <i class="icon-twer"></i>
                  </RouterLink>
                  <RouterLink to="#" class="mart opo">
                    <i class="icon-pmart"></i>
                  </RouterLink>
                  <template v-if="getMatchOdds(match)">
                    <RouterLink v-for="(odd, index) in getMatchOdds(match)" 
                              :key="index"
                              to="#0box" 
                              class="point__box">
                      {{ odd.toFixed(2) }}
                    </RouterLink>
                  </template>
                </div>
              </div>

              <!-- Footer section -->
              <div class="table__footer">
                <RouterLink to="#" class="lobby text__opa">
                  Open {{ sportTitle }} lobby
                </RouterLink>
                <RouterLink to="#" class="footerpoing">
                  <span>{{ filteredMatches.length }}</span>
                  <span>
                    <i class="fas fa-angle-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>

            <!-- Loading state -->
            <div v-else class="loading-state">
              Loading matches...
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import FooterHome from "../Footer/FooterHome.vue";
import Select from "../Select/Select.vue";
import { useOddsStore } from "../../stores/odds";
import { computed, onMounted } from "vue";

const props = defineProps<{
  sportKey: string;
  sportTitle: string;
  tabId: string;
  iconClass: string;
  tableClass?: string;
}>();

const oddsStore = useOddsStore();

// Get matches for specific sport
const filteredMatches = computed(() => {
  return oddsStore.getMatchesBySport(props.sportKey);
});

// Get odds for a match
const getMatchOdds = (match: any) => {
  const bookmaker = match.bookmakers[0];
  if (!bookmaker) return null;
  
  const market = bookmaker.markets.find((m: any) => m.key === 'h2h');
  if (!market) return null;

  return market.outcomes.map((outcome: any) => outcome.price);
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Category data
const categoris = [
  { id: 1, name: "Result 1X2" },
  { id: 2, name: "Result 1X3" },
  { id: 3, name: "Result 1X4" },
  { id: 4, name: "Result 1X5" },
];
const categoris2 = [
  { id: 1, name: "Over/Under" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];
const categoris3 = [
  { id: 1, name: "Both teams to score?" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];

// Fetch matches on component mount
onMounted(async () => {
  await oddsStore.fetchMatches({ sport: props.sportKey });
});
</script>

<style scoped>
.loading-state {
  text-align: center;
  padding: 2rem;
  color: #fff;
}
</style> 