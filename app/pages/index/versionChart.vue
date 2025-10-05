<template>
  <div ref="chartContainer" w-90vw md:w-80vw h-600px>
  </div>
</template>

<script lang="ts" setup>
//#region import
// echarts
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent,
  MarkLineComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';
import type { LineSeriesOption } from 'echarts/charts';

import { useMediaQuery } from '@vueuse/core'

// 本地
import type { ListInVersionReturn } from '@/api/bulletin'
//#endregion


//#region 数据处理

const listInfo = inject<Ref<Array<ListInVersionReturn>>>('listInfo', ref([]))
interface resolveList {
  // 版本别称
  acronyms: string;
  startDate: string;
  endDate: string;
  // 版本长度占比
  val: number;
  // 版本总长度
  totalVersionLen: number;
  // 公告数量
  bulletins: number;
  // 公告版本中位数
  medianLen: number;
}
const resolveListInfo = computed<resolveList[]>(() => {
  let maxLen = 0
  listInfo.value.forEach(item => {
    maxLen = Math.max(maxLen, item.totalVersionLen)
  })

  const result: resolveList[] = []
  listInfo.value.forEach(item => {
    // 计算中位数
    const sortedLens = [...item.list.map(item => item.totalLen)].sort((a, b) => a - b)
    let medianLen: number
    if (sortedLens.length === 0) {
      medianLen = 1 // 防止除零错误
    } else if (sortedLens.length % 2 === 0) {
      medianLen = (sortedLens[sortedLens.length / 2 - 1]! + sortedLens[sortedLens.length / 2]!) / 2
    } else {
      medianLen = sortedLens[Math.floor(sortedLens.length / 2)]!
    }

    result.push({
      acronyms: item.acronyms,
      startDate: item.start,
      endDate: item.end.length === 0 ? '-' : item.end,
      val: Number(((item.totalVersionLen / maxLen) * 100).toFixed(1)),
      totalVersionLen: item.totalVersionLen,
      bulletins: item.list.length,
      medianLen: Number(medianLen.toFixed(0))
    })
  })
  return result
})

//#endregion

type EChartsOption = echarts.ComposeOption<LineSeriesOption>;
echarts.use([LineChart, TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, DataZoomComponent, MarkLineComponent, CanvasRenderer]);
const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

const colorMode = useColorMode()
const othercConfig = computed(() => ({

  tooltip: {
    extraCssText: colorMode.value === 'dark' ? 'background-color: #1e2939;' : 'background-color: #fff;'
  }
}))
const { setOtherConfig } = useChartsColorMode(chartInstance, '#171717', '#f5f5f5', othercConfig)
useChartsAutoSize(chartInstance)

function tooltipFormatter(params: any) {
  const sourceItem = params[0].data as resolveList
  return `
  <div class="p-0 bg-white dark:bg-gray-800 flex flex-col gap-space-md max-w-[200px]">
    <span class="color-[var(--text-color-primary)] font-bold break-words">${sourceItem.acronyms}</span>
    <span class="font-medium ">开始于：${sourceItem.startDate}</span>
    <span class="font-medium break-words whitespace-normal">结束于：${sourceItem.endDate}</span>
    <span class="font-medium break-words whitespace-normal">公告共<span class="font-bold px-1">${sourceItem.totalVersionLen.toLocaleString()}</span>字</span>
  </div>
  `
}

function initChart() {
  if (!chartContainer.value) return;
  const isMobile = useMediaQuery('(max-width: 768px)').value

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
    animationDuration: 1000,
    dataset: {
      source: resolveListInfo.value,
      dimensions: ['startDate', 'medianLen', 'bulletins'],
    },
    legend: {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      top: 'top',
      itemGap: 20,
      textStyle: {
        fontSize: isMobile ? 12 : 14
      },
      data: ['公告字数中位数', '公告数量'] // 对应series中的name
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        rotate: isMobile ? 45 : 0,
        interval: isMobile ? 'auto' : 2
      }
    },
    yAxis: [
      // {
      //   type: 'value',
      //   name: '版本内容',
      //   position: 'left',
      //   axisLabel: {
      //     formatter: '{value}%'
      //   },
      //   axisLine: {
      //     show: true,
      //   }
      // },
      {
        type: 'value',
        name: '公告字数的中位数',
        position: 'left',
        axisLabel: {
          formatter: `{value} 字`
        },
        axisLine: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        axisPointer: {
          show: !isMobile,
          type: 'line',
          label: {
            show: true,
            formatter: (params: any) => `${params.value.toLocaleString().replace(/\.\d+/, '')} 字`,
          }
        },
      },
      {
        type: 'value',
        name: '版本延续',
        position: 'right',
        axisLabel: {
          formatter: `{value} 周`
        },
        axisLine: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        axisPointer: {
          show: !isMobile,
          type: 'line',
          label: {
            show: true,
            formatter: (params: any) => `${params.value.toLocaleString().replace(/\.\d+/, '')} 周`,
          }
        },
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter,
      confine: true,
    },
    series: [
      {
        name: '公告字数中位数',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        encode: { x: 'startDate', y: 'medianLen' },
        // markLine: {
        //   data: [
        //     {
        //       name: '白荆回廊发布',
        //       xAxis: '2021-07-24',
        //       label: {
        //         show: true,
        //         formatter: '白荆回廊发布'
        //       }
        //     },
        //     {
        //       name: '白荆回廊开服',
        //       xAxis: '2024-01-12',
        //       label: {
        //         show: true,
        //         formatter: '白荆回廊开服'
        //       }
        //     }
        //   ],
        // }
      },
      {
        name: '公告数量',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        encode: { x: 'startDate', y: 'bulletins' },
        lineStyle: {
          color: '#52c41a'
        },
        itemStyle: {
          color: '#52c41a'
        }
      }],
  }
  chartInstance.value.setOption(option);
  setOtherConfig()
}

const { isVisible } = useComIsVisible('version')

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