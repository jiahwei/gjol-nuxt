<template>
  <div class="bg-base">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const layout = 'desktop'
</script>
