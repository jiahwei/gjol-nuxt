<template>
  <div class="version-page-layout">
    <my-svg :svgContent="versionSvg" />
    <span class="desc-content">本站收集了自古剑奇谭网络版（以下简称“古网”）开服以来的所有官方公告，并依据版本对公告进行分类和统计。</span>
    <versionChart />
    <versionDesc />
  </div>
</template>

<script lang="ts" setup>
import versionChart from './versionChart.vue'
import versionSvg from '~/assets/svg/version.svg?raw'
import versionDesc from './versionDesc.vue'
</script>