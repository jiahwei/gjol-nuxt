// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
    {
      'layout-main': 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    },
  ],
  theme: {
    colors: {
      // ...
      brand: {
        primary: 'var(--brand-color-5)',
        main: 'var(--brand-color-5)',
        disabled: 'var(--brand-color-3)',
        hover: 'var(--brand-color-4)',
        active: 'var(--brand-color-6)',
        borer: 'var(--bg-color-borer)',
      },
      header: {
        primary: 'var(--bg-color-container)',
      },
      footer: {
        primary: 'var(--bg-color-container)',
      },
      bg: {
        page: 'var(--bg-color-page)',
      },
      font: {
        primary: 'var(--text-color-primary)',
        secondary: 'var(--text-color-secondary)',
        placeholder: 'var(--text-color-placeholder)',
        disabled: 'var(--text-color-disabled)',
        link: 'var(--text-color-link)',
      },
    },
  },
  presets: [
    presetUno(),
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
