import { createApp } from "vue";
import "./style.css";
import "./assets/scss/main.scss";
import App from "./App.vue";
import { router } from "./route";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap";
import { createPinia } from "pinia";
import Notifications from "@kyvg/vue3-notification";
import { useAuthStore } from "./stores/auth";

router.beforeEach((to) => {
  if (to.meta && typeof to.meta.title === "string") {
    document.title = to.meta.title;
  } else {
    document.title = "Default Title";
  }
  window.scrollTo(0, 0);
});

// Create pinia instance first
const pinia = createPinia();

// Create the app instance
const app = createApp(App);

// Install plugins
app.use(router);
app.use(pinia);
app.use(Notifications);

// Initialize auth check before mounting
const initApp = async () => {
  const authStore = useAuthStore();
  
  try {
    if (!authStore.isAuthenticated) {
      router.push("/auth");
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    router.push("/auth");
  }
  
  app.mount("#app");
};

// Start the application
initApp();
