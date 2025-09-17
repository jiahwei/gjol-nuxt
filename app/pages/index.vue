<template>
  <div class="flex flex-col  justify-center items-center" ref="homeDom">
    <newsBulletin id="news" class="bg-[var(--bg-color-page)]" @updateIsSuspended="setIsSuspended"/>
    <version id="version" class="bg-[var(--bg-color-secondarypage)]"/>
  </div>
</template>

<script lang="ts" setup>
import version from '~/components/index/version.vue';
import newsBulletin from '~/components/index/newsBulletin.vue';
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

</script>
