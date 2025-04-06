import { useGet } from '@/composables/useGet'
import type { components } from '@/api-types/api'

const baseUrl = `/api`

// 定义类型别名，使代码更简洁
type BulletinInfo = components['schemas']['BulletinInfo']
type BulletinDB = components['schemas']['BulletinDB']
type ListInVersionReturn = components['schemas']['ListInVersionReturn']
// type DatePayload = components['schemas']['DatePayload']

// 默认值
const defaultGetNewBulletin: BulletinInfo = {
  date: '',
  orderId: 0,
  totalLen: 0,
  id: null,
  name: null,
  order: 0,
  type: 'routine',
}

export default {
  getNewBulletin: () => {
    return useGet<BulletinInfo>(`${baseUrl}/bulletins/new`, () => defaultGetNewBulletin)
  },

  getBulletinById: (bulletinId: number) => {
    return useGet<BulletinDB>(`${baseUrl}/bulletins/query?bulletin_id=${bulletinId}`, () => ({
      bulletin_date: '',
      original_date: '',
      total_leng: 0,
      content_total_arr: '',
      version_id: 0,
      type: 'routine',
    }))
  },

  getListInVersion: () => {
    return useGet<ListInVersionReturn[]>(`${baseUrl}/bulletins/listInVersion`, () => [])
  },
}
