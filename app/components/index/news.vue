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
      <div ref="chartContainer" w-300px h-300px>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUseComIsVisible } from '~/composables/home'
import { bulletinApi } from '@/api/index'
import type { BulletinInfo } from '@/api/bulletin'
import { useDateFormat, useNow } from '@vueuse/core'
const { isVisible } = useUseComIsVisible('news')

const { data: newsInfo } = await bulletinApi.getNewBulletin()
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

watch(isVisible, (visible) => {
  if (visible) {
    initChart()
  }
})

//#region 图表
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import type { PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([PieChart, CanvasRenderer, LabelLayout]);
type EChartsOption = echarts.ComposeOption<PieSeriesOption>;
type ContentTotalArrType = BulletinInfo['contentTotalArr']

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

function transformToEChartsData(list: ContentTotalArrType) {
  if (!Array.isArray(list) || list.length === 0) return []

  return list.map((item) => {
    return {
      value: item?.leng,
      name: item?.type,
    }
  })
}
function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);
  const option: EChartsOption = {
    series: [
      {
        name: '公告内容分布',
        type: 'pie',
        radius: '50%',
        data: transformToEChartsData(newsInfo.value?.contentTotalArr),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chartInstance.value.setOption(option);
}
//#endregion


onMounted(() => {
  // initChart();
});

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
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
