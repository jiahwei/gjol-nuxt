import type { ContentTotal } from '@/api/bulletin'
type ParagraphTopic = ContentTotal['type']

type CategoryColors = {
  [key in ParagraphTopic]: string
}
const categoryColors: CategoryColors = {
  商城: '#59c4e6',
  职业调整: '#cbb0e3',
  PVP: '#D16F23',
  PVE: '#4551c1',
  PVX: '#33D7D4',
  格式: '#a5e7f0',
  无更新: '#ca8622',
  通用调整: '#bda29a',
}
export function useChartColors() {
  function getColor(topic: ParagraphTopic): string {
    return categoryColors[topic]
  }
  return {
    getColor
  }
}
