<template>
  <header :class="{ top: isTop }">
    <div class="h-full flex items-center justify-between layout-main">
      <span class="text-[--text-color-primary] hover:text-[--text-color-brand]">GjolDB</span>
      <button class="cursor-pointer text-font-primary" :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" @click="changeColorMode" />
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

<style scoped>
header {
  @apply h-[--height-header] backdrop-blur-8 z-50 bg-header-primary sticky top-0;
}
.top {
  box-shadow: inset 0 -1px 0 var(--bg-color-borer);
}
</style>
