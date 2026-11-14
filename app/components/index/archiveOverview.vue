<script setup lang="ts">
import type { ArchiveOverview, LoadState } from '~/types/archive'
import { buildTimelineYears } from '~/utils/timeline-axis.mjs'
import ArchiveVersionSelect from '~/components/index/archiveVersionSelect.vue'

const props = defineProps<{ overview: ArchiveOverview | null, state: LoadState, latestUpdateDate?: string | null }>()
defineEmits<{ retry: [], selectUpdate: [id: number] }>()

const versions = computed(() => [...(props.overview?.versions || [])].sort((a, b) => (a.start || '').localeCompare(b.start || '')))
const sortedVersions = computed(() => [...versions.value].sort((a, b) => b.totalCharacters - a.totalCharacters || a.name.localeCompare(b.name, 'zh-CN')))
const maxVersionCharacters = computed(() => Math.max(0, ...sortedVersions.value.map(item => item.totalCharacters)))
const historyVersion = ref('')
const timelineEntries = computed(() => [...(props.overview?.timeline || [])].filter(item => !historyVersion.value || String(item.version.id) === historyVersion.value).sort((a, b) => a.date.localeCompare(b.date)))
const maxTimelineCharacters = computed(() => Math.max(0, ...timelineEntries.value.map(item => item.totalCharacters)))
const timelineYears = computed(() => buildTimelineYears(timelineEntries.value))
const timelineYearWidth = computed(() => Math.max(150, ...timelineYears.value.map(group => group.items.length * 9 + 12)))
function barPercent(value: number, max: number) {
  return max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0
}
function formatNumber(value: number) {
  return value.toLocaleString('zh-CN')
}
</script>

