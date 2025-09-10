<template>
  <div class="flex flex-col  justify-center items-center" ref="homeDom">
    <news />
    <box v-for="(value, index) in [1, 2, 3]" :key="value" :id="`box-${value}`" />
  </div>
</template>

<script lang="ts" setup>
import version from '~/components/index/version.vue';
import box from '~/components/index/box.vue';
import news from '~/components/index/news.vue';
import { useSectionVisibility } from '~/composables/home';


const homeDom = ref<HTMLElement|null>(null)
const { visibilityMap } = useSectionVisibility(homeDom)
provide('sectionVisibility', visibilityMap)


</script>
