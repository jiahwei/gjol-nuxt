export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  console.log('原始请求路径:', url)

  // 检查请求路径是否包含 api
  if (url.pathname.includes('/api/') || url.pathname.includes('api/')) {
    // 移除 api 前缀
    const newPath = url.pathname.replace(/\/api\/|api\//, '/')
    // 设置新的请求路径
    event.node.req.url = newPath + (url.search || '')
    console.log('修改后的请求路径:', newPath)
  }
})
