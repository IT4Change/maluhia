<template>
  <div class="page-home">
    <FullPage background="/story/01.start.png"/>
    <FullPage background="/story/02.setup.png"/>
    <FullPage background="/story/03.honu.png"/>
    <FullPage background="/story/04.symbol.png"/>
  </div>
</template>

<script setup lang="ts">
import FullPage from '../components/FullPage.vue'
</script>

<style>
.page-home {
    @qpply w-screen;
    overflow-x: hidden;
}
</style>