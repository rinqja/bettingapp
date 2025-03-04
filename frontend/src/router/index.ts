import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";
import Keno from "../Pages/Games/Keno.vue";
import HalloweenSlots from './Pages/Games/HalloweenSlots.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/casino/keno",
    name: "Keno",
    component: Keno,
    meta: {
      requiresAuth: false,
      layout: "MainLayout",
    },
  },
  {
    path: "/casino/halloween-slots",
    component: HalloweenSlots,
    meta: {
      title: "Halloween Slots - BET 24/7",
      layout: "default",
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
