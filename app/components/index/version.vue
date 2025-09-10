<template>
  <div ref="chartContainer" w-full h-600px>
  </div>
</template>

<script lang="ts" setup>
import { bulletinApi } from '@/api/index'
import type { ListInVersionReturn as OriginalListInVersionReturn } from '@/api/bulletin'

type ListInVersionReturn = OriginalListInVersionReturn & {
  children?: Array<OriginalListInVersionReturn>
}

import * as echarts from 'echarts/core';
import { TreemapChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';

import type { TreemapSeriesOption } from 'echarts/charts';

type EChartsOption = echarts.ComposeOption<TreemapSeriesOption>;

echarts.use([TreemapChart, TitleComponent, CanvasRenderer]);

//#region 数据处理
const { data: listInfo } = await bulletinApi.getListInVersion()

function transformToEChartsData(list: Array<ListInVersionReturn>) {
  if (!Array.isArray(list) || list.length === 0) return []

  const fakeVersion: ListInVersionReturn & { children: Array<ListInVersionReturn> } = {
    id: -1,
    acronyms: '寰宇会',
    list: [],
    totalVersionLen: 0,
    children: []
  }

  const normalVersionList: Array<ListInVersionReturn> = []

  list.forEach((item) => {
    if (item.acronyms.includes('寰宇会')) {
      fakeVersion.totalVersionLen += item.totalVersionLen
      fakeVersion.children.push(item)
    } else {
      normalVersionList.push(item)
    }
  })

  const newList = [...normalVersionList, fakeVersion]

  function getChildrenCount(list: Array<ListInVersionReturn>) {
    return list.map((item) => {
      return {
        name: item.acronyms,
        value: item.totalVersionLen,
      }
    })
  }

  const resolveList = newList.sort((a, b) => {
    return a.totalVersionLen - b.totalVersionLen
  })
  return resolveList.map((item) => {
    const base = {
      name: item.acronyms,
      value: item.totalVersionLen,
    }
    if (item.acronyms === '寰宇会') {
      return {
        ...base,
        children: getChildrenCount(item?.children ?? []),
      }
    }else {
      return base
    }
  })
}

//#endregion

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);
function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
    series: [
      {
        name: '版本信息',
        type: 'treemap',
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          gapWidth: 2
        },
        breadcrumb: {
          show: false
        },
        roam: false,
        leafDepth: 1,
        data: transformToEChartsData(listInfo.value || []),
      }
    ]
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