import { useGet } from '@/composables/useGet'

const baseUrl = `/api`
interface ContentTotalArr {
  name: string
  leng: number
}

interface GetNewBulletin {
  date: Date | undefined
  totalLen: number
  orderId: number
  contentTotalArr: ContentTotalArr[]
  name: string
  releaseID: number
  reselseName: string
  order: number
}

const defaultGetNewBulletin: GetNewBulletin = {
  date: undefined,
  totalLen: 0,
  contentTotalArr: [],
  name: '',
  releaseID: 0,
  reselseName: '',
  order: 0,
}

export default {
  getNewBulletin: () => {
    return useGet<GetNewBulletin>(`${baseUrl}/bulletins/new`, () => defaultGetNewBulletin)
  },
}
