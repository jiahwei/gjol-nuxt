<template>
  <div ref="chartContainer" w-300px h-300px>
  </div>
</template>

<script lang="ts" setup>
import type { BulletinInfo } from '@/api/bulletin'
import { useChartsColorMode, useChartColors, useComIsVisible } from '~/composables'


const newsInfo = inject<Ref<BulletinInfo>>('newsInfo')!
if (!newsInfo) {
  throw new Error('newsInfo is not provided');
}
const isSuspended = inject<Ref<boolean>>('isSuspended', ref(false))
if (!isSuspended) {
  throw new Error('isSuspended is not provided');
}

const { isVisible } = useComIsVisible('news')

watch(isVisible, (visible) => {
  if (visible) {
    initChart()
  }
})

//#region 图表
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import type { PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([PieChart, CanvasRenderer, LabelLayout, TooltipComponent, LegendComponent]);
type EChartsOption = echarts.ComposeOption<PieSeriesOption>;
type ContentTotalArrType = BulletinInfo['contentTotalArr']

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);

useChartsColorMode(chartInstance)
const { getColor } = useChartColors()

function transformToEChartsData(list: ContentTotalArrType) {
  if (!Array.isArray(list) || list.length === 0) return []

  return list.map((item) => {
    return {
      value: item?.leng,
      name: item?.type,
      itemStyle: {
        color: getColor(item?.type)
      }
    }
  })
}
function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value: number) => value + '字',
    },
    series: [
      {
        name: newsInfo.value?.name?.slice(9) ?? '公告内容分布',
        type: 'pie',
        radius: ['40%', '70%'],
        data: transformToEChartsData(newsInfo.value?.contentTotalArr),
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
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
