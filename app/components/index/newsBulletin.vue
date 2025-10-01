<template>
  <div class="h-[calc(100vh-var(--height-header))] w-full flex flex-col justify-center">
    <div
    class="layout-content flex flex-col md:flex-row justify-center items-center gap-space-xl  md: gap-space-2xl dark:text-white">
      <div v-if="isSuspended">
        <div class="main-word">坏了！古网没苟住</div>
        <div class="second-word">
          最近一次更新
          <span class="second-word-font">{{ diffDays }}</span>
          天前
        </div>
      </div>
      <div v-else>
        <div class="main-word">好耶！古网又更一周</div>
        <div class="second-word">
          <span class="second-word-font">{{ newsInfo?.versionName }}</span>
          已经坚持更新
          <span class="second-word-font">{{ newsInfo?.order_by_date }}</span>
          周
        </div>
      </div>
      <img v-if="isSuspended" src="/img/hai.png" alt="但愿如此" class="w-[100px] h-[100px] rounded-sm"/>
      <newsBulletinChart v-else/>
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

//#region 古网还在更新吗？

const nowDate = useNow()
const nowDatenowFormat = useDateFormat(nowDate, 'YYYY-MM-DD', { locales: 'zh-CN' })
const emit = defineEmits(['updateIsSuspended'])

const isSuspended:Ref<boolean> = ref(false)
provide('isSuspended', isSuspended)
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
  emit('updateIsSuspended', isSuspended.value)
},{immediate:true})

//#endregion


</script>
