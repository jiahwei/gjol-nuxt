<template>
  <div>
    <app-header />
    <main id="main">
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
#main {
  min-height: calc(100vh - var(--height-header));
}
</style>
