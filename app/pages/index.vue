<template>
  <div class="flex flex-col  justify-center items-center">
    <!-- <version /> -->
     <box v-for="value in [1, 2, 3]" :key="value" id="box-{{ value }}" />
  </div>
</template>

<script lang="ts" setup>
import version from '~/components/index/version.vue';
import box from '~/components/index/box.vue';
</script>

