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
//#endregion


//#region 数据处理
const listInfo = inject<Ref<Array<ListInVersionReturn>>>('listInfo', ref([]))
type ParagraphTopic = ContentTotal['type']
type EffectiveParagraphTopic = Exclude<ParagraphTopic, "开头" | "署名/结尾">
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
  "无更新",
  "商城/外观",
  "通用调整",
  "职业调整",
  "斗法调整",
  "秘境调整",
  "活动更新"
]


function getPercentage(value: number, total: number): number {
  if (!isFinite(value) || !isFinite(total) || total === 0) return 0;
  const percent = (value / total) * 100;
  return parseFloat(percent.toFixed(2));
}


function getTopicCount(bulletinsList: ListInVersionReturn['list']): TopicCount {
  const filteredTopics: EffectiveParagraphTopic[] = [
    "无更新",
    "商城/外观",
    "通用调整",
    "职业调整",
    "斗法调整",
    "秘境调整",
    "活动更新"
  ];
  function isFilteredTopic(value: string): value is EffectiveParagraphTopic {
    return filteredTopics.includes(value as EffectiveParagraphTopic);
  }
  const topicCount: TopicCount = {
    "无更新": 0,
    "商城/外观": 0,
    "通用调整": 0,
    "职业调整": 0,
    "斗法调整": 0,
    "秘境调整": 0,
    "活动更新": 0,
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

function initChart() {
  if (!chartContainer.value) return;
  chartInstance.value = echarts.init(chartContainer.value)

  const option: EChartsOption = {
    dataset: {
      source: resolveListInfo.value,
      dimensions: ['acronyms', ...EffectiveParagraphTopicArray],
    },
    legend: {
      selectedMode: false
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        rotate: 45,
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%'  // 添加百分号显示
      },
      axisLine: {
        show: true,
      }
    },
    series: [
      { type: 'bar', stack: 'total', name: '无更新' },
      { type: 'bar', stack: 'total', name: '商城/外观' },
      { type: 'bar', stack: 'total', name: '通用调整' },
      { type: 'bar', stack: 'total', name: '职业调整' },
      { type: 'bar', stack: 'total', name: '斗法调整' },
      { type: 'bar', stack: 'total', name: '秘境调整' },
      { type: 'bar', stack: 'total', name: '活动更新' },
    ],
  };

  chartInstance.value.setOption(option);
}
//#endregion



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