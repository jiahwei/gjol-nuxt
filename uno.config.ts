// uno.config.ts
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
    presetIcons(),
    presetTypography(),
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
