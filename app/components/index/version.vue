<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="text-3xl md:text-5xl font-bold  dark:text-white">既然如此，回头看看罢！</div>
    <versionChartV2 />
  </div>
</template>

<script lang="ts" setup>
import { bulletinApi } from '@/api/index'
import versionChartV1 from './versionChartV1.vue'
import versionChartV2 from './versionChartV2.vue'

const { data: listInfo } = await bulletinApi.getListInVersion()
provide('listInfo', listInfo)

</script>