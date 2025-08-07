<template>
  <div id="app">
    <app-header />
    <main class="min-h-[calc(100vh-var(--header-height))] layout-main">
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts" setup>
import appHeader from './header.vue'
import appFooter from './footer.vue'
</script>

<style>
</style>
