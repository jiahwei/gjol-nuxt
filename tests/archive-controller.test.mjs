import test from 'node:test'
import assert from 'node:assert/strict'
import * as archive from '../app/utils/archive.mjs'

const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
const response = data => ({ code: 200, message: 'OK', data })
const list = (items, page = 1) => ({ items, total: items.length, page, page_size: 20 })

test('日期筛选拒绝不存在的日期及倒置范围', () => {
  assert.ok(archive.validateFilters({ version_id: '', from: '2023-02-30', to: '' }))
  assert.ok(archive.validateFilters({ version_id: '', from: '2024-03-01', to: '2024-02-29' }))
  assert.equal(archive.validateFilters({ version_id: '', from: '2024-02-29', to: '2024-03-01' }), '')
})

test('筛选变化重置页码，旧请求迟到不能覆盖新结果', async () => {
  const requests = []
  const controller = archive.createArchiveController((url) => {
    const pending = deferred()
    requests.push({ url, ...pending })
    return pending.promise
  })
  const old = controller.setPage(2)
  const current = controller.applyFilters({ version_id: '7', from: '2024-01-01', to: '' })
  assert.equal(controller.state.page, 1)
  assert.match(requests[1].url, /version_id=7/)
  requests[1].resolve(response(list([{ id: 7 }])))
  await current
  requests[0].resolve(response(list([{ id: 2 }], 2)))
  await old
  assert.deepEqual(controller.state.items, [{ id: 7 }])
  assert.equal(controller.state.page, 1)
})

test('同一页重复加载共享请求，失败后可以重试', async () => {
  const requests = []
  const controller = archive.createArchiveController(() => {
    const d = deferred()
    requests.push(d)
    return d.promise
  })
  const first = controller.loadUpdates()
  const duplicate = controller.loadUpdates()
  assert.equal(requests.length, 1)
  requests[0].reject(new Error('offline'))
  await Promise.all([first, duplicate])
  assert.equal(controller.state.updatesState, 'error')
  const retry = controller.loadUpdates()
  assert.equal(requests.length, 2)
  requests[1].resolve(response(list([])))
  await retry
  assert.equal(controller.state.updatesState, 'empty')
})

test('详情按 ID 独立缓存并去重，不会交叉覆盖', async () => {
  const requests = []
  const controller = archive.createArchiveController((url) => {
    const d = deferred()
    requests.push({ url, ...d })
    return d.promise
  })
  const first = controller.loadDetail(1)
  const duplicate = controller.loadDetail(1)
  const second = controller.loadDetail(2)
  assert.equal(requests.length, 2)
  requests[1].resolve(response({ id: 2, groups: [] }))
  requests[0].resolve(response({ id: 1, groups: [] }))
  await Promise.all([first, duplicate, second])
  assert.equal(controller.state.details[1].data.id, 1)
  assert.equal(controller.state.details[2].data.id, 2)
  await controller.loadDetail(1)
  assert.equal(requests.length, 2)
})

test('同步请求错误后总览和详情仍可重试', async () => {
  let failing = true
  const controller = archive.createArchiveController((url) => {
    if (failing) throw new Error('offline')
    if (url.endsWith('/overview')) return Promise.resolve(response({ coverage: {}, totals: {}, versions: [], timeline: [] }))
    return Promise.resolve(response({ id: 3, groups: [] }))
  })
  await controller.loadOverview()
  await controller.loadDetail(3)
  assert.equal(controller.state.overviewState, 'error')
  assert.equal(controller.state.details[3].state, 'error')
  failing = false
  await controller.loadOverview()
  await controller.loadDetail(3)
  assert.equal(controller.state.overviewState, 'ready')
  assert.equal(controller.state.details[3].state, 'ready')
})

test('总览必须包含完整时间序列，不能把缺字段当作空历史', async () => {
  const controller = archive.createArchiveController(() => Promise.resolve(response({ coverage: {}, totals: {}, versions: [] })))
  await controller.loadOverview()
  assert.equal(controller.state.overviewState, 'error')
})
