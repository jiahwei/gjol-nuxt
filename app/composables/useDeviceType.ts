export const useDeviceType = () => {
  const ua = import.meta.server
    ? useRequestHeaders()['user-agent'] || ''
    : navigator.userAgent

  const width = import.meta.client ? window.innerWidth : undefined

  const isMobileUA = /mobile|android|iphone|ipod/i.test(ua)
  const isTabletUA = /ipad|tablet/i.test(ua)
  const isDesktopUA = !isMobileUA && !isTabletUA

  const isMobileWidth = width !== undefined && width < 768
  const isTabletWidth = width !== undefined && width >= 768 && width < 1024
  const isDesktopWidth = width !== undefined && width >= 1024

  const isMobile = isMobileUA || isMobileWidth
  const isTablet = isTabletUA || isTabletWidth
  const isDesktop = isDesktopUA || isDesktopWidth

  return {
    isMobile,
    isTablet,
    isDesktop,
    ua,
    width,
  }
}
