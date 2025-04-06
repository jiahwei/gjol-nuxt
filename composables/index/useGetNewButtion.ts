import { ref, onMounted } from 'vue'
import { bulletinApi } from '@/api/index'

export const useGetNewButtion = () => {
  const newBulletinInfo = ref({})

  async function getButtionInfo() {
    // 获取公告信息
    newBulletinInfo.value = await bulletinApi.getNewBulletin()
  }

  onMounted(() => {
    getButtionInfo()
  })
  return {
    newBulletinInfo,
  }
}
