<script setup lang="ts">
import { safeSourceUrl, sourceLabel } from '~/utils/archive-links.mjs'
import ArchiveVersionSelect from '~/components/index/archiveVersionSelect.vue'
import ArchiveDatePicker from '~/components/index/archiveDatePicker.vue'

import type { ArchiveVersion, ArchiveUpdate, ArchiveDetailState, ArchiveFilters, LoadState } from '~/types/archive'

const props = defineProps<{
  versions: ArchiveVersion[]
  items: ArchiveUpdate[]
  total: number
  page: number
  pageSize: number
  state: LoadState
  filterError?: string
  details: Record<number, ArchiveDetailState | undefined>
}>()
const emit = defineEmits<{
  'apply-filters': [filters: ArchiveFilters]
  'page-change': [page: number]
  'toggle-detail': [id: number]
  'retry': []
  'retry-detail': [id: number]
}>()

const draft = reactive<ArchiveFilters>({ version_id: '', from: '', to: '' })
const expanded = ref<number | null>(null)
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
watch(() => props.items, () => {
  expanded.value = null
})

function toggleDetail(id: number) {
  if (expanded.value === id) {
    expanded.value = null
    return
  }
  expanded.value = id
  emit('toggle-detail', id)
}
</script>

<template>
  <section id="archive" class="archive-section section-shell" aria-labelledby="archive-title">
    <div class="section-heading">
      <div>
        <p class="section-index">
          03 / ARCHIVE
        </p><h2 id="archive-title">
          翻开每一次更新
        </h2><p>按版本与日期查找，同一次更新的多篇公告合并展示。</p>
      </div>
    </div>
    <form class="filters" @submit.prevent="emit('apply-filters', { ...draft })">
      <ArchiveVersionSelect v-model="draft.version_id" :versions="versions" class="version-filter" />
      <div class="date-filter">
        <span>开始日期</span><ArchiveDatePicker v-model="draft.from" label="开始日期" name="from" />
      </div>
      <div class="date-filter">
        <span>结束日期</span><ArchiveDatePicker v-model="draft.to" label="结束日期" name="to" />
      </div>
      <button type="submit" class="filter-button">
        筛选
      </button>
    </form>
    <p v-if="filterError" class="filter-error" role="alert">
      {{ filterError }}
    </p>
    <div class="list-heading">
      <span>更新记录</span><span v-if="state === 'ready' || state === 'empty'">共 {{ total }} 次已收录更新</span>
    </div>
    <div v-if="(state === 'loading' || state === 'idle')" class="state-box" role="status">
      正在读取公告档案…
    </div>
    <div v-else-if="state === 'error'" class="state-box" role="alert">
      公告档案暂时无法加载。<button type="button" class="text-button" @click="emit('retry')">
        重试
      </button>
    </div>
    <div v-else-if="state === 'empty'" class="state-box">
      当前筛选条件下暂无已收录的更新。
    </div>
    <div v-else>
      <article v-for="item in items" :key="item.id" class="update-row">
        <button type="button" class="update-toggle" :aria-expanded="expanded === item.id" :aria-controls="`update-detail-${item.id}`" @click="toggleDetail(item.id)">
          <span class="update-date">{{ item.date }}</span>
          <span class="update-main"><strong>{{ item.title || '未命名更新' }}</strong><span>{{ item.version?.name || '版本待补充' }} · {{ item.sourceCount }} 篇来源</span></span>
          <span class="update-characters">{{ item.totalCharacters.toLocaleString() }} 字</span>
          <span class="update-action">{{ expanded === item.id ? '收起' : '查看' }} <span aria-hidden="true">{{ expanded === item.id ? '↑' : '→' }}</span></span>
        </button>
        <div v-if="expanded === item.id" :id="`update-detail-${item.id}`" class="update-detail">
          <div v-if="!details[item.id] || ['loading', 'idle'].includes(details[item.id]?.state || 'idle')" role="status" class="detail-state">
            正在读取更新详情…
          </div>
          <div v-else-if="details[item.id]?.state === 'error'" role="alert" class="detail-state">
            更新详情暂时无法加载。<button type="button" class="text-button" @click="emit('retry-detail', item.id)">
              重试
            </button>
          </div>
          <div v-else-if="details[item.id]?.data" class="detail-content">
            <p class="detail-note">
              公告文本约 {{ details[item.id]!.data!.totalCharacters.toLocaleString() }} 字，文本规模不代表游戏实际改动数量。
            </p>
            <h3>公告来源</h3>
            <ul class="sources">
              <li v-for="source in details[item.id]!.data!.sources" :key="source.id">
                <span>{{ sourceLabel(source.type) }} · {{ source.date }}</span>
                <a v-if="safeSourceUrl(source.url)" :href="safeSourceUrl(source.url)!" target="_blank" rel="noopener noreferrer">{{ source.name || '查看原公告' }} ↗</a>
                <span v-else>{{ source.name || '原公告链接暂不可用' }}</span>
              </li>
            </ul>
            <template v-if="details[item.id]!.data!.groups?.length">
              <h3>分类内容</h3>
              <p class="detail-note">
                分类由模型辅助生成，仅供参考，请以官方公告为准。
              </p>
              <section v-for="(group, groupIndex) in details[item.id]!.data!.groups" :key="groupIndex" class="content-group">
                <h4>{{ group.type }}</h4>
                <p v-for="(paragraph, paragraphIndex) in group.content" :key="paragraphIndex">
                  {{ paragraph }}
                </p>
              </section>
            </template>
            <p v-else class="detail-note">
              暂无分类内容。
            </p>
          </div>
          <p v-else class="detail-state">
            暂无更新详情。
          </p>
        </div>
      </article>
      <div class="pagination" aria-label="公告分页">
        <button type="button" :disabled="page <= 1" @click="emit('page-change', page - 1)">
          上一页
        </button>
        <span>第 {{ page }} / {{ pages }} 页</span>
        <button type="button" :disabled="page >= pages" @click="emit('page-change', page + 1)">
          下一页
        </button>
      </div>
    </div>
    <p class="archive-note">
      普通公告与技改公告由后端按同一次更新归并；统计仅反映已收录的数据。
    </p>
  </section>
