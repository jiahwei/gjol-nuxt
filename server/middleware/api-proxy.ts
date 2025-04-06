import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  // 检查路径是否以/api/开头
  console.log(event)
  if (!event.path.startsWith('/api/')) {
    return // 不处理非/api/路径
  }

  const proxyUrl = useRuntimeConfig().apiBase as string
  const targetUrl = joinURL(proxyUrl, event.path)

  return proxyRequest(event, targetUrl)
})
