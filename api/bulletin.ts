import { useGet } from '@/composables/useGet'
import type { components } from '@/api-types/api'

const baseUrl = `/api`

// 定义类型别名，使代码更简洁
type BulletinInfo = components['schemas']['BulletinInfo']
type BulletinDB = components['schemas']['BulletinDB']
type ListInVersionReturn = components['schemas']['ListInVersionReturn']
// type DatePayload = components['schemas']['DatePayload']

export default {
  getNewBulletin: () => {
    return useGet<BulletinInfo | null>(`${baseUrl}/bulletins/new`, () => null)
  },

  getBulletinById: (bulletinId: number) => {
    return useGet<BulletinDB | null>(`${baseUrl}/bulletins/query?bulletin_id=${bulletinId}`, () => null)
  },

  getListInVersion: () => {
    return useGet<ListInVersionReturn[]>(`${baseUrl}/bulletins/listInVersion`, () => [])
  },
}

export {
  type BulletinInfo,
  type BulletinDB,
  type ListInVersionReturn,
}
