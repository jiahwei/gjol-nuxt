<template>
  <header :class="{ 'border-b border-[var(--bg-color-borer)]': isTop }"
    class="h-[var(--height-header)] bg-[var(--bg-color-page)] z-50 sticky top-0 ">
    <div class="h-full flex items-center justify-between layout-other">
      <div class="flex items-center gap-space-sm">
        <div class="text-[24px] i-material-symbols:database dark:text-white" />
        <span class="text-primary font-nunito leading-[20px]">GjoL DB</span>
      </div>

      <button class="cursor-pointer text-primary" :class="isDark ? 'i-material-symbols:nightlight-outline' : 'i-material-symbols:sunny-outline'"
        @click="changeColorMode" />
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
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
// 页面滚动位置
const { y: scrollY } = useWindowScroll()
const isTop = computed<boolean>(() => {
  return scrollY.value === 0
})
</script>
