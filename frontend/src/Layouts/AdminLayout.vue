<template>
  <div class="admin-layout">
    <Header />
    <div class="admin-content">
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { computed } from "vue";
import Header from "../components/Header/Header.vue";

const authStore = useAuthStore();
const router = useRouter();

const isAdminOrSuperuser = computed(() => {
  const role = authStore.user?.role;
  return role === "admin" || role === "superuser";
});

const isSuperuser = computed(() => authStore.user?.role === "superuser");
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  max-width: 100vw;
  overflow-x: hidden;
}

.admin-content {
  flex: 1;
  width: 100%;
}

.main-content {
  padding: 80px 20px 20px;
  background: var(--body-color); /* Add this */
  min-height: calc(100vh - 60px);
  width: 100%;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    padding: 70px 10px 10px;
    width: 100%;
    overflow-x: hidden;
  }

  .table-responsive {
    max-width: calc(100vw - 20px);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .main-content {
    padding: 80px 15px 15px;
  }
}
</style>
