<template>
  <div class="version-page-layout position-relative">
    <my-svg type="topic" />
    <span class="desc-content w-auto justify-self-center">对公告的内容进行文本分类，试图展示古网在不同版本中更偏向哪类玩法。</span>
    <topicChart/>
  </div>
</template>

<script lang="ts" setup>
import topicChart from './topicChart.vue';
</script>

<style>

</style>