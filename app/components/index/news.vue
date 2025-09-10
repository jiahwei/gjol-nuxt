<template>
    <div id="news" class="h-screen w-full  flex justify-center items-center b-red b-1px" :class="isVisible ? 'bg-green' : 'bg-gray-300'">
      <div class="h-100px w-100px flex justify-center items-center text-gray-700">
        news {{ isVisible ? '可见' : '不可见' }}
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useUseComIsVisible } from '~/composables/home';

const { isVisible } = useUseComIsVisible('news')
</script>

<style>

</style>