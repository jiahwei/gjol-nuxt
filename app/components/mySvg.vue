<template>
  <div v-html="svgContent" class="text-primary w-1/1 xl:w-1/2 2xl:w-1/3">
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