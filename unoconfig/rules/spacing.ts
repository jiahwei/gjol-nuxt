import type { Rule } from 'unocss'
import { theme } from '../index'

const spacing = theme.spacing ?? {}
const spacingRules: Rule[] = []

for (const key of Object.keys(spacing)) {
  const value = spacing[key]
  if (!value) continue

  spacingRules.push(
    [`m-${key}`, { margin: value }],
    [`p-${key}`, { padding: value }],
    [`px-${key}`, { 'padding-left': value, 'padding-right': value }],
    [`py-${key}`, { 'padding-top': value, 'padding-bottom': value }],
    [`pt-${key}`, { 'padding-top': value }],
    [`pb-${key}`, { 'padding-bottom': value }],
    [`pl-${key}`, { 'padding-left': value }],
    [`pr-${key}`, { 'padding-right': value }],
    [`mx-${key}`, { 'margin-left': value, 'margin-right': value }],
    [`my-${key}`, { 'margin-top': value, 'margin-bottom': value }],
    [`mt-${key}`, { 'margin-top': value }],
    [`mb-${key}`, { 'margin-bottom': value }],
    [`ml-${key}`, { 'margin-left': value }],
    [`mr-${key}`, { 'margin-right': value }],
    [`gap-${key}`, { gap: value }],
    [`space-x-${key}`, { 'column-gap': value }],
    [`space-y-${key}`, { 'row-gap': value }],
    [`w-${key}`, { width: value }],
    [`h-${key}`, { height: value }],
    [`min-w-${key}`, { 'min-width': value }],
    [`max-w-${key}`, { 'max-width': value }],
    [`min-h-${key}`, { 'min-height': value }],
    [`max-h-${key}`, { 'max-height': value }],
    [`inset-${key}`, { inset: value }],
    [`top-${key}`, { top: value }],
    [`bottom-${key}`, { bottom: value }],
    [`left-${key}`, { left: value }],
    [`right-${key}`, { right: value }],
  )
}


export default spacingRules

