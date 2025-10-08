<template>
  <div class="version-page-layout gap-space-sm position-relative]">
    <my-svg :svgContent="versionSvg" />
    <span class="desc-content">本站收集了自古剑奇谭网络版（以下简称“古网”）开服以来的所有官方公告，并依据版本对公告进行分类和统计。</span>
    <versionChart />
    <my-button
      :class="{ 'position-sticky z-10 top-[calc(100vh-100px)] left-1/2 transform -translate-x-1/2': collapsible.open }"
      @click="setOpen">
      <div>
        <span v-if="!collapsible.open">
          愿意看下净北的意见吗
        </span>
        <span v-else>
          不要在说啦
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
import versionSvg from '~/assets/svg/version.svg?raw'
import versionDesc from './versionDesc.vue'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'

const collapsible = useCollapsible()
// const { isMobile } = useDevic  eType()

function setOpen() {
  const openStatue = collapsible.value.open
  collapsible.value.setOpen(!openStatue)
  if(openStatue){
    setTimeout(() => {
      const versionElement = document.getElementById('version')
      if (versionElement) {
        // 获取 version 元素的底部位置
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
</script>


<style></style>