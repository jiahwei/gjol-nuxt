import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/')) {
    return
  }

  const proxyUrl = useRuntimeConfig().apiBase as string
  const path = event.path.replace(/^\/api\//, '')
  const targetUrl = joinURL(proxyUrl, path)

  return proxyRequest(event, targetUrl)
})
