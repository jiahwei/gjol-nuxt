//@unocss-include

import type { Rule } from 'unocss'

const colorsRules: Rule[] = [
  // 文字颜色规则
  ['text-primary', { color: 'var(--text-color-primary)' }],
  ['text-secondary', { color: 'var(--text-color-secondary)' }],
  ['text-placeholder', { color: 'var(--text-color-placeholder)' }],
  ['text-disabled', { color: 'var(--text-color-disabled)' }],
  ['text-link', { color: 'var(--text-color-link)' }],
  ['text-foreground', { color: 'var(--text-color-foreground)' }],

  // 背景颜色规则
  ['bg-page', { 'background-color': 'var(--bg-color-page)' }],
  ['bg-secondary-page', { 'background-color': 'var(--bg-color-secondarypage)' }],
  ['bg-code', { 'background-color': 'var(--bg-color-code)' }],
  ['bg-footer', { 'background-color': 'var(--bg-color-footer)' }],
  ['bg-border', { 'background-color': 'var(--bg-color-borer)' }],
  ['bg-button', { 'background-color': 'var(--bg-color-button)' }],
]

export default colorsRules

