//@unocss-include

import type { Rule } from 'unocss'

const colorsRules: Rule[] = [
  // 文字颜色规则
  ['text-primary', { color: 'var(--text-color-primary)' }],
  ['text-secondary', { color: 'var(--text-color-secondary)' }],
  ['text-disabled', { color: 'var(--text-color-disabled)' }],
  ['text-brand', { color: 'var(--text-color-brand)' }],
  ['text-link', { color: 'var(--text-color-link)' }],
  ['text-link-hover', { color: 'var(--text-color-link-hover)' }],
  ['text-anti', { color: 'var(--text-color-anti)' }],
  
  // 背景颜色规则
  ['bg-page', { 'background-color': 'var(--bg-color-page)' }],
  ['bg-secondary-page', { 'background-color': 'var(--bg-color-secondarypage)' }],
  ['bg-demo', { 'background-color': 'var(--bg-color-demo)' }],
  ['bg-demo-secondary', { 'background-color': 'var(--bg-color-demo-secondary)' }],
  ['bg-code', { 'background-color': 'var(--bg-color-code)' }],
  ['bg-footer', { 'background-color': 'var(--bg-color-footer)' }],
  ['bg-secondary-footer', { 'background-color': 'var(--bg-color-secondaryfooter)' }],
  ['bg-border', { 'background-color': 'var(--bg-color-borer)' }],
  ['bg-doc-page', { 'background-color': 'var(--bg-color-docpage)' }],
  ['bg-container', { 'background-color': 'var(--bg-color-container)' }],
  ['bg-container-transparent', { 'background-color': 'var(--bg-color-container-transparent)' }],
  ['bg-secondary-container', { 'background-color': 'var(--bg-color-secondarycontainer)' }],
  ['bg-component', { 'background-color': 'var(--bg-color-component)' }],
  ['bg-component-transparent', { 'background-color': 'var(--bg-color-component-transparent)' }],
  ['bg-tag', { 'background-color': 'var(--bg-color-tag)' }],
  ['bg-tab', { 'background-color': 'var(--bg-color-tab)' }],
  ['bg-table', { 'background-color': 'var(--bg-color-table)' }],
  ['bg-thead', { 'background-color': 'var(--bg-color-thead)' }],
  ['bg-navigation', { 'background-color': 'var(--bg-color-navigation)' }],
  ['bg-card', { 'background-color': 'var(--bg-color-card)' }],
  
  // 渐变背景
  ['bg-code-linear', { 'background': 'var(--bg-color-code-linear)' }],
  
//   ['border-base', { color: 'var(--border-color-base)' }], 
]

export default colorsRules

