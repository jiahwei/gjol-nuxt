<template>
  <header class="h-[--height-header] backdrop-blur-8 z-50 bg-bg-page sticky top-0 transition-colors">
    <div class="h-full flex items-center justify-between layout-main">
      <img class="h-[32px] w-[32px]" src="/favicon.ico">
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
</script>

<style></style>
