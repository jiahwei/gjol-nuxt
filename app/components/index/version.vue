<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="main-word">不堪回首月明中</div>
    <versionChartV2 />
    <div class="w-70vw md:w-60vw flex justify-end">
      <div class="tips-word self-end">
        使用最勤奋的版本作为基准
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import versionChartV1 from './versionChartV1.vue'
import versionChartV2 from './versionChartV2.vue'

</script>