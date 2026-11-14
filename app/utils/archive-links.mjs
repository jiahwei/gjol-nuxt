/** Only absolute HTTP(S) URLs may be opened as source links. */
export function safeSourceUrl(value) {
  if (typeof value !== 'string') return null
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  }
  catch {
    return null
  }
}

/** Display labels for the source codes used by the archive API. */
export function sourceLabel(type) {
  const labels = { routine: '普通公告', normal: '普通公告', version: '版本更新公告', skill: '职业调整公告', technical: '技改公告', tech: '技改公告' }
  return labels[type] || type || '公告来源'
}
