<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <my-svg :svgContent="topicSvg" />
    <topicChart/>
  </div>
</template>

<script lang="ts" setup>
import topicChart from './topicChart.vue';
import topicSvg from '~/assets/svg/topic.svg?raw'
</script>

<style>

</style>