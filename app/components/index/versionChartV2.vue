<template>
  <div>
    <div ref="chartContainer" w-90vw md:w-80vw h-600px>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ListInVersionReturn } from '@/api/bulletin'
import { useChartsColorMode } from '~/composables'
import { useMediaQuery } from '@vueuse/core'

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption } from 'echarts/charts';

type EChartsOption = echarts.ComposeOption<LineSeriesOption>;
echarts.use([LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, CanvasRenderer]);


//#region 数据处理

const listInfo = inject<Ref<Array<ListInVersionReturn>>>('listInfo', ref([]))
interface resolveList {
  acronyms: string;
  startDate: string;
  endDate: string;
  val: number;
  totalVersionLen: number;
  bulletins: number
}
const resolveListInfo = computed(() => {
  const list = [...(listInfo.value || [])].sort((a, b) => {
    const dateA = new Date(a.start || a.end).getTime()
    const dateB = new Date(b.start || b.end).getTime()
    return dateA - dateB
  }).slice(2)

  let maxLen = 0
  list.forEach(item => {
    maxLen = Math.max(maxLen, item.totalVersionLen)
  })

  const result: resolveList[] = []
  list.forEach(item => {
    result.push({
      acronyms: item.acronyms,
      startDate: item.start,
      endDate: item.end,
      val: Number(((item.totalVersionLen / maxLen) * 100).toFixed(1)),
      totalVersionLen: item.totalVersionLen,
      bulletins: item.list.length
    })
  })
  return result
})

//#endregion

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

const colorMode = useColorMode()
const othercConfig = computed(() => ({

  tooltip: {
    extraCssText: colorMode.value === 'dark' ? 'background-color: #1e2939;' : 'background-color: #fff;'
  }
}))
const { setOtherConfig } = useChartsColorMode(chartInstance, '#171717', '#f5f5f5', othercConfig)

function tooltipFormatter(params: any) {
  const sourceItem = params[0].data as resolveList
  return `
  <div class="p-0 bg-white dark:bg-gray-800 flex flex-col gap-space-md max-w-[200px]">
    <span class="color-[var(--text-color-primary)] font-bold break-words">${sourceItem.acronyms}</span>
    <span class="font-medium break-words whitespace-normal">${sourceItem.startDate}~${sourceItem.endDate}</span>
    <span class="font-medium break-words whitespace-normal">${sourceItem.bulletins}条公告，共${sourceItem.totalVersionLen}字</span>
  </div>
  `
}

function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
    dataset: {
      source: resolveListInfo.value,
      dimensions: ['startDate', 'val'],
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        rotate: useMediaQuery('(min-width: 768px)').value ? 0 : 45,
        interval: useMediaQuery('(min-width: 768px)').value ? 2 : 'auto'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
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
  setOtherConfig()
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