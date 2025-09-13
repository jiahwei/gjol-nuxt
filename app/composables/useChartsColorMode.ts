import type { ECharts } from 'echarts/core'
export const useChartsColorMode = (chartInstance: Ref<ECharts | null>) => {
  const colorMode = useColorMode()
  watch(colorMode, () => {
    if (chartInstance.value && colorMode.value) {
      const option = {
        backgroundColor: colorMode.value === 'dark' ? '#242424' : '#fff',
      }
      // chartInstance.value.setOption(option)
      chartInstance.value.setTheme(colorMode.value === 'dark' ? 'dark' : 'default')
      chartInstance.value.setOption(option)
    }
  })
}
