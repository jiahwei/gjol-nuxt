<template>
  <div class="version-page-layout position-relative">
    <my-svg :svgContent="featureSvg" />
    <div class="w-full flex-1 flex flex-col items-center justify-center">
      <div class="w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden">
        <iframe src="https://player.bilibili.com/player.html?bvid=BV1WgYYzhEKw&autoplay=0" scrolling="no" border="0"
          frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; min-height: 500px;"></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import featureSvg from '~/assets/svg/feature.svg?raw'
</script>