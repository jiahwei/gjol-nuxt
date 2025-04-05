<template>
  <div id="main" class="w-full h-full" @click="test"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import type { ShallowRef } from 'vue'
import type { BulletinInfo, VersionInfo } from './testData'
import { testData } from './testData'
import moment from '~/plugins/moment'

// const config = useRuntimeConfig()
async function test() {
  await $fetch(`/api/bulletins/new`, {
    method: 'GET',
  })
}

type EChartsOption = echarts.EChartsOption
const chartDom: ShallowRef<HTMLElement | null> = shallowRef(null)
const myChart: ShallowRef<echarts.EChartsType | null> = shallowRef(null)
const option: Ref<EChartsOption> = ref({})
option.value = {
  title: {
    text: 'TEST',
    left: '1%',
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    bottom: '10%',
  },
  // dataZoom: [
  //   {
  //     type: 'slider',
  //   },
  // ],
  legend: {},
  xAxis: {},
  yAxis: {
    type: 'value',
  },
  series: [],
}
function initChart() {
  chartDom.value = document.getElementById('main')
  myChart.value = echarts.init(chartDom.value)
  myChart.value.setOption(option.value)
}
// 数据处理
interface VersionMap {
  [key: string]: BulletinInfo | Pick<VersionInfo, 'acronyms'>
}
const vsrsionMap: VersionMap = reactive({})

function showAllData() {
  const xData: string[] = []
  const seriesData: number[] = []
  testData.forEach((version) => {
    version.list.forEach((bulletin) => {
      vsrsionMap[bulletin.date] = { acronyms: version.acronyms, ...bulletin }
      xData.push(bulletin.date)
      seriesData.push(bulletin.totalLen)
    })
  })
  option.value.xAxis = {
    data: xData,
    type: 'category',
  }
  option.value.series = {
    data: seriesData,
    type: 'line',
    smooth: true,
  }
  if (myChart.value) {
    myChart.value.setOption(option.value)
  }
}
function showDataByVersion() {
  const seriesData: echarts.SeriesOption[] = []
  let maxVersionNum: number = 0
  testData.forEach((version) => {
    const data: number[] = []
    version.list.forEach((bulletin, index) => {
      if (index !== 0) {
        data.push(bulletin.totalLen)
      }
    })
    maxVersionNum = data.length > maxVersionNum ? data.length : maxVersionNum
    seriesData.push({
      name: version.acronyms,
      type: 'line',
      smooth: true,
      data: data,
    })
  })
  option.value.xAxis = {
    data: Array.from({ length: maxVersionNum }, (_, i) => i),
    type: 'category',
  }
  option.value.series = seriesData
  if (myChart.value) {
    myChart.value.setOption(option.value)
  }
}
function showMedianByVersion() {
  const seriesData: echarts.SeriesOption[] = []
  const avgData: number[] = []
  const medianData: number[] = []
  const versionList: string[] = []
  const versionDay: number[] = []
  testData.forEach((version) => {
    const data = version.list
    const sum = data.reduce((sum, item) => sum + item.totalLen, 0)
    const avg = sum / data.length
    versionList.push(version.acronyms)
    avgData.push(Number(avg.toFixed(2)))
    data.sort((a, b) => a.totalLen - b.totalLen)
    let median: number = 0
    if (data.length % 2 === 0) {
      median = (data[data.length / 2 - 1].totalLen + data[data.length / 2].totalLen) / 2
    }
    else {
      median = data[(data.length - 1) / 2].totalLen
    }
    medianData.push(median)
    const day = moment(data[0].date).diff(moment(data[data.length - 1].date), 'days')
    versionDay.push(day)
  })
  seriesData.push({
    name: '平均数',
    type: 'line',
    smooth: true,
    data: avgData,
  })
  seriesData.push({
    name: '中位数',
    type: 'line',
    smooth: true,
    data: medianData,
  })
  seriesData.push({
    name: '版本天数',
    type: 'line',
    yAxisIndex: 1,
    smooth: true,
    data: versionDay,
  })
  option.value.xAxis = {
    data: versionList,
    type: 'category',
  }
  option.value.yAxis = [
    {
      type: 'value',
      name: '平均数',
      position: 'left',
      alignTicks: true,
      offset: 80,
      axisLabel: {
        formatter: '{value} 字',
      },
    },
    {
      type: 'value',
      name: '版本天数',
      position: 'right',
      alignTicks: true,
      offset: 80,
      axisLabel: {
        formatter: '{value} 天',
      },
    },
  ]
  option.value.series = seriesData
  if (myChart.value) {
    myChart.value.setOption(option.value)
  }
}
onMounted(() => {
  showMedianByVersion()
  initChart()
})
</script>

<style></style>