</template>

<style scoped>
.section-shell { width: min(1200px, calc(100% - 80px)); margin: 0 auto; }
.archive-section { padding: 105px 0 110px; scroll-margin-top: 70px; }
.section-heading { margin-bottom: 34px; }
.section-index { color: var(--brand-color); font: 600 11px/1.5 sans-serif; letter-spacing: .16em; margin: 0 0 22px; }
.section-heading h2 { font-size: clamp(28px, 2.3vw, 32px); font-weight: 600; letter-spacing: .06em; margin: 0; }
.section-heading p:not(.section-index) { color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; margin: 8px 0 0; }
.filters { display: grid; grid-template-columns: minmax(160px, 1.3fr) minmax(0, 1fr) minmax(0, 1fr) auto; align-items: end; gap: 16px; margin-bottom: 30px; padding: 20px 24px 20px 20px; border: 1px solid var(--bg-color-borer); border-radius: 12px; background: var(--bg-color-secondarypage); }
.date-filter { display: grid; gap: 9px; min-width: 0; color: var(--text-color-secondary); font: 500 12px/1.4 sans-serif; }
.filter-button { min-height: 44px; padding: 0 26px; border-radius: 8px; background: var(--bg-color-button); color: var(--text-color-foreground); font: 600 13px sans-serif; cursor: pointer; transition: opacity .15s, transform .15s; }
.filter-button:hover { opacity: .82; }
.filter-button:active { transform: translateY(1px); }
.filter-button:focus-visible { outline: 2px solid var(--brand-color); outline-offset: 3px; }
button:disabled { opacity: .45; cursor: not-allowed; }
.filter-error { color: #c84444; font: 13px/1.6 sans-serif; }
.list-heading { display: flex; justify-content: space-between; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--text-color-primary); color: var(--text-color-secondary); font: 12px sans-serif; }
.state-box { border-bottom: 1px solid var(--bg-color-borer); padding: 35px 0; color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; }
.text-button { color: var(--brand-color); margin-left: 10px; text-decoration: underline; cursor: pointer; }
.update-row { border-bottom: 1px solid var(--bg-color-borer); }
.update-toggle { width: 100%; display: grid; grid-template-columns: 160px minmax(0, 1fr) 110px 64px; align-items: center; gap: 20px; text-align: left; padding: 19px 0; cursor: pointer; color: var(--text-color-primary); }
.update-main { display: grid; gap: 5px; min-width: 0; }.update-main strong { font-size: 15px; font-weight: 600; overflow-wrap: anywhere; }.update-main > span, .update-date, .update-characters { color: var(--text-color-secondary); font: 12px/1.7 sans-serif; }.update-date, .update-characters { white-space: nowrap; }.update-characters { text-align: right; }.update-action { color: var(--brand-color); text-align: right; white-space: nowrap; font: 12px/1.7 sans-serif; }
.update-detail { padding: 0 0 28px; }.detail-state, .detail-note { color: var(--text-color-secondary); font: 13px/1.8 sans-serif; }.detail-content h3 { font-size: 15px; margin: 25px 0 12px; }.sources { padding: 0; list-style: none; }.sources li { display: flex; flex-wrap: wrap; gap: 6px 18px; padding: 8px 0; font: 13px/1.7 sans-serif; }.sources li > span:first-child { color: var(--text-color-secondary); }.sources a { color: var(--brand-color); text-decoration: underline; overflow-wrap: anywhere; }
.content-group { border-top: 1px solid var(--bg-color-borer); padding: 18px 0 0; }.content-group h4 { font-size: 14px; margin: 0 0 12px; }.content-group p { color: var(--text-color-secondary); font-size: 14px; line-height: 1.9; white-space: pre-wrap; overflow-wrap: anywhere; }
.pagination { display: flex; align-items: center; justify-content: flex-end; gap: 22px; padding: 25px 0 0; font: 13px sans-serif; }.pagination button { color: var(--brand-color); cursor: pointer; }.archive-note { color: var(--text-color-secondary); font: 12px/1.8 sans-serif; margin: 25px 0 0; }
@media (max-width: 700px) { .section-shell { width: calc(100% - 40px); }.archive-section { padding: 75px 0 80px; scroll-margin-top: 110px; }.section-heading { margin-bottom: 28px; }.filters { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; padding: 16px; }.version-filter { grid-column: 1 / -1; }.filter-button { grid-column: 1 / -1; }.update-toggle { grid-template-columns: minmax(0, 1fr) auto; gap: 8px 14px; padding: 17px 0; }.update-date { grid-column: 1; grid-row: 1; }.update-action { grid-column: 2; grid-row: 1; }.update-main { grid-column: 1 / -1; grid-row: 2; }.update-characters { grid-column: 1 / -1; grid-row: 3; text-align: left; }.pagination { justify-content: space-between; } }
</style>
