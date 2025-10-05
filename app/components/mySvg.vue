<template>
  <div v-html="svgContent" class="text-primary w-1/1 xl:w-1/2 h-1/10 xl:h-1/5">
  </div>
</template>

<script lang="ts" setup>
import defaultSvg from '~/assets/svg/version.svg?raw'

const props = defineProps({
  svgContent: {
    type: String,
    default: defaultSvg
  }
})
</script>

<style>

</style>