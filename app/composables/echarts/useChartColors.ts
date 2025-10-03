import type { ContentTotal } from '@/api/bulletin'
type ParagraphTopic = ContentTotal['type']

type CategoryColors = {
  [key in ParagraphTopic]: string
}
const categoryColors: CategoryColors = {
  商城: '#c23531',
  职业调整: '#2f4554',
  PVP: '#61a0a8',
  PVE: '#d48265',
  PVX: '#91c7ae',
  格式: '#749f83',
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
