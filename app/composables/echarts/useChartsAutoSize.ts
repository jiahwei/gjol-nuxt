import type { ECharts } from 'echarts/core'

export function useChartsAutoSize(
  chartInstance: Ref<ECharts | null>,
  container: HTMLElement = document?.body,
) {
  let resizeObserver: ResizeObserver | null = null
  function handleResize() {
    if (chartInstance.value) {
      chartInstance.value.resize()
    }
  }

  function startObserving() {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(container)
    } else {
      window.addEventListener('resize', handleResize)
    }
  }

  function stopObserving() {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    } else {
      window.removeEventListener('resize', handleResize)
    }
  }

  // 组件卸载时清理
  onBeforeUnmount(() => {
    stopObserving()
  })

  onMounted(() => {
    startObserving()
  })
}
