/** Sort a copy because the API does not guarantee version order. */
export function sortVersions(versions) {
  return [...versions].sort((a, b) => (a.start || a.end || '').localeCompare(b.start || b.end || ''))
}

/** The latest-bulletin endpoint returns 404 when its table is empty. */
export function latestState(data, error) {
  if (error) return (error.statusCode ?? error.status) === 404 ? 'empty' : 'error'
  return data ? 'ready' : 'empty'
}

/** @param {string} value */
function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

/** @param {import('../types/archive').ArchiveFilters} filters */
export function validateFilters(filters) {
  if ((filters.from && !isDate(filters.from)) || (filters.to && !isDate(filters.to))) return '请输入有效日期。'
  if (filters.from && filters.to && filters.from > filters.to) return '开始日期不能晚于结束日期。'
  return ''
}

/** @returns {import('../types/archive').ArchiveState} */
export function createArchiveState() {
  return {
    overview: null, overviewState: 'idle', items: [], total: 0, page: 1, pageSize: 20,
    updatesState: 'idle', filters: { version_id: '', from: '', to: '' }, filterError: '', details: {},
  }
}

/** @param {(url: string, options?: { signal?: AbortSignal }) => Promise<any>} fetcher
 * @param {import('../types/archive').ArchiveState} [state]
 */
export function createArchiveController(fetcher, state = createArchiveState()) {
  let overviewRequest = null
  let activeList = null
  let requestNumber = 0
  const detailRequests = new Map()
  const request = (url, options) => {
    try {
      return Promise.resolve(fetcher(url, options))
    }
    catch (error) {
      return Promise.reject(error)
    }
  }
  const dataOf = (response) => {
    if (!response || response.code !== 200 || response.data == null) throw new Error('Invalid archive response')
    return response.data
  }

  function loadOverview() {
    if (overviewRequest) return overviewRequest
    state.overviewState = 'loading'
    overviewRequest = (async () => {
      try {
        const data = dataOf(await request('/api/bulletins/archive/overview'))
        if (!data.coverage || !data.totals || !Array.isArray(data.versions) || !Array.isArray(data.timeline)) throw new Error('Invalid overview')
        state.overview = data
        state.overviewState = 'ready'
      }
      catch { state.overviewState = 'error' }
      finally { overviewRequest = null }
    })()
    return overviewRequest
  }

  function loadUpdates() {
    const query = new URLSearchParams({ page: String(state.page), page_size: String(state.pageSize) })
    for (const key of ['version_id', 'from', 'to']) {
      if (state.filters[key]) query.set(key, state.filters[key])
    }
    const url = `/api/bulletins/archive/updates?${query}`
    if (activeList?.url === url) return activeList.promise
    activeList?.abort.abort()
    const abort = new AbortController()
    const current = ++requestNumber
    state.updatesState = 'loading'
    const promise = (async () => {
      try {
        const data = dataOf(await request(url, { signal: abort.signal }))
        if (!Array.isArray(data.items) || !Number.isInteger(data.total) || !Number.isInteger(data.page) || data.page !== state.page) throw new Error('Invalid archive list')
        if (current !== requestNumber) return
        state.items = data.items
        state.total = data.total
        state.updatesState = data.items.length ? 'ready' : 'empty'
      }
      catch {
        if (current === requestNumber) state.updatesState = 'error'
      }
      finally {
        if (current === requestNumber) activeList = null
      }
    })()
    activeList = { url, abort, promise }
    return promise
  }

  /** @param {import('../types/archive').ArchiveFilters} filters */
  function applyFilters(filters) {
    state.filterError = validateFilters(filters)
    if (state.filterError) return Promise.resolve()
    state.filters = { ...filters }
    state.page = 1
    return loadUpdates()
  }

  /** @param {number} page */
  function setPage(page) {
    if (!Number.isInteger(page) || page < 1) return Promise.resolve()
    state.page = page
    return loadUpdates()
  }

  /** @param {number} id */
  function loadDetail(id) {
    if (!Number.isSafeInteger(id) || id < 1) return Promise.resolve()
    if (state.details[id]?.state === 'ready') return Promise.resolve()
    if (detailRequests.has(id)) return detailRequests.get(id)
    state.details[id] = { state: 'loading', data: null }
    const promise = (async () => {
      try {
        const data = dataOf(await request(`/api/bulletins/archive/updates/${id}`))
        if (data.id !== id || !Array.isArray(data.groups)) throw new Error('Invalid archive detail')
        state.details[id] = { state: 'ready', data }
      }
      catch { state.details[id] = { state: 'error', data: null } }
      finally { detailRequests.delete(id) }
    })()
    detailRequests.set(id, promise)
    return promise
  }
  return { state, loadOverview, loadUpdates, applyFilters, setPage, loadDetail }
}
