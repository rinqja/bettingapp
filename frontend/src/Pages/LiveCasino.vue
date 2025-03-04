<template>
  <Navbar />
  <SubHeader active="allGames" />
  <LiveCasinoMain/>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '../components/Footer/Footer.vue';
import SubHeader from '../components/Header/SubHeader.vue';
import LiveCasinoMain from '../components/LiveCasino/LiveCasinoMain.vue';
import Navbar from '../components/Navbar/Navbar.vue';
</script>

<style scoped></style>
