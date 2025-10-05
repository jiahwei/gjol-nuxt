<template>
  <div class="h-screen w-full flex flex-col items-center justify-start py-space-lg">
    <!-- <div class="main-word">不堪回首月明中</div> -->
    <my-svg :svgContent="versionSvg" />
    <versionChart />
  </div>
</template>

<script lang="ts" setup>
import versionChart from './versionChart.vue'
import versionSvg from '~/assets/svg/version.svg?raw'

</script>