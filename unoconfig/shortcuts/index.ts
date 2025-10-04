//@unocss-include
import { shortcuts as  nomalShortcuts} from './nomal'
import { shortcuts as homeShortcuts } from './home'
import { shortcuts as markdownShortcuts } from './markdown'

export const shortcuts = [...nomalShortcuts, ...homeShortcuts, ...markdownShortcuts]
