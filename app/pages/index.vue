<template>
  <div class="flex flex-col  justify-center items-center" ref="homeDom">
    <news id="news" class="bg-[var(--bg-color-page)]"/>
  </div>
</template>

<script lang="ts" setup>
import version from '~/components/index/version.vue';
import news from '~/components/index/news.vue';
import { useSectionVisibility } from '~/composables/home';


const homeDom = ref<HTMLElement|null>(null)
const { visibilityMap } = useSectionVisibility(homeDom)
provide('sectionVisibility', visibilityMap)


</script>
