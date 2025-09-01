<template>
  <header :class="{ top: isTop }" class="h-[var(--height-header)] z-50 sticky top-0">
    <div class="h-full flex items-center justify-between layout-main">
      <span class="text-primary">GjolDB</span>
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
.top {
  @apply border-b border-base;
}
</style>
