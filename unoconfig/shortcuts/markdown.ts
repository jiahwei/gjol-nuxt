//@unocss-include
import type { Shortcut } from 'unocss'

export const shortcuts: Shortcut[] = [
  // Markdown 容器
  ['md-container', 'prose prose-lg dark:prose-invert max-w-none leading-relaxed'],

  // 标题样式
  ['md-h1', 'text-3xl md:text-4xl font-bold mb-space-lg mt-space-xl text-[var(--text-color-primary)] border-b border-[var(--bg-color-borer)] pb-space-sm'],
  ['md-h2', 'text-2xl md:text-3xl font-semibold mb-space-md mt-space-lg text-[var(--text-color-primary)]'],
  ['md-h3', 'text-xl md:text-2xl font-medium mb-space-sm mt-space-md text-[var(--text-color-primary)]'],
  ['md-h4', 'text-lg md:text-xl font-medium mb-space-xs mt-space-sm text-[var(--text-color-secondary)]'],
  ['md-h5', 'text-base md:text-lg font-medium mb-space-xs mt-space-sm text-[var(--text-color-secondary)]'],
  ['md-h6', 'text-sm md:text-base font-medium mb-space-xs mt-space-xs text-[var(--text-color-placeholder)]'],

  // 段落和文本
  ['md-p', 'mb-space-md leading-relaxed text-[var(--text-color-primary)]'],
  ['md-text', 'text-[var(--text-color-primary)]'],

  // 强调样式
  ['md-strong', 'font-bold text-[var(--text-color-primary)]'],
  ['md-em', 'italic text-[var(--text-color-secondary)]'],
  ['md-mark', 'bg-yellow-200 dark:bg-yellow-800 px-1 rounded'],
  ['md-del', 'line-through text-[var(--text-color-placeholder)]'],

  // 链接样式
  ['md-link', 'text-primary hover:text-link underline decoration-1 underline-offset-2 transition-colors duration-200'],
  ['md-link-external', 'md-link after:content-["↗"] after:ml-1 after:text-xs'],

  // 代码样式
  ['md-code-inline', 'bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-mono'],
  ['md-code-block', 'bg-gray-50 dark:bg-gray-900 border border-[var(--bg-color-borer)] rounded-lg p-space-md overflow-x-auto'],
  ['md-pre', 'font-mono text-sm leading-relaxed'],

  // 引用样式
  ['md-blockquote', 'border-l-4 border-primary bg-gray-50 dark:bg-gray-800/50 pl-space-md py-space-sm my-space-md italic'],
  ['md-blockquote-text', 'text-[var(--text-color-secondary)]'],

  // 列表样式
  ['md-ul', 'list-disc list-inside mb-space-md pl-space-md space-y-2'],
  ['md-ol', 'list-decimal list-inside mb-space-md pl-space-md space-y-2'],
  ['md-li', 'text-[var(--text-color-primary)] leading-relaxed'],
  ['md-li-nested', 'ml-space-md mt-2'],

  // 表格样式
  ['md-table', 'w-full border-collapse border border-[var(--bg-color-borer)] rounded-lg overflow-hidden my-space-md'],
  ['md-th', 'bg-gray-100 dark:bg-gray-800 border border-[var(--bg-color-borer)] px-space-sm py-space-xs font-semibold text-left text-[var(--text-color-primary)]'],
  ['md-td', 'border border-[var(--bg-color-borer)] px-space-sm py-space-xs text-[var(--text-color-primary)]'],
  ['md-tr-even', 'bg-gray-50 dark:bg-gray-800/30'],

  // 分割线
  ['md-hr', 'border-none h-px bg-borer my-space-lg'],

  // 图片样式
  ['md-img', 'max-w-full h-auto rounded-lg shadow-sm my-space-md'],
  ['md-img-caption', 'text-sm text-[var(--text-color-placeholder)] text-center mt-2 italic'],

  // 特殊容器
  ['md-info', 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-space-md my-space-md rounded-r'],
  ['md-warning', 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-space-md my-space-md rounded-r'],
  ['md-error', 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-space-md my-space-md rounded-r'],
  ['md-success', 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-space-md my-space-md rounded-r'],

  // 徽章和标签
  ['md-badge', 'inline-block bg-primary text-white px-2 py-1 rounded-full text-xs font-medium'],
  ['md-tag', 'inline-block bg-gray-200 dark:bg-gray-700 text-[var(--text-color-primary)] px-2 py-1 rounded text-sm'],

  // 键盘按键样式
  ['md-kbd', 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs font-mono shadow-sm'],
]