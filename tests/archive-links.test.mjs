import test from 'node:test'
import assert from 'node:assert/strict'
import { safeSourceUrl } from '../app/utils/archive-links.mjs'

test('官方来源只允许绝对的 HTTP 或 HTTPS 链接', () => {
  assert.equal(safeSourceUrl('https://example.com/news'), 'https://example.com/news')
  assert.equal(safeSourceUrl('http://example.com/'), 'http://example.com/')
  assert.equal(safeSourceUrl('javascript:alert(1)'), null)
  assert.equal(safeSourceUrl('//example.com/news'), null)
  assert.equal(safeSourceUrl('/news'), null)
  assert.equal(safeSourceUrl(''), null)
})

test('已知的公告来源代码显示为明确中文类型', async () => {
  const { sourceLabel } = await import('../app/utils/archive-links.mjs')
  assert.equal(sourceLabel('version'), '版本更新公告')
  assert.equal(sourceLabel('skill'), '职业调整公告')
  assert.equal(sourceLabel('routine'), '普通公告')
  assert.equal(sourceLabel('unknown'), 'unknown')
})
