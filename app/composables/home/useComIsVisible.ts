import type { VisibilityMapType } from '~/types/home'

/**
 * 组件是否初次进入视口
 * @param id 组件id
 * @returns isVisible 组件是否初次进入视口
 */
export const useComIsVisible = (id: string) => {
  const visibilityMap = inject<VisibilityMapType>('sectionVisibility')
  const isVisible = computed(() => visibilityMap?.value?.[id] ?? false)

  return { isVisible }
}
