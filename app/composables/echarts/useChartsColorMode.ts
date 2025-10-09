import type { ECharts, EChartsCoreOption } from 'echarts/core'

export function useChartsColorMode(
  chartInstance: Ref<ECharts | null>,
  darkColor: string = '#242424',
  lightColor: string = '#fff',
  config: Ref<EChartsCoreOption> = ref({}),
) {
  const colorMode = useColorMode()
  watch(colorMode, () => {
    if (chartInstance.value && colorMode.value) {
      const option = {
        backgroundColor: colorMode.value === 'dark' ? darkColor : lightColor,
        ...config.value,
      }
      chartInstance.value.setTheme(colorMode.value === 'dark' ? 'walden' : 'walden')
      chartInstance.value.setOption(option)
    }
  })

  function setOtherConfig() {
    if (chartInstance.value) {
      chartInstance.value.setOption(config.value)
    }
  }
  return {
    colorMode,
    setOtherConfig
  }
}
