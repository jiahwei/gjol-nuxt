import test from 'node:test'
import assert from 'node:assert/strict'
import { sortVersions, latestState } from '../app/utils/archive.mjs'

test('版本按开始日期从早到晚排列，不改变接口原数组', () => {
  const input = [{ id: 2, start: '2023-01-01' }, { id: 1, start: '2021-01-01' }]
  assert.deepEqual(sortVersions(input).map(item => item.id), [1, 2])
  assert.deepEqual(input.map(item => item.id), [2, 1])
})

test('最新公告 404 表示空档案，其他错误保持错误状态', () => {
  assert.equal(latestState(null, { statusCode: 404 }), 'empty')
  assert.equal(latestState(null, { statusCode: 503 }), 'error')
  assert.equal(latestState({ id: 1 }, null), 'ready')
})
