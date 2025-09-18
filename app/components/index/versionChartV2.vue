<template>
  <div ref="chartContainer" w-80vw h-600px>
  </div>
</template>

<script lang="ts" setup>
import type { ListInVersionReturn as OriginalListInVersionReturn } from '@/api/bulletin'
import { useChartsColorMode } from '~/composables'

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption } from 'echarts/charts';

type EChartsOption = echarts.ComposeOption<LineSeriesOption>;
type ListInVersionReturn = OriginalListInVersionReturn & {
  children?: Array<OriginalListInVersionReturn>
}
echarts.use([LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);


//#region 数据处理

const listInfo = inject('listInfo', ref([]))

function transformToEChartsSeries(list: Array<ListInVersionReturn>): { xAxisData: string[], series: LineSeriesOption[] } {
  if (!Array.isArray(list) || list.length === 0) return { xAxisData: [], series: [] }
  let xAxisData: string[] = []
  let series: LineSeriesOption[] = []
  let maxAxis = 0

  list.forEach(item => {
    const data = item.list?.map(child => child.totalLen) || []
    maxAxis = data.length > maxAxis ? data.length : maxAxis
    series.push({
      name: item.acronyms,
      type: 'line',
      stack: 'Total',
      data,
    })
  })

  xAxisData = Array.from({ length: maxAxis }, (_, i) => `第${i + 1}个CD`)

  return { xAxisData, series }
}

//#endregion

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);
const colorMode = useColorMode()

const othercConfig = computed(() => ({
  series: [
    {
      lineStyle: {
        color: colorMode.value === 'dark' ? '#171717' : '#f5f5f5',
      }
    }
  ]
}))

useChartsColorMode(chartInstance, '#171717', '#f5f5f5', othercConfig)

function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const { xAxisData, series } = transformToEChartsSeries(listInfo.value || [])
  const option: EChartsOption = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: series,
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