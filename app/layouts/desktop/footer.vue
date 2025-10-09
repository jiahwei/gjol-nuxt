<script lang="ts" setup>
const { isMobile } = useDeviceType()
</script>


<template>
  <footer class="py-space-md shadow-[inset_0_1px_0_var(--bg-color-borer)] min-h-[56px]">
    <div class="h-full flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-space-md layout-other">
      <div class="text-base font-normal font-serif cursor-pointer group">
        净北 @梦付千秋<span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          v-if="!isMobile">星垂野</span>
      </div>

      <a class="desc-a hover:text-link" href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2023024244号-2</a>
    </div>
  </footer>
</template>

