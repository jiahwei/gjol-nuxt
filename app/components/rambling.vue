<template>
  <div class="desc-content rambling">
    <p>
      <slot>{{ text }}</slot>
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: '这里是碎碎念'
  }
})
</script>

<style>
.desc-content {
  p {
    @apply text-primary text-base/9 lg:text-lg/8 tracking-wider my-space-md break-words w-90vw md:w-70vw;
  }
  a{
    @apply font-bold hover:underline;
  }
}
.rambling {
  box-shadow: 0 2px 10px hsla(0, 0%, 100%, 0.15),inset 0 2px 2px hsla(0, 0%, 0%, 0.1);
  box-sizing: border-box;
  @apply p-space-xs rounded-md bg-code;
}
</style>