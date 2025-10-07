<template>
  <div
    @click="handleClick"
    class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground bg-button text-foreground shadow hover:bg-button/90 h-9 px-4 py-2">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<style></style>