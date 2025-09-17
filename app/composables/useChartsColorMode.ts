import type { ECharts, EChartsCoreOption } from 'echarts/core'

export function useChartsColorMode(
  chartInstance: Ref<ECharts | null>,
  darkColor: string = '#242424',
  lightColor: string = '#fff',
  config: Ref<EChartsCoreOption> = ref({})) {
  const colorMode = useColorMode()
  watch(colorMode, () => {
    if (chartInstance.value && colorMode.value) {
      const option = {
        backgroundColor: colorMode.value === 'dark' ? darkColor : lightColor,
        ...config.value,
      }
      chartInstance.value.setTheme(colorMode.value === 'dark' ? 'dark' : 'default')
      chartInstance.value.setOption(option)
    }
  })
  return {
    colorMode
  }
}
