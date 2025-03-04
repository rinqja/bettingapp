import { defineStore } from 'pinia';
import { ref } from 'vue';

interface NotificationOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[]
  }),

  actions: {
    show(notification: NotificationOptions) {
      const id = Date.now().toString();
      const newNotification = {
        id,
        ...notification
      };
      
      this.notifications.push(newNotification);

      if (notification.duration !== 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, notification.duration || 4000);
      }
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }
  }
}); 