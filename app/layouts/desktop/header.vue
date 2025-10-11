<template>
  <header :class="{ 'border-b border-[var(--bg-color-borer)]': isTop }"
    class="h-[var(--height-header)] bg-page z-50 sticky top-0 ">
    <div class="h-full flex items-center justify-between layout-other">
      <div class="flex items-center gap-space-sm cursor-pointer" @click="navigateTo('/')">
        <div class="text-[24px] i-material-symbols:database dark:text-white" />
        <span class="text-primary font-nunito leading-[20px]">GjoL DB</span>
      </div>

      <div class="flex flex-row items-center gap-space-md">
        <div class="cursor-pointer text-primary hover:font-600 " v-if="isHome && false" @click="navigateTo('/faq')">
          FAQ
        </div>
        <a href="https://github.com/jiahwei" target="_blank">
          <div class="i-tabler:brand-github h-[18px] w-[18px] cursor-pointer text-primary hover:text-link"></div>
        </a>
        <button class="cursor-pointer text-primary hover:text-link"
          :class="isDark ? 'i-material-symbols:nightlight-outline' : 'i-material-symbols:sunny-outline'"
          @click="changeColorMode" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
// 全局模式切换
const colorMode = useColorMode()
const isDark = computed(() => {
  return colorMode.value === 'dark'
})
function changeColorMode() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
}
// 页面滚动位置
const { y: scrollY } = useWindowScroll()
const isTop = computed<boolean>(() => {
  return scrollY.value === 0
})

const route = useRoute()
const isHome = computed(() => {
  return route.path === '/'
})
</script>
