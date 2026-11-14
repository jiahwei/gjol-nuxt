import test from 'node:test'
import assert from 'node:assert/strict'
import { buildTimelineYears } from '../app/utils/timeline-axis.mjs'

test('历程以真实年份分段并保留没有更新的年份', () => {
  const result = buildTimelineYears([
    { id: 3, date: '2022-07-01' },
    { id: 1, date: '2020-12-01' },
    { id: 2, date: '2020-02-01' },
  ])
  assert.deepEqual(result.map(item => item.label), ['2020', '2021', '2022'])
  assert.deepEqual(result.map(item => item.items.map(entry => entry.id)), [[2, 1], [], [3]])
})

test('无效日期不会被编入错误年份，仍保留更新入口', () => {
  const result = buildTimelineYears([{ id: 1, date: '2023-02-30' }, { id: 2, date: '2024-01-01' }])
  assert.deepEqual(result.map(item => item.label), ['2024', '日期待确认'])
  assert.equal(result[1].items[0].id, 1)
})
