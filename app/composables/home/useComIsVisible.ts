import type { VisibilityMapType } from '~/types/home';


export const useUseComIsVisible = (id: string) => {
  const visibilityMap = inject<VisibilityMapType>('sectionVisibility')
  const isVisible = computed(() => visibilityMap?.value?.[id] ?? false)

  return { isVisible }
}
