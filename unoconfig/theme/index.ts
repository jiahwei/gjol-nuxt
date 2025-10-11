//@unocss-include

import type { PresetUnoTheme } from 'unocss'
import { spacing } from './spacing'
import { colors } from './colors'

export const theme: Partial<PresetUnoTheme> = {
  spacing,
  colors,
  animation: {
    keyframes: {
      slideDown: '{from {opacity: 0.01; height: 0;} to {opacity: 1; height: var(--height);}}',
      slideUp: '{from {opacity: 1; height: var(--height);} to {opacity: 0.01; height: 0;}}',
    },
    durations: {
      slideDown: '250ms',
      slideUp: '200ms',
    },
    timingFns: {
      slide: 'ease-in-out',
    },
  },
}
