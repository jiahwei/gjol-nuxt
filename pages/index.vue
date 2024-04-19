<template>
  <div id="test" class="">
    {{ nowDay }}
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core';

const nowDay = useDateFormat(useNow(), 'YYYY-MM-DD');

const payload = {
  startDate: '2023-04-17',
  endDate: '2024-04-17'
};
const { data } = await usePOST<[]>('/getBulletinByDate', payload, () => []);
</script>

<style scoped>
#test {
  height: calc(100vh - var(--height-header));
  background-color: var(--bg-secondary);
}
</style>
