<template>
  <header :class="{ top: isTop }" class="bg-header">
    <div class="h-full flex items-center justify-between layout-main">
      <span class="text-primary hover:text-brand">GjolDB</span>
      <button class="cursor-pointer text-primary" :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" @click="changeColorMode" />
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
  @apply h-[56px] z-50 sticky top-0;
}
.top {
  @apply border-b border-base;
}
</style>
