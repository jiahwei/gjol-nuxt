<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="main-word">不堪回首月明中</div>
    <versionChartV2 />
    <div class="w-70vw md:w-60vw flex flex-col justify-end">
      <!-- <div class="tips-word self-end">
        使用最勤奋的版本(琅泉太华版本)作为基准
      </div> -->
      <div class="tips-word self-end">
        更新强度指每个版本公告的平均字数
      </div>
      <div class="tips-word self-end">
        版本延续指每个版本持续更新多少周
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import versionChartV1 from './versionChartV1.vue'
import versionChartV2 from './versionChartV2.vue'

</script>