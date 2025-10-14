<template>
  <div v-html="svgContent" class="text-primary w-1/1 md:w-1/2 2xl:w-1/3">
  </div>
</template>

<script lang="ts" setup>
type SvgType = 'version' | 'topic' | 'feature'
interface MySvgProps {
  type: SvgType
}
const props = withDefaults(defineProps<MySvgProps>(), {
  type: 'version'
})

const files = import.meta.glob<string>('~/assets/svg/**/*.svg', {
  query: '?raw',
  import: 'default'
})
const svgContent = shallowRef<string>('')

function resolveKey(type: SvgType) {
  return `/assets/svg/${type}.svg`
}

watch(
  () => props.type,
  async (t) => {
    const key = resolveKey(t)
    const loader = files[key]
    svgContent.value = loader ? await loader() : ''
  },
  { immediate: true }
)


</script>