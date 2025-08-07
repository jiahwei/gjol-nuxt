import type { UserConfig } from 'unocss'

type themeType = UserConfig['theme']

const theme: themeType = {
  colors: {
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
export default theme
