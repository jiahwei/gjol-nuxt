//@unocss-include
import type { Rule } from 'unocss'
import spacingRules from "./spacing"
import colorsRules from './colores';

export const rules: Rule[] = [...spacingRules, ...colorsRules]