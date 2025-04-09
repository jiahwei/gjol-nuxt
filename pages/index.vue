<template>
  <div id="app-home" class="text-font-primary transition-colors">
    {{ newBulletinInfo }}
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { bulletinApi } from '@/api/index'

const { data: newBulletinInfo } = await bulletinApi.getNewBulletin()
provide('newBulletinInfo', newBulletinInfo)
</script>

<style scoped>
#app-home {
  height: calc(100vh - var(--height-header));
  background-color: var(--bg-color-page);
  position: relative;
}
</style>
