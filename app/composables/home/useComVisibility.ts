import type { VisibilityMapTypeRef } from '~/types/home'

export function useSectionVisibility(homeDom: Ref<HTMLElement | null>) {

  const visibilityMap: VisibilityMapTypeRef = ref({})
  let ids: string[] = []

  function initVisibilityMap() {
    const children = homeDom.value?.children
    if (!children) return
    ids = Array.from(children)
      .map((item) => item.id)
      .filter((id) => id)
    console.log('ids', ids)
    ids.forEach((id) => {
      visibilityMap.value[id] = false
    })
  }

  function setIntersectionObserver() {
    const { ssrContext } = useNuxtApp()
    if (ssrContext) return

    const options = {
      root: null,
      threshold: 0.4,
    }

    const observer = new IntersectionObserver(callback, options)
    
    ids.forEach((id) => {
      const el = document.getElementById(id)
      visibilityMap.value[id] = false

      if (el) {
        observer.observe(el)
      }
    })

    function callback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          visibilityMap.value[id] = true
          console.log('进入视图', id)
          observer.unobserve(entry.target)
        } else {
          console.log('未进入视图', entry.target.id)
        }
      })
    }
  }

  onMounted(() => {
    initVisibilityMap()
    setIntersectionObserver()
  })

  return {
    visibilityMap,
  }
}
