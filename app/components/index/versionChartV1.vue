<template>
  <div ref="chartContainer" w-80vw h-600px>
  </div>
</template>

<script lang="ts" setup>
import type { ListInVersionReturn as OriginalListInVersionReturn } from '@/api/bulletin'
import { useChartsColorMode } from '~/composables'

import * as echarts from 'echarts/core';
import { TreemapChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers';
import type { TreemapSeriesOption } from 'echarts/charts';

type EChartsOption = echarts.ComposeOption<TreemapSeriesOption>;
type ListInVersionReturn = OriginalListInVersionReturn & {
  children?: Array<OriginalListInVersionReturn>
}
echarts.use([TreemapChart, TitleComponent, CanvasRenderer]);


//#region 数据处理

const listInfo = inject('listInfo', ref([]))

function transformToEChartsData(list: Array<ListInVersionReturn>) {
  if (!Array.isArray(list) || list.length === 0) return []

  const fakeVersion: ListInVersionReturn & { children: Array<ListInVersionReturn> } = {
    id: -1,
    acronyms: '寰宇会',
    list: [],
    totalVersionLen: 0,
    children: [],
    start: '',
    end: '',
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
    } else {
      return base
    }
  })
}

//#endregion

const chartContainer = shallowRef<HTMLElement | null>(null);
const chartInstance = shallowRef<echarts.ECharts | null>(null);
const colorMode = useColorMode()

const othercConfig = computed(() => ({
  series: [
    {
      itemStyle: {
        borderColor: colorMode.value === 'dark' ? '#171717' : '#f5f5f5',
      }
    }
  ]
}))

useChartsColorMode(chartInstance, '#171717', '#f5f5f5', othercConfig)

function initChart() {
  if (!chartContainer.value) return;

  chartInstance.value = echarts.init(chartContainer.value);

  const option: EChartsOption = {
    series: [
      {
        name: '版本信息',
        type: 'treemap',
        itemStyle: {
          borderColor: colorMode.value === 'dark' ? '#171717' : '#f5f5f5',
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

<style></style>