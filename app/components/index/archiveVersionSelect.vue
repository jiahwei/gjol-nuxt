<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue'
import type { ArchiveVersion } from '~/types/archive'

const props = withDefaults(defineProps<{
  modelValue: string
  versions: ArchiveVersion[]
  inline?: boolean
}>(), { inline: false })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// The UI library uses an array of non-empty values even for a single select.
const allVersionsValue = '__all_versions__'
const collection = computed(() => createListCollection({
  items: [
    { label: '全部版本', value: allVersionsValue },
    ...props.versions.map(version => ({ label: version.name, value: String(version.id) })),
  ],
}))
const selectedValue = computed(() => [props.modelValue || allVersionsValue])

function updateValue(values: string[]) {
  const value = values[0]
  emit('update:modelValue', value === allVersionsValue || !value ? '' : value)
}
</script>

<template>
  <Select.Root
    class="version-select"
    :class="{ 'version-select-inline': inline }"
    :collection="collection"
    :model-value="selectedValue"
    :positioning="{ placement: 'bottom-start', gutter: 6, sameWidth: true, fitViewport: true, overflowPadding: 12 }"
    @update:model-value="updateValue"
  >
    <Select.Label class="version-label">
      版本
    </Select.Label>
    <Select.Control class="version-control">
      <Select.Trigger class="version-trigger">
        <Select.ValueText placeholder="全部版本" class="version-value" />
        <Select.Indicator class="version-chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner class="version-positioner">
        <Select.Content class="version-content">
          <Select.Item v-for="item in collection.items" :key="item.value" :item="item" class="version-option">
            <Select.ItemText>{{ item.label }}</Select.ItemText>
            <Select.ItemIndicator class="version-check" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none"><path d="m3.5 8 3 3 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </Select.ItemIndicator>
          </Select.Item>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>

<style scoped>
.version-select { display: grid; gap: 9px; min-width: 0; }
.version-label { color: var(--text-color-secondary); font: 500 12px/1.4 sans-serif; }
.version-control { min-width: 0; }
.version-trigger { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; min-width: 0; min-height: 44px; box-sizing: border-box; padding: 0 16px 0 12px; border: 1px solid var(--bg-color-borer); border-radius: 8px; background: var(--bg-color-page); color: var(--text-color-primary); text-align: left; font: 14px sans-serif; cursor: pointer; transition: border-color .15s, box-shadow .15s; }
.version-trigger:hover { border-color: var(--text-color-placeholder); }
.version-trigger:focus-visible, .version-trigger[data-state='open'] { outline: none; border-color: var(--brand-color); box-shadow: 0 0 0 3px var(--brand-color-focus); }
.version-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.version-chevron { flex: 0 0 16px; display: flex; color: var(--text-color-secondary); }
.version-chevron svg, .version-check svg { width: 16px; height: 16px; }
.version-positioner { z-index: 100 !important; }
.version-content { box-sizing: border-box; max-height: min(320px, 50vh, var(--available-height, 320px)); overflow-y: auto; padding: 5px; border: 1px solid var(--bg-color-borer); border-radius: 10px; background: var(--bg-color-page); box-shadow: 0 12px 32px rgb(0 0 0 / 14%); overscroll-behavior: contain; }
.version-option { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 38px; box-sizing: border-box; padding: 8px 10px; border-radius: 6px; color: var(--text-color-primary); font: 13px/1.5 sans-serif; cursor: pointer; outline: none; }
.version-option[data-highlighted] { background: var(--brand-color-light); }
.version-option[data-state='checked'] { color: var(--brand-color); font-weight: 600; }
.version-check { display: flex; flex: 0 0 16px; }
.version-select-inline { display: inline-grid; grid-template-columns: auto minmax(180px, 264px); align-items: center; gap: 12px; max-width: 100%; }
.version-select-inline .version-trigger { min-height: 42px; background: var(--bg-color-secondarypage); font-size: 13px; }
@media (max-width: 400px) { .version-select-inline { grid-template-columns: auto minmax(0, 1fr); width: 100%; } }
</style>
