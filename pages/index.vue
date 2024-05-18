<template>
  <div id="app-home" class="text-font-primary transition-colors">
    <img class="absolute h-full w-full z-[-1]" src="/assets/img/test.jpg" alt="bg">
    {{ nowDay }}
    {{ bulletinInfo.totalLen }}
    <!-- <video class="video-background" preload="auto" loop playsinline disablepictureinpicture autoplay tabindex="-1">
      <source type="video/mp4" src="/assets/img/test.mp4" />
    </video> -->
  </div>
</template>

<script lang="ts" setup>
import { useDateFormat, useNow } from '@vueuse/core'
import { bulletinApi } from '@/api/index'

const nowDay = useDateFormat(useNow(), 'YYYY-MM-DD')

const { data: bulletinInfo } = await bulletinApi.getNewBulletin()
</script>

<style scoped>
#app-home {
  height: calc(100vh - var(--height-header));
  /* background-color: var(--bg-color-page); */
  background-color: hsla(0, 0%, 0%, 0.5);
  position: relative;
}
#bg{
  background-image: url("/assets/img/test.jpg");
  position: absolute;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  z-index: -1;
}

.video-background {
  position: absolute;
  left: 50%;
  top: 50%;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  z-index: -1;
  /* min-height: 800px; */
}
</style>
