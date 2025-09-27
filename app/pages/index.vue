<template>
  <div class="flex flex-col  justify-center items-center" ref="homeDom">
    <newsBulletin id="news" class="bg-[var(--bg-color-page)]" @updateIsSuspended="setIsSuspended"/>
    <version id="version" class="bg-[var(--bg-color-secondarypage)]"/>
    <topic id="topic" class="bg-[var(--bg-color-page)]"/>
  </div>
</template>

<script lang="ts" setup>
import { bulletinApi } from '@/api/index'
import version from '~/components/index/version.vue';
import newsBulletin from '~/components/index/newsBulletin.vue';
import topic from '~/components/index/topic.vue';
import { useSectionVisibility } from '~/composables/home';


const homeDom = ref<HTMLElement|null>(null)
const { visibilityMap } = useSectionVisibility(homeDom)
provide('sectionVisibility', visibilityMap)

// 古网是不是还在更新,从newsBulletin获取，传到其他组件
const isGjolSuspended = ref(false)
function setIsSuspended(value: boolean) {
  isGjolSuspended.value = value
}
provide('isGjolSuspended', isGjolSuspended)

const { data: listInfo } = await bulletinApi.getListInVersion()
const sortListInfo = computed(() => {
  return [...(listInfo.value || [])].sort((a, b) => {
    const dateA = new Date(a.start || a.end).getTime()
    const dateB = new Date(b.start || b.end).getTime()
    return dateA - dateB
  }).slice(2)
})
provide('listInfo', sortListInfo)

</script>
