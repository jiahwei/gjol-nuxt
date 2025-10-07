<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import type { UseTooltipProps } from '@ark-ui/vue/tooltip'

const { isMobile } = useDeviceType()

const position: UseTooltipProps['positioning'] = {
  placement: 'top',
}

const isOpen = ref(false)

const handleClick = () => {
  if (isMobile) {
    isOpen.value = !isOpen.value
  }
}
const handleMouseEnter = () => {
  if (!isMobile) {
    isOpen.value = true
  }
}
const handleMouseLeave = () => {
  if (!isMobile) {
    isOpen.value = false
  }
}

</script>

<template>
  <ClientOnly>
    <Tooltip.Root :closeDelay="0" :openDelay="0" :positioning="position" :open="isOpen">
      <Tooltip.Trigger
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="px-0.5 cursor-help">
          净北
        </div>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow class="[--arrow-size:8px] [--arrow-background:black] dark:[--arrow-background:white]">
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          <div
            class="bg-black dark:bg-white text-white dark:text-black px-2 py-1.5 rounded text-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
            这个网站的开发者
          </div>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  </ClientOnly>
</template>