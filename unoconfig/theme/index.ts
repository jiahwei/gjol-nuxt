//@unocss-include

import type { PresetUnoTheme } from 'unocss'
import { spacing } from './spacing'
import { colors } from './colors'

export const theme: Partial<PresetUnoTheme> = {
  spacing,
  colors,
}
