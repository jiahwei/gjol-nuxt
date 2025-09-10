import { useGet } from '@/composables/useGet'
import type { components } from '@/api-types/api'

const baseUrl = `/api`

type returnType = components['schemas']
type BulletinInfo = returnType['BulletinInfo']
type BulletinDB = returnType['BulletinDB']
type ListInVersionReturn = returnType['ListInVersionReturn']
type ListInVersionChildren = returnType['BaseBulletinInfo']
// type DatePayload = returnType['DatePayload']

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

export type { BulletinInfo, BulletinDB, ListInVersionReturn, ListInVersionChildren }
