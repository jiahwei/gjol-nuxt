<template>
  <div ref="chartContainer" w-90vw md:w-80vw h-600px>
  </div>
</template>

<script lang="ts" setup>
import type { ListInVersionReturn } from '@/api/bulletin'
import { useChartsColorMode } from '~/composables'

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption } from 'echarts/charts';

type EChartsOption = echarts.ComposeOption<LineSeriesOption>;
echarts.use([LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, CanvasRenderer]);


//#region 数据处理

const listInfo = inject<Ref<Array<ListInVersionReturn>>>('listInfo', ref([]))

const resolveListInfo = computed(() => {
  return [...(listInfo.value || [])].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  }).slice(2)
})

//#endregion

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

useChartsColorMode(chartInstance, '#171717', '#f5f5f5')

function tooltipFormatter(params: any) {
  const sourceItem = params[0].data as ListInVersionReturn
  return`
  <div class="p-space-sm bg-white dark:bg-gray-800 flex flex-col gap-space-md">
    <span class="color-[var(--text-color-primary)] font-bold">${sourceItem.acronyms}</span>
    <span class="font-medium">开始于${sourceItem.date}，全部公告共有${sourceItem.totalVersionLen}字</span>
  </div>
  `
}

function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    dataset: {
      source: resolveListInfo.value,
      dimensions: ['date', 'totalVersionLen'],
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter
    },
    series: [{
      type: 'line',
      smooth: true,
    }],
  }
  chartInstance.value.setOption(option);

}

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});

</script>

<style></style>