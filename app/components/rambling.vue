<template>
  <div class="desc-content p-space-md rounded-md bg-code relative box-border rambling-shadow" >
    <p>
      <slot>{{ text }}</slot>
    </p>
    <span class="absolute bottom-space-xs right-space-md text-xs text-disabled">
      净北的碎碎念
    </span>
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