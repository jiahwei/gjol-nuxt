<template>
  <div class="min-h-screen w-full">
    <div class="layout-content flex flex-col justify-center">
      <h1>这是{{ newsInfo?.versionName }}的第{{ newsInfo?.order_by_date }}周</h1>
      <h1>好耶！古网又多苟了一天呢🎉</h1>
      <div ref="chartContainer" w-600px h-600px>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUseComIsVisible } from '~/composables/home'
import { bulletinApi } from '@/api/index'
import type { BulletinInfo } from '@/api/bulletin'
// import { useDateFormat, useNow } from '@vueuse/core'
// const nowDate = useDateFormat(useNow(), 'YYYY-MM-DD', { locales: 'zh-CN' })

const { isVisible } = useUseComIsVisible('news')

const { data: newsInfo } = await bulletinApi.getNewBulletin()

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
