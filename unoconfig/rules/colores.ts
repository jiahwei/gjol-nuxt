//@unocss-include

import type { Rule } from 'unocss'

const colorsRules: Rule[] = [
  ['text-primary', { color: 'var(--text-color-primary)' }],
  ['text-secondary', { color: 'var(--text-color-secondary)' }],
  ['text-disabled', { color: 'var(--text-color-disabled)' }],
  ['text-brand', { color: 'var(--text-color-brand)' }],
  ['text-link', { color: 'var(--text-color-link)' }],
  ['text-link-hover', { color: 'var(--text-color-link-hover)' }],
//   ['border-base', { color: 'var(--border-color-base)' }], 
]

export default colorsRules

