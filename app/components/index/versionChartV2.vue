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

const colorMode = useColorMode()
const othercConfig = computed(() => ({

  tooltip:{
    extraCssText: colorMode.value === 'dark' ? 'background-color: #1e2939;': 'background-color: #fff;'
  }
}))
useChartsColorMode(chartInstance, '#171717', '#f5f5f5', othercConfig)

function tooltipFormatter(params: any) {
  const sourceItem = params[0].data as ListInVersionReturn
  return`
  <div class="p-0 bg-white dark:bg-gray-800 flex flex-col gap-space-md max-w-[200px]">
    <span class="color-[var(--text-color-primary)] font-bold break-words">${sourceItem.acronyms}</span>
    <span class="font-medium break-words whitespace-normal">开始于${sourceItem.date}，全部公告共有${sourceItem.totalVersionLen}字</span>
  </div>
  `
}

function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
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
      formatter: tooltipFormatter,
      confine: true,
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