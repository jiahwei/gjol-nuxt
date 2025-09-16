<template>
  <div ref="chartContainer" w-300px h-300px>
  </div>
</template>

<script lang="ts" setup>
import type { BulletinInfo } from '@/api/bulletin'
import { useUseComIsVisible } from '~/composables/home'
import { useChartsColorMode } from '~/composables'


const newsInfo = inject<Ref<BulletinInfo>>('newsInfo')!
if (!newsInfo) {
  throw new Error('newsInfo is not provided');
}
const isSuspended = inject<Ref<boolean>>('isSuspended',ref(false))
if (!isSuspended) {
  throw new Error('isSuspended is not provided');
}

const { isVisible } = useUseComIsVisible('news')

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

useChartsColorMode(chartInstance)

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


onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>
