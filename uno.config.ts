// uno.config.ts
import type { UserConfig } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// import { shortcuts } from './unoconfig'

type themeType = UserConfig['theme']

const theme: themeType = {
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
  },
  colors: {
    // 尺度系统
    'scale-1': '4px',
    'scale-2': '8px',
    'scale-3': '12px',
    'scale-4': '16px',
    'scale-6': '24px',
    'scale-8': '32px',
    'scale-12': '48px',
    // 字体大小
    'font-size-12': '12px',
    'font-size-14': '14px',
    'font-size-16': '16px',
    'font-size-18': '18px',
    'font-size-20': '20px',
    'font-size-24': '24px',
    'font-size-32': '32px',
    'font-size-48': '48px',
    // 灰色
    'gray-1': '#F8F9FA',
    'gray-2': '#E9ECEF',
    'gray-3': '#DEE2E6',
    'gray-4': '#CED4DA',
    'gray-5': '#ADB5BD',
    'gray-6': '#6C757D',
    'gray-7': '#495057',
    'gray-8': '#343A40',
    'gray-9': '#212529',
    // 亮色模式颜色
    'light-bg': '#fff',
    'light-bg-secondary': '#f5f5f5',
    'light-container': '#fff',
    'light-container-secondary': '#f5f5f5',
    'light-card': '#fff',
    'light-header': 'rgba(255, 255, 255, 0.9)',
    'light-footer': '#eee',
    'light-border': '#e7e7e7',
    'light-text-primary': 'rgba(0, 0, 0, 0.9)',
    'light-text-secondary': 'rgba(0, 0, 0, 0.6)',
    'light-text-placeholder': 'rgba(0, 0, 0, 0.4)',
    'light-text-disabled': 'rgba(0, 0, 0, 0.26)',
    'light-brand': '#0f95fb',
    'light-brand-hover': '#6bb2ff',
    'light-brand-active': '#007ad3',

    // 暗色模式颜色
    'dark-bg': '#242424',
    'dark-bg-secondary': '#181818',
    'dark-container': '#242424',
    'dark-container-secondary': '#383838',
    'dark-card': '#383838',
    'dark-header': 'rgba(44, 44, 44, 0.9)',
    'dark-footer': '#181818',
    'dark-border': '#101010',
    'dark-text-primary': 'rgba(255, 255, 255, 0.9)',
    'dark-text-secondary': 'rgba(255, 255, 255, 0.55)',
    'dark-text-placeholder': 'rgba(255, 255, 255, 0.35)',
    'dark-text-disabled': 'rgba(255, 255, 255, 0.22)',
    'dark-brand': '#0894fa',
    'dark-brand-hover': '#007ad3',
    'dark-brand-active': '#6bb2ff',
  },
}

export default defineConfig({
  shortcuts: {
    'layout-main': 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    // 动画过渡
    'switch-animation': 'transition duration-300',
    // 背景颜色
    'bg-base': 'bg-light-bg dark:bg-dark-bg switch-animation',
    'bg-container': 'bg-light-container dark:bg-dark-container switch-animation',
    'bg-card': 'bg-light-card dark:bg-dark-card switch-animation',
    'bg-header': 'bg-light-header dark:bg-dark-header backdrop-blur-8 switch-animation',
    'bg-footer': 'bg-light-footer dark:bg-dark-footer switch-animation',
    // 文本颜色
    'text-primary': 'text-light-text-primary dark:text-dark-text-primary switch-animation',
    'text-secondary': 'text-light-text-secondary dark:text-dark-text-secondary switch-animation',
    'text-disabled': 'text-light-text-disabled dark:text-dark-text-disabled switch-animation',
    'text-brand': 'text-light-brand dark:text-dark-brand switch-animation',
    'text-link': 'text-light-brand dark:text-dark-brand hover:text-light-brand-hover dark:hover:text-dark-brand-hover switch-animation',
    // 边框颜色
    'border-base': 'border-light-border dark:border-dark-border switch-animation',
    // 开关组件样式
    'switch-label-base': 'bg-gray-200 dark:bg-gray-800 switch-animation',
    'switch-span-base': 'bg-white dark:bg-gray-300 switch-animation',
  },
  theme,
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
