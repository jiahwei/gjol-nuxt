<template>
  <div ref="chartContainer" w-90vw md:w-80vw h-600px>
  </div>
</template>

<script lang="ts" setup>
//#region import
import { useMediaQuery } from '@vueuse/core'

// echarts
import * as echarts from 'echarts/core';
import {
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import type { GridComponentOption, LegendComponentOption } from 'echarts/components';
import type { BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';


import type { ListInVersionReturn, ContentTotal } from '@/api/bulletin'
import { useChartsColorMode, useChartsAutoSize } from '~/composables'
import { useComIsVisible } from '~/composables/home'
//#endregion


//#region 数据处理
const listInfo = inject<Ref<Array<ListInVersionReturn>>>('listInfo', ref([]))
type ParagraphTopic = ContentTotal['type']
type EffectiveParagraphTopic = Exclude<ParagraphTopic, "格式" | "无更新" | "通用调整">
type TopicCount = {
  [K in EffectiveParagraphTopic]: number;
}
interface resolveList extends TopicCount {
  // 版本别称
  acronyms: string;
  startDate: string;
  endDate: string;
  // 版本总长度
  totalVersionLen: number;
  // 公告数量
  bulletins: number
}

const EffectiveParagraphTopicArray: EffectiveParagraphTopic[] = [
  "商城",
  // "通用调整",
  "职业调整",
  "PVP",
  "PVE",
  "PVX"
]


function getPercentage(value: number, total: number): number {
  if (!isFinite(value) || !isFinite(total) || total === 0) return 0;
  const percent = (value / total) * 100;
  return parseFloat(percent.toFixed(1));
}


function getTopicCount(bulletinsList: ListInVersionReturn['list']): TopicCount {
  function isFilteredTopic(value: string): value is EffectiveParagraphTopic {
    return EffectiveParagraphTopicArray.includes(value as EffectiveParagraphTopic);
  }
  const topicCount: TopicCount = {
    "商城": 0,
    // "通用调整": 0,
    "职业调整": 0,
    "PVP": 0,
    "PVE": 0,
    "PVX": 0,
  }

  let total = 0
  bulletinsList.forEach((item) => {
    const bulletinsType = JSON.parse(item.type) as ContentTotal[]
    bulletinsType.forEach(item => {
      if (isFilteredTopic(item.type)) {
        total += item.leng || 0
        topicCount[item.type] += item.leng || 0
      }
    })
  })

  for (const [key, value] of Object.entries(topicCount)) {
    topicCount[key as EffectiveParagraphTopic] = getPercentage(value, total)
  }


  return topicCount
}

const resolveListInfo = computed<resolveList[]>(() => {
  const result: resolveList[] = []
  listInfo.value.forEach(item => {
    const bulletinsList = item.list
    const topicCount = getTopicCount(bulletinsList)
    result.push({
      ...topicCount,
      acronyms: item.acronyms || '',
      startDate: item.start || '',
      endDate: item.end || '',
      totalVersionLen: item.totalVersionLen || 0,
      bulletins: bulletinsList.length || 0
    })
  })
  return result
})

//#endregion

//#region 图表
echarts.use([GridComponent, LegendComponent, BarChart, CanvasRenderer]);
type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LegendComponentOption | BarSeriesOption
>;

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

useChartsColorMode(chartInstance)
useChartsAutoSize(chartInstance)

function getSeriesData(isMobile: boolean) {
  const seriesData: BarSeriesOption[] = []
  EffectiveParagraphTopicArray.forEach(topic => {
    seriesData.push({
      type: 'bar',
      stack: 'total',
      name: topic,
      label: {
        show: true,
        formatter: (params: any) => {
          const num = params.value?.[topic] || 0
          return num === 0 || isMobile ? '' : `${num}%`
        }
      },
    })
  })
  return seriesData
}

function initChart() {
  if (!chartContainer.value) return;
  chartInstance.value = echarts.init(chartContainer.value)

  const isMobile = useMediaQuery('(max-width: 768px)').value
  const xAxisConfig = {
    type: 'value',
    max: 100,
    axisLabel: {
      formatter: '{value}%'
    },
    axisLine: {
      show: true,
    }
  }
  const yAxisConfig = {
    type: 'category',
    axisLabel: {
      rotate: 0,
    }
  }

  const option: EChartsOption = {
    dataset: {
      source: resolveListInfo.value,
      dimensions: ['acronyms', ...EffectiveParagraphTopicArray],
    },
    legend: {
      selectedMode: 'multiple',
      type: 'scroll',
      orient: 'horizontal',
      left: 'center',
      top: 'bottom',
    },
    xAxis: (isMobile ? xAxisConfig : yAxisConfig) as EChartsOption['xAxis'],
    yAxis: (isMobile ? yAxisConfig : xAxisConfig) as EChartsOption['yAxis'],
    series: getSeriesData(isMobile),
  };

  chartInstance.value.setOption(option);
}
//#endregion



const { isVisible } = useComIsVisible('topic')

watch(isVisible, (visible) => {
  if (visible) {
    initChart()
  }
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style></style>