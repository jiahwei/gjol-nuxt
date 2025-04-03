<template>
  <div id="app-home" class="text-font-primary transition-colors">
    <total-charts />
  </div>
</template>

<script lang="ts" setup>
// import { useDateFormat, useNow } from '@vueuse/core'
import { bulletinApi } from '@/api/index'
import totalCharts from '~/components/totalCharts.vue'

// const nowDay = useDateFormat(useNow(), 'YYYY-MM-DD')

const { data: bulletinInfo } = await bulletinApi.getNewBulletin()
</script>

<style scoped>
#app-home {
  height: calc(100vh - var(--height-header));
  background-color: var(--bg-color-page);
  position: relative;
}
</style>
