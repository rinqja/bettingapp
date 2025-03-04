import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
  state: () => ({
    currentTab: 'home'
  }),
  
  actions: {
    setCurrentTab(tab: string) {
      this.currentTab = tab;
    }
  }
}); 