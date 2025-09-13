<template>
  <div class="h-[calc(100vh-var(--height-header))] w-full flex flex-col justify-center">
    <div
    class="layout-content flex flex-col md:flex-row justify-center items-center md:gap-space-xl dark:text-white">
      <div v-if="isSuspended">
        <div class="status-word">坏了！古网没苟住 🥺</div>
        <div class="desc-word">
          最近一次更新
          <span class="desc-word-import">{{ diffDays }}</span>
          天前
        </div>
      </div>
      <div v-else>
        <div class="status-word">好耶！古网更新啦 🎉</div>
        <div class="desc-word">
          <span class="desc-word-import">{{ newsInfo?.versionName }}</span>
          的第
          <span class="desc-word-import">{{ newsInfo?.order_by_date }}</span>
          周
        </div>
      </div>
      <newsBulletinChart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bulletinApi } from '@/api/index'
import type { BulletinInfo } from '@/api/bulletin'
import { useDateFormat, useNow } from '@vueuse/core'
import newsBulletinChart from '~/components/index/newsBulletinChart.vue'

const { data: newsInfo } = await bulletinApi.getNewBulletin()
provide('newsInfo', newsInfo)


const nowDate = useNow()
const nowDatenowFormat = useDateFormat(nowDate, 'YYYY-MM-DD', { locales: 'zh-CN' })
const isSuspended:Ref<boolean> = ref(false)
const diffDays:Ref<number> = ref(0)

function initSuspended(info:BulletinInfo) {
  const target = new Date(info?.date)
  const diff = Math.abs(nowDate.value.getTime() - target.getTime())
  diffDays.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  isSuspended.value = diff > 7 * 24 * 60 * 60 * 1000
}
watch(newsInfo, (info) => {
  if(!info) return
  initSuspended(info)
},{immediate:true})


</script>

<style scoped>
.status-word {
  @apply text-4xl md:text-5xl font-bold;
}
.desc-word {
  @apply text-base mt-space-xl;
}
.desc-word-import {
  @apply font-bold color-[var(--text-color-primary)];
}
</style>
