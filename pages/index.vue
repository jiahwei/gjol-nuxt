<template>
  <div id="test" class="">
    {{ nowDay }}
    {{ bulletinInfo.totalLen }}
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core';
import { bulletinApi } from '@/api/index';

const nowDay = useDateFormat(useNow(), 'YYYY-MM-DD');

const { data: bulletinInfo } = await bulletinApi.getNewBulletin();
</script>

<style scoped>
#test {
  height: calc(100vh - var(--height-header));
  background-color: var(--bg-secondary);
}
</style>
