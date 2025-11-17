<template>
  <div class="min-h-screen relative">
    <app-header />
    <main class="min-h-[calc(100vh-var(--height-header))] w-full">
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts" setup>
import appHeader from './header.vue'
import appFooter from './footer.vue'

console.log('desktop layout test')
</script>

<style>
</style>
