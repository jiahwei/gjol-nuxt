<template>
  <header class="site-header bg-page sticky top-0 z-50">
    <div class="header-inner layout-other">
      <NuxtLink to="/" class="brand flex items-center gap-space-sm" aria-label="GjoL DB 首页">
        <div class="text-[24px] i-material-symbols:database dark:text-white" aria-hidden="true" />
        <span class="text-primary font-nunito leading-[20px]">GjoL DB</span>
      </NuxtLink>

      <nav class="site-nav" aria-label="首页导航">
        <NuxtLink v-for="item in navigation" :key="item.hash" :to="`/${item.hash}`">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions flex items-center gap-space-md">
        <a href="https://github.com/jiahwei" target="_blank" rel="noopener noreferrer" aria-label="GitHub（在新窗口打开）">
          <span class="i-tabler:brand-github h-[18px] w-[18px] text-primary hover:text-link" aria-hidden="true" />
        </a>
        <ClientOnly>
          <button type="button" class="theme-toggle text-primary" :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'" @click="changeColorMode">
            <span :class="isDark ? 'i-material-symbols:nightlight-outline' : 'i-material-symbols:sunny-outline'" aria-hidden="true" />
          </button>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const navigation = [
  { label: '全景', hash: '#overview' },
  { label: '更新历程', hash: '#journey' },
  { label: '版本对比', hash: '#comparison' },
  { label: '公告档案', hash: '#archive' },
  { label: 'FAQ', hash: '#faq' },
]

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function changeColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.site-header {
  border-bottom: 1px solid var(--bg-color-borer);
}

.header-inner {
  min-height: var(--height-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand, .header-actions {
  flex-shrink: 0;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: var(--text-color-secondary);
  font-size: 14px;
  white-space: nowrap;
}

.site-nav a:hover, .site-nav a:focus-visible {
  color: var(--text-color-link);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.theme-toggle span {
  width: 18px;
  height: 18px;
}

@media (max-width: 700px) {
  .header-inner {
    flex-wrap: wrap;
    gap: 0;
  }

  .brand, .header-actions {
    height: var(--height-header);
  }

  .site-nav {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 22px;
    overflow-x: auto;
    padding: 0 0 12px;
  }
}
</style>
