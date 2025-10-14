// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { shortcuts, theme, rules } from './unoconfig'

export default defineConfig({
  shortcuts,
  theme,
  rules,
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetIcons({
      // 只加载实际使用的图标
      collections: {
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default),
        'tabler': () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      }
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: [
          {
            name: 'Noto Serif SC', // 中文简体
            weights: ['400', '500', '700'],
          },
          {
            name: 'Noto Serif', // 英文衬线
            weights: ['400', '500', '700'],
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
