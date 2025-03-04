import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Outcome {
  name: string;
  price: number;
  point?: number;
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

interface Match {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
}

interface OddsState {
  matches: Match[];
  sports: Sport[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const useOddsStore = defineStore('odds', {
  state: (): OddsState => ({
    matches: [],
    sports: [],
    loading: false,
    error: null,
    lastUpdated: null
  }),

  actions: {
    async ensureValidToken() {
      const authStore = useAuthStore();
      
      // If not authenticated, try to restore session
      if (!authStore.isAuthenticated) {
        const isValid = await authStore.checkAuth();
        if (!isValid) {
          throw new Error('Authentication required');
        }
      }
      return true;
    },

    async fetchSports() {
      const authStore = useAuthStore();
      
      try {
        this.loading = true;
        const response = await fetch(`${API_URL}/sports`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch sports');
        }

        const data = await response.json();
        this.sports = data;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchMatches(params: { sport?: string; status?: string } = {}): Promise<void> {
      try {
        await this.ensureValidToken();
        const authStore = useAuthStore();
        
        this.loading = true;
        const queryParams = new URLSearchParams();
        if (params.sport) queryParams.append('sport', params.sport);
        if (params.status) queryParams.append('status', params.status);

        // Debug the API URL
        console.log('API URL:', API_URL);
        const url = `${API_URL}/matches/matches?${queryParams}`; 
        console.log('Full URL:', url);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });

        // Debug response
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Raw response:', responseText);
          throw new Error('Invalid response format from server');
        }

        if (!response.ok) {
          if (response.status === 401) {
            await authStore.checkAuth();
            return this.fetchMatches(params);
          }
          throw new Error(data.message || 'Failed to fetch matches');
        }

        this.matches = data;
        this.lastUpdated = new Date();
      } catch (error: any) {
        console.error('Fetch error:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async refreshOdds(sport?: string) {
      try {
        this.loading = true;
        const queryParams = new URLSearchParams();
        if (sport) queryParams.append('sport', sport);

        const response = await fetch(`${API_URL}/refresh-odds?${queryParams}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to refresh odds');
        }

        await this.fetchMatches({ sport });
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    getMatchesBySport: (state) => (sportKey: string) => {
      return state.matches.filter(match => match.sport_key === sportKey);
    },

    getLiveMatches: (state) => {
      return state.matches.filter(match => {
        const matchTime = new Date(match.commence_time);
        const now = new Date();
        return matchTime <= now && now <= new Date(matchTime.getTime() + 3 * 60 * 60 * 1000);
      });
    },

    getUpcomingMatches: (state) => {
      return state.matches.filter(match => {
        return new Date(match.commence_time) > new Date();
      });
    },

    getSportsByGroup: (state) => {
      return state.sports.reduce((groups: { [key: string]: Sport[] }, sport) => {
        if (!groups[sport.group]) {
          groups[sport.group] = [];
        }
        groups[sport.group].push(sport);
        return groups;
      }, {});
    },

    isStale: (state) => {
      if (!state.lastUpdated) return true;
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      return state.lastUpdated < fiveMinutesAgo;
    }
  }
}); 