//@unocss-include
import type { Shortcut } from 'unocss'

export const shortcuts: Shortcut[] = [
  ['layout-other', 'w-full xl:mr-auto xl:ml-auto xl:max-w-screen-2xl px-space-md lg:px-space-xl'],
  ['layout-main', 'w-full xl:mr-auto xl:ml-auto xl:max-w-screen-2xl'],
  ['layout-content', 'px-space-lg lg:px-space-xl w-full xl:mr-auto xl:ml-auto xl:max-w-screen-2xl'],
  ['switch-animation', 'transition duration-300'],
  // 主要文本
  ['main-word', 'text-3xl md:text-4xl font-semibold text-primary]'],
  // 次级文本
  ['second-word', 'text-base mt-space-md text-secondary'],
  // 次级文本中的加重
  ['second-word-font', 'font-bold second-word'],
  // tips
  ['tips-word', 'text-sm text-placeholder'],
]