<template>
  <section id="overview" class="hero section-shell">
    <div class="hero-main">
      <div class="hero-copy">
        <p class="section-index">
          AN ARCHIVE OF GJOL
        </p>
        <h1>古网更新档案</h1>
        <p class="hero-lead">
          将每一份公告整理成可以回看的历史。
        </p>
        <p class="hero-description">
          从开服到最后一次更新，以版本、时间与主题重新认识这段旅程。
        </p>
        <div class="hero-actions">
          <a class="primary-link" href="#journey">探索更新历程 <span aria-hidden="true">↗</span></a><a class="secondary-link" href="#archive">查看公告档案 <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div class="overview-data" aria-label="档案全景">
      <dl class="totals">
        <div><dt>收录更新</dt><dd>{{ overview ? formatNumber(overview.totals.updates) : '—' }}</dd></div>
        <div><dt>收录版本</dt><dd>{{ overview ? formatNumber(overview.totals.versions) : '—' }}</dd></div>
        <div><dt>公告文字</dt><dd>{{ overview ? formatNumber(overview.totals.characters) : '—' }}<small v-if="overview"> 字</small></dd></div>
        <div>
          <dt>最后更新</dt><dd class="date-value">
            {{ latestUpdateDate || '—' }}
          </dd>
        </div>
      </dl>
      <p v-if="state === 'loading' || state === 'idle'" class="coverage" role="status">
        正在读取档案全景…
      </p>
      <p v-else-if="state === 'error'" class="coverage" role="alert">
        档案全景暂时无法加载。<button class="text-button" type="button" @click="$emit('retry')">
          重试
        </button>
      </p>
      <p v-else-if="overview" class="coverage">
        公告来源：{{ formatNumber(overview.totals.sources) }} 篇 · 覆盖范围：{{ overview.coverage.start || '—' }} 至 {{ overview.coverage.end || '—' }} · 已收录来源 / 目录来源：{{ formatNumber(overview.coverage.processedSources) }} / {{ formatNumber(overview.coverage.totalSources) }}<span v-if="!overview.coverage.complete"></span>
      </p>
      <p v-else class="coverage">
        暂无档案数据，数据正在整理中。
      </p>
    </div>
  </section>

  <section id="journey" class="archive-section section-shell">
    <div class="section-heading">
      <div>
        <p class="section-index">
          01 / HISTORY
        </p><h2>一张图，回看更新历程</h2><p class="heading-description">
          按时间浏览每一次已收录的更新。
        </p>
      </div>
    </div>
    <ArchiveVersionSelect v-if="state === 'ready' && versions.length" v-model="historyVersion" :versions="versions" inline class="history-filter" />
    <div v-if="state === 'loading' || state === 'idle'" class="state-box" role="status">
      正在读取更新历程…
    </div>
    <div v-else-if="state === 'error'" class="state-box" role="alert">
      更新历程暂时无法加载。<button class="text-button" type="button" @click="$emit('retry')">
        重试
      </button>
    </div>
    <div v-else-if="!timelineEntries.length" class="state-box">
      {{ historyVersion ? '所选版本暂无已收录更新。' : '暂无已收录更新，档案数据正在整理中。' }}
    </div>
    <div v-else class="history-chart">
      <div class="chart-caption">
        <span>公告字符数 / 次</span><span>每一柱代表一次已归并更新</span>
      </div>
      <div class="history-scroll" aria-label="更新公告字符数按年份分布">
        <div class="history-axis" :style="{ minWidth: `${timelineYearWidth * timelineYears.length}px` }">
          <div v-for="year in timelineYears" :key="year.label" class="history-year">
            <ul class="history-bars" :aria-label="`${year.label}的更新`">
              <li v-for="item in year.items" :key="item.id">
                <button type="button" :title="`${item.date || '日期待确认'} ${item.title}：${formatNumber(item.totalCharacters)} 字`" :aria-label="`${item.date || '日期待确认'}，${item.title}，公告 ${formatNumber(item.totalCharacters)} 字，查看详情`" @click="$emit('selectUpdate', item.id)">
                  <span :style="{ height: `${barPercent(item.totalCharacters, maxTimelineCharacters)}%` }" />
                </button>
              </li>
            </ul>
            <span class="year-label">{{ year.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="section-note">
      柱形按年份分段，同一年内按更新时间顺序排列，柱间距不代表实际天数。点击柱形查看该次更新；字符数仅表示公告文本规模，不代表游戏实际改动数量。
    </p>
  </section>

  <section id="comparison" class="archive-section comparison-section">
    <div class="section-shell">
      <div class="section-heading">
        <div>
          <p class="section-index">
            02 / VERSIONS
          </p><h2>每个版本，都有自己的节奏</h2><p class="heading-description">
            比较版本的更新次数、公告字数与单次更新的中位数。
          </p>
        </div>
        <p>按公告字数排列 ↓</p>
      </div>
      <div v-if="state === 'loading' || state === 'idle'" class="state-box" role="status">
        正在读取版本数据…
      </div>
      <div v-else-if="state === 'error'" class="state-box" role="alert">
        版本数据暂时无法加载，请在全景区域重试。
      </div>
      <div v-else-if="!sortedVersions.length" class="state-box">
        暂无可对比的版本。
      </div>
      <div v-else class="version-table-wrap">
        <table class="version-table">
          <thead>
            <tr>
              <th scope="col">
                版本
              </th><th scope="col">
                公告文字规模
              </th><th scope="col">
                更新次数
              </th><th scope="col">
                公告字数
              </th><th scope="col">
                单次中位数
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="version in sortedVersions" :key="version.id">
              <th scope="row">
                {{ version.name || '未命名版本' }}
              </th><td>
                <div class="version-bar" aria-hidden="true">
                  <span :style="{ width: `${barPercent(version.totalCharacters, maxVersionCharacters)}%` }" />
                </div>
              </td><td>{{ formatNumber(version.updateCount) }}</td><td>{{ formatNumber(version.totalCharacters) }} 字</td><td>{{ formatNumber(version.medianCharacters) }} 字</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="section-note">
        数字反映已收录的数据；0 不代表游戏没有更新。公告字符数仅表示文本规模，不代表游戏实际改动数量。
      </p>
    </div>
  </section>
</template>

<style scoped>
.section-shell { width: min(1200px, calc(100% - 80px)); margin: 0 auto; }
.hero { scroll-margin-top: 70px; min-height: 620px; display: flex; flex-direction: column; justify-content: space-between; padding-top: 94px; padding-bottom: 28px; }
.hero-main { display: flex; align-items: center; flex: 1; }
.section-index { color: var(--brand-color); font: 600 11px/1.5 sans-serif; letter-spacing: .16em; margin: 0 0 22px; }
h1, h2, h3, p { margin-top: 0; }
h1 { font: 700 48px/1.2 'Noto Serif SC', 'Songti SC', serif; letter-spacing: .04em; margin-bottom: 27px; color: var(--text-color-primary); }
.hero-lead { color: var(--text-color-secondary); font-family: sans-serif; font-size: 18px; line-height: 1.8; margin-bottom: 9px; }
.hero-description { color: var(--text-color-secondary); font-family: sans-serif; font-size: 15px; line-height: 1.9; margin-bottom: 34px; }
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 27px; }
.primary-link { display: inline-flex; align-items: center; gap: 36px; padding: 14px 19px; background: var(--bg-color-button); color: var(--text-color-foreground); font: 600 13px sans-serif; text-decoration: none; }
.primary-link:hover { opacity: .8; }
.secondary-link { color: var(--text-color-primary); font: 600 13px sans-serif; text-decoration: none; }.secondary-link:hover { color: var(--brand-color); }
.totals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 0; padding: 24px 0 14px; border-top: 1px solid var(--bg-color-borer); }
.totals > div:not(:first-child) { border-left: 1px solid var(--bg-color-borer); padding-left: 32px; }
.totals dt { color: var(--text-color-secondary); font: 12px sans-serif; }
.totals dd { margin: 8px 0 0; font: 600 25px/1.3 sans-serif; }.totals dd small { font-size: 12px; font-weight: 400; }.totals .date-value { font-size: 19px; }
.coverage { color: var(--text-color-secondary); font: 12px/1.8 sans-serif; margin: 0; }
.archive-section { padding-top: 105px; padding-bottom: 110px; scroll-margin-top: 70px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 46px; }
.section-heading h2 { font-size: clamp(28px, 2.3vw, 32px); font-weight: 600; letter-spacing: .06em; margin-bottom: 0; }
.section-heading > p { color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; margin: 0; }
.heading-description { color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; margin: 12px 0 0; }
.history-filter { margin: 0 0 25px; }
.chart-caption { display: flex; justify-content: space-between; gap: 12px; color: var(--text-color-secondary); font: 12px/1.5 sans-serif; }
.history-scroll { overflow-x: auto; }.history-axis { display: flex; width: 100%; margin-top: 22px; }.history-year { flex: 1 0 0; min-width: 0; }.history-bars { display: flex; align-items: end; gap: 4px; height: 240px; margin: 0; padding: 0 4px 1px; list-style: none; border-bottom: 1px solid var(--bg-color-borer); background: repeating-linear-gradient(to top, transparent 0, transparent 59px, var(--bg-color-borer) 60px); }.year-label { display: block; padding-top: 10px; color: var(--text-color-secondary); font: 12px/1.5 sans-serif; }
.history-bars li { height: 100%; min-width: 4px; flex: 1; }.history-bars li button { width: 100%; height: 100%; display: flex; align-items: end; justify-content: center; cursor: pointer; }.history-bars li button:focus-visible { outline: 2px solid var(--brand-color); outline-offset: 1px; }.history-bars li span { width: 100%; max-width: 10px; min-height: 2px; background: var(--brand-color); opacity: .5; border-radius: 2px 2px 0 0; }.history-bars li button:hover span { opacity: 1; }
.comparison-section { background: var(--bg-color-page); }
.version-table-wrap { overflow-x: auto; }
.version-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
.version-table th, .version-table td { padding: 18px 15px 18px 0; border-bottom: 1px solid var(--bg-color-borer); white-space: nowrap; }
.version-table thead th { color: var(--text-color-secondary); font: 12px sans-serif; }.version-table tbody th { font-weight: 600; }.version-table td { font-family: sans-serif; }.version-table td:nth-child(2) { width: 34%; min-width: 120px; }
.version-bar { height: 5px; }.version-bar span { display: block; height: 100%; border-radius: 3px; background: var(--brand-color); opacity: .3; }
.section-note { color: var(--text-color-secondary); font: 12px/1.8 sans-serif; margin: 18px 0 0; }
.state-box { border-bottom: 1px solid var(--bg-color-borer); padding: 35px 0; color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; }.text-button { color: var(--brand-color); margin-left: 12px; text-decoration: underline; cursor: pointer; }
@media (max-width: 700px) { .hero { scroll-margin-top: 110px; } .archive-section { scroll-margin-top: 110px; }.section-shell { width: calc(100% - 40px); }.hero { scroll-margin-top: 110px; min-height: 0; padding-top: 65px; padding-bottom: 40px; }.totals > div:nth-child(odd) { border-left: 0; padding-left: 0; }.totals > div:nth-child(even) { border-left: 1px solid var(--bg-color-borer); padding-left: 20px; }.totals { grid-template-columns: repeat(2, 1fr); gap: 24px 10px; margin-top: 35px; } h1 { font-size: 38px; }.archive-section { padding-top: 75px; padding-bottom: 80px; }.section-heading { display: block; margin-bottom: 35px; }.section-heading > p { margin-top: 18px; }.history-bars { height: 180px; gap: 3px; }.version-table { min-width: 660px; } }
</style>
