<template>
  <div class="version-page-layout position-relative">
    <my-svg :type="'version'" />
    <span class="desc-content w-auto justify-self-center">本站收集了自古剑奇谭网络版（以下简称“古网”）开服以来的所有官方公告，并依据版本对公告进行分类和统计。</span>
    <versionChart id="versionChart"/>
    <my-button
      :class="{ 'position-sticky z-10 top-[calc(100vh-100px)] left-1/2 transform -translate-x-1/2': collapsible.open }"
      @click="setOpen">
      <div>
        <span v-if="!collapsible.open">
          愿意看下净北的意见吗
        </span>
        <span v-else>
          收起
        </span>
      </div>
    </my-button>
    <Collapsible.RootProvider :value="collapsible">
      <Collapsible.Content class="overflow-hidden transition-all duration-300 ease-in-out">
        <versionDesc class="mb-[36px]"/>
      </Collapsible.Content>
    </Collapsible.RootProvider>
  </div>
</template>

<script lang="ts" setup>
import versionChart from './versionChart.vue'
import versionDesc from './versionDesc.vue'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
// const { isMobile } = useDeviceType()

//#region 折叠
const collapsible = useCollapsible()
function setOpen() {
  const openStatue = collapsible.value.open
  collapsible.value.setOpen(!openStatue)
  if(openStatue){
    setTimeout(() => {
      const versionElement = document.getElementById('version')
      if (versionElement) {
        const rect = versionElement.getBoundingClientRect()
        const elementBottom = rect.bottom + window.scrollY

        // 滚动到元素底部，并让其位于视口底部
        window.scrollTo({
          top: elementBottom - window.innerHeight,
          behavior: 'smooth'
        })
      }
    }, 0)
  }
}

//#endregion

//#region 图表小窗

//#endregion
</script>
