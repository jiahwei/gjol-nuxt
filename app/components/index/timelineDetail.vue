<script setup lang="ts">
import type { ArchiveDetailState } from '~/types/archive'
import { safeSourceUrl, sourceLabel } from '~/utils/archive-links.mjs'

defineProps<{ detail?: ArchiveDetailState }>()
defineEmits<{ close: [], retry: [] }>()
</script>

<template>
  <section id="timeline-detail" class="timeline-detail" tabindex="-1" aria-label="更新详情">
    <div class="detail-heading">
      <h2>更新详情</h2>
      <button type="button" @click="$emit('close')">
        关闭
      </button>
    </div>
    <p v-if="!detail || detail.state === 'loading' || detail.state === 'idle'" role="status">
      正在读取更新详情…
    </p>
    <p v-else-if="detail.state === 'error'" role="alert">
      更新详情暂时无法加载。<button type="button" class="link" @click="$emit('retry')">
        重试
      </button>
    </p>
    <template v-else-if="detail.data">
      <h3>{{ detail.data.title }}</h3>
      <p>{{ detail.data.date }} · {{ detail.data.version.name }} · {{ detail.data.totalCharacters.toLocaleString() }} 字</p>
      <p class="note">
        公告字符数表示文本规模，分类结果仅供参考，请以官方公告为准。
      </p>
      <h4>公告来源</h4>
      <ul>
        <li v-for="source in detail.data.sources" :key="source.id">
          {{ sourceLabel(source.type) }} · {{ source.date }}
          <a v-if="safeSourceUrl(source.url)" :href="safeSourceUrl(source.url)!" target="_blank" rel="noopener noreferrer">{{ source.name || '查看原公告' }} ↗</a>
          <span v-else>{{ source.name || '原公告链接暂不可用' }}</span>
        </li>
      </ul>
      <h4>分类内容</h4>
      <p v-if="!detail.data.groups.length">
        暂无分类内容。
      </p>
      <div v-for="(group, index) in detail.data.groups" :key="index" class="group">
        <strong>{{ group.type }}</strong>
        <p v-for="(paragraph, paragraphIndex) in group.content" :key="paragraphIndex">
          {{ paragraph }}
        </p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.timeline-detail { width: min(1200px, calc(100% - 80px)); margin: 0 auto 60px; padding: 26px 0; border-top: 1px solid var(--bg-color-borer); border-bottom: 1px solid var(--bg-color-borer); scroll-margin-top: 120px; }
.detail-heading { display: flex; justify-content: space-between; align-items: center; }.detail-heading h2 { font-size: 22px; }.detail-heading button, .link, a { color: var(--brand-color); cursor: pointer; }.timeline-detail p, li { color: var(--text-color-secondary); line-height: 1.8; }.note { font-size: 13px; }.group p { white-space: pre-wrap; overflow-wrap: anywhere; }.timeline-detail a { margin-left: 12px; text-decoration: underline; }
@media (max-width: 700px) { .timeline-detail { width: calc(100% - 40px); } }
</style>
