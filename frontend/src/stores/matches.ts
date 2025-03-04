import { defineStore } from 'pinia';
import axios from '../utils/axios';
import { useAuthStore } from './auth'; // Import auth store

const API_URL = import.meta.env.VITE_API_URL;

interface Match {
  _id: string;
  externalId: string;
  sportKey: string;
  sportTitle: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  odds: {
    homeWin: number;
    draw?: number;
    awayWin: number;
  };
  status: 'upcoming' | 'live' | 'ended';
  title: string;
}

export const useMatchesStore = defineStore('matches', {
  state: () => ({
    matches: [] as Match[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    getMatchesBySport: (state) => (sportKey: string) => {
      console.log('Getting matches for sport:', sportKey);
      return state.matches.filter(match => {
        const matchSportKey = match?.sportKey?.toLowerCase() || '';
        const searchKey = sportKey.toLowerCase();
        
        // Handle special cases for tennis and other sports
        if (searchKey === 'tennis') {
          return matchSportKey.includes('tennis');
        }
        if (searchKey === 'icehockey') {
          return matchSportKey.includes('icehockey') || matchSportKey.includes('hockey');
        }
        
        return matchSportKey === searchKey || 
               matchSportKey.startsWith(`${searchKey}_`) || 
               matchSportKey.includes(searchKey);
      });
    },
    getLiveMatches: (state) => {
      return state.matches.filter(match => 
        match && 
        match.status === 'live'
      );
    },
    getUpcomingMatches: (state) => {
      return state.matches.filter(match => 
        match && 
        match.status === 'upcoming'
      );
    }
  },

  actions: {
    async fetchMatches(sportKey: string, status: string = 'upcoming') {
      const authStore = useAuthStore();
      
      try {
        this.loading = true;
        this.error = null;
        
        const response = await axios.get(`${API_URL}/matches/${sportKey}/matches`, {
          params: { status },
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });

        // Check if response has the expected structure
        if (response.data && response.data.success && Array.isArray(response.data.matches)) {
          const validMatches = response.data.matches.filter((match: any) => {
            return match && 
                   match.externalId && 
                   match.sportKey && 
                   match.status;
          });

          // Merge new matches with existing ones, avoiding duplicates
          const existingIds = new Set(this.matches.map(m => m.externalId));
          const uniqueNewMatches = validMatches.filter((m: Match) => !existingIds.has(m.externalId));
          
          this.matches = [...this.matches, ...uniqueNewMatches];
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (error: any) {
        console.error('Error fetching matches:', error);
        if (error.response?.status === 401) {
          this.error = 'Please log in to view matches';
          authStore.logout();
        } else {
          this.error = error.message || 'Failed to load matches';
        }
      } finally {
        this.loading = false;
      }
    },

    clearMatches() {
      this.matches = [];
      this.error = null;
    },

    async checkMatchResults() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches/results`);
        
        if (response.data.updatedMatches) {
          // Log matches that were updated
          console.log('Matches updated with results:', response.data.updatedMatches);
          
          // Refresh matches data
          await this.fetchMatches();
          
          // Return the updated matches for bet settlement
          return response.data.updatedMatches;
        }
      } catch (error) {
        console.error('Error checking match results:', error);
      }
    },

    // Helper method to determine if a match should be settled
    isMatchSettled(match: any): boolean {
      return match.status === 'ended' && match.result;
    },

    async fetchMatchById(matchId: string) {
      const authStore = useAuthStore();
      
      try {
        this.loading = true;
        this.error = null;
        
        const response = await axios.get(`${API_URL}/matches/matches/${matchId}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        });

        if (response.data && response.data.success) {
          // Find and update the match in the local state if it exists
          const matchIndex = this.matches.findIndex(m => m._id === matchId);
          if (matchIndex !== -1) {
            this.matches[matchIndex] = response.data.match;
          }
          return response.data.match;
        } else {
          throw new Error('Match not found');
        }
      } catch (error: any) {
        console.error('Error fetching match:', error);
        if (error.response?.status === 401) {
          this.error = 'Please log in to view match details';
          authStore.logout();
        } else {
          this.error = error.message || 'Failed to load match details';
        }
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
}); 