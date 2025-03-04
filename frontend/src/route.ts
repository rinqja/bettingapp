import { createRouter, createWebHistory } from "vue-router";
import Index from "./Pages/Index.vue";
import Casino from "./Pages/Casino.vue";
import LiveCasino from "./Pages/LiveCasino.vue";
import Promotions from "./Pages/Promotions.vue";
import DashboardLayout from "./Layouts/DashboardLayout.vue";
import Dashboard from "./Pages/Dashboard/Dashboard.vue";
import BetHistory from "./Pages/Dashboard/BetHistory.vue";
import ContactPreference from "./Pages/Dashboard/ContactPreference.vue";
import Identity from "./Pages/Dashboard/Identity.vue";
import Verification from "./Pages/Dashboard/Verification.vue";
import Casinobet from "./Pages/Dashboard/Casinobet.vue";
import MyPromo from "./Pages/Dashboard/MyPromo.vue";
import Deposit from "./Pages/Dashboard/Deposit.vue";
import Withdraw from "./Pages/Dashboard/Withdraw.vue";
import Transaction from "./Pages/Dashboard/Transaction.vue";
import Notification from "./Pages/Dashboard/Notification.vue";
import Bonuses from "./Pages/Dashboard/Bonuses.vue";
import SportsBetting from "./Pages/SportsBetting.vue";
import NotFound from "./Pages/NotFound.vue";
import AdminLayout from "./Layouts/AdminLayout.vue";
import { useAuthStore } from "./stores/auth";
import MyBets from "./views/MyBets.vue";
import SameGameMulti from "./Pages/SameGameMulti.vue";
import Keno from "./Pages/Games/Keno.vue"; // Update this import
import Mines from "./Pages/Games/Mines.vue";
import Roulette from "./Pages/Games/Roulette.vue";
import DragonTower from "./Pages/Games/DragonTower.vue";
import Wheel from "./Pages/Games/Wheel.vue";
import Blackjack from "./Pages/Games/Blackjack.vue";
import Slots from "./Pages/Games/Slots.vue";
import SlotForeign from "./Pages/Games/SlotForeign.vue";
import HalloweenSlots from "./Pages/Games/HalloweenSlots.vue";
import SlotPen from "./Pages/Games/SlotPen.vue";
import NewSlots from "./Pages/Games/NewSlots.vue";
import Login from "./Pages/Auth/Login.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: "/",
      component: Index,
      meta: { title: "BET 24/7" },
    },
    {
      path: "/sportsbetting",
      component: SportsBetting,
      meta: { title: "BET 24/7" },
    },
    {
      path: "/casino",
      component: Casino,
      meta: { title: "BET 24/7" },
    },
    // {
    //   path: "/livecasino",
    //   component: LiveCasino,
    //   meta: { title: "BET 24/7" },
    // },
    {
      path: "/promotions",
      component: Promotions,
      meta: { title: "BET 24/7" },
    },
    {
      path: "/casino/NewSlot",
      component: NewSlots,
      meta: { title: "New Slots - BET 24/7", layout: "default" },
    },
    {
      path: "/profile",
      component: Dashboard,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/bethistory",
      component: BetHistory,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/contact-preference",
      component: ContactPreference,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/identity",
      component: Identity,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/verification",
      component: Verification,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/casinobet",
      component: Casinobet,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/mypromo",
      component: MyPromo,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/deposit",
      component: Deposit,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/withdraw",
      component: Withdraw,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/transaction",
      component: Transaction,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/notification",
      component: Notification,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/dashboard/bonuses",
      component: Bonuses,
      meta: {
        layout: DashboardLayout,
        title: "BET 24/7",
      },
    },
    {
      path: "/my-bets",
      component: MyBets,
      meta: {
        title: "My Bets - BET 24/7",
        requiresAuth: true,
      },
    },
    {
      path: "/same-game-multi/:matchId",
      name: "SameGameMulti",
      component: SameGameMulti,
      meta: {
        title: "Same Game Multi - BET 24/7",
      },
    },
    {
      path: "/casino/keno",
      component: Keno,
      meta: {
        title: "Keno - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/mines",
      component: Mines,
      meta: {
        title: "Mines - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/roulette",
      component: Roulette,
      meta: {
        title: "Roulette - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/dragontower",
      component: DragonTower,
      meta: {
        title: "Dragon Tower - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/wheel",
      component: Wheel,
      meta: {
        title: "Wheel - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/blackjack",
      component: Blackjack,
      meta: {
        title: "Blackjack - BET 24/7",
        layout: "default",
      },
    },
    {
      path: "/casino/slots",
      component: Slots,
      meta: {
        title: "Slots - BET 24/7",
        layout: "default",
      },
    },
    // {
    //   path: "/casino/slotforeign",
    //   component: SlotForeign,
    //   meta: {
    //     title: "Slot Foreign - BET 24/7",
    //     layout: "default",
    //   },
    // },
    {
      path: "/casino/halloween-slots",
      component: HalloweenSlots,
      meta: {
        title: "Halloween Slots - BET 24/7",
        layout: "default",
      },
    },




    // Admin routes

    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "",
          redirect: "/admin/dashboard",
        },
        {
          path: "dashboard",
          component: () => import("./Pages/Admin/AdminDashboard.vue"),
          meta: { title: "Admin Dashboard - BET 24/7" },
        },
        {
          path: "users",
          component: () => import("./Pages/Admin/UsersManagement.vue"),
          meta: { title: "User Management - BET 24/7" },
        },
        {
          path: "transactions",
          component: () => import("./Pages/Admin/TransactionsManagement.vue"),
          meta: { title: "Transactions - BET 24/7" },
        },
        {
          path: "coins",
          component: () => import("./Pages/Admin/CoinsManagement.vue"),
          meta: {
            title: "Coins Management - BET 24/7",
          },
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // If route requires guest (login page) and user is authenticated
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/');
    return;
  }

  // If user is not authenticated and not on auth page
  if (!authStore.isAuthenticated && to.path !== '/auth') {
    next('/auth');
    return;
  }

  console.log("Route navigation:", {
    to: to.path,
    userRole: authStore.user?.role,
    isAuthenticated: authStore.isAuthenticated,
  });

  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  // Check if user is superuser/admin and trying to access regular dashboard
  if (
    to.path === "/dashboard" &&
    ["admin", "superuser"].includes(authStore.user?.role || "")
  ) {
    console.log(
      "Admin/Superuser accessing dashboard, redirecting to admin dashboard"
    );
    next("/admin/dashboard");
    return;
  }

  // Rest of your existing guards
  if (
    to.meta.requiresAdmin &&
    !["admin", "superuser"].includes(authStore.user?.role || "")
  ) {
    console.log("Admin required but user is not admin/superuser");
    next("/");
  } else if (
    to.meta.requiresSuperuser &&
    authStore.user?.role !== "superuser"
  ) {
    console.log("Superuser required but user is not superuser");
    next("/admin/dashboard");
  } else {
    console.log("Navigation allowed");
    next();
  }
});

export default router;
