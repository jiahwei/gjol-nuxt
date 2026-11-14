<script setup lang="ts">
import ArchiveOverview from '~/components/index/archiveOverview.vue'
import ArchiveList from '~/components/index/archiveList.vue'
import Faq from '~/components/index/faq.vue'
import TimelineDetail from '~/components/index/timelineDetail.vue'

const { state, loadOverview, loadUpdates, applyFilters, setPage, loadDetail } = useArchive()

const selectedTimelineId = ref<number | null>(null)
const latestUpdateDate = computed(() => state.overview?.timeline.reduce<string | null>((latest, item) => !latest || item.date > latest ? item.date : latest, null) || null)
async function selectUpdate(id: number) {
  selectedTimelineId.value = id
  void loadDetail(id)
  await nextTick()
  const detail = document.getElementById('timeline-detail')
  detail?.focus({ preventScroll: true })
  detail?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  void loadOverview()
  void loadUpdates()
})

useHead({ title: '古网更新档案 | GjoL DB', meta: [{ name: 'description', content: '记录古剑奇谭网络版的更新历程与公告档案。' }] })
</script>

<template>
  <div class="archive-page">
    <ArchiveOverview :overview="state.overview" :state="state.overviewState" :latest-update-date="latestUpdateDate" @retry="loadOverview" @select-update="selectUpdate" />
    <TimelineDetail v-if="selectedTimelineId !== null" :detail="state.details[selectedTimelineId]" @close="selectedTimelineId = null" @retry="loadDetail(selectedTimelineId!)" />
    <ArchiveList
      :versions="state.overview?.versions || []"
      :items="state.items"
      :total="state.total"
      :page="state.page"
      :page-size="state.pageSize"
      :state="state.updatesState"
      :filter-error="state.filterError"
      :details="state.details"
      @apply-filters="applyFilters"
      @page-change="setPage"
      @toggle-detail="loadDetail"
      @retry="loadUpdates"
      @retry-detail="loadDetail"
    />
    <section id="faq" class="faq-section">
      <div class="section-shell">
        <div class="section-heading">
          <div>
            <p class="section-index">
              04 / FAQ
            </p>
            <h2>常见问题</h2>
          </div>
          <p>关于档案和公告分类的一些说明。</p>
        </div>
        <Faq />
      </div>
    </section>
  </div>
</template>

<style scoped>
.archive-page { color: var(--text-color-primary); font-family: 'Noto Serif SC', 'Songti SC', serif; }
.section-shell { width: min(1200px, calc(100% - 80px)); margin: 0 auto; }
.faq-section { background: var(--bg-color-page); padding: 105px 0 110px; scroll-margin-top: 70px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 46px; }
.section-index { color: var(--brand-color); font: 600 11px/1.5 sans-serif; letter-spacing: .16em; margin: 0 0 22px; }
.section-heading h2 { font-size: clamp(28px, 2.3vw, 32px); font-weight: 600; letter-spacing: .06em; margin: 0; }
.section-heading > p { color: var(--text-color-secondary); font-size: 14px; line-height: 1.8; margin: 0; }
@media (max-width: 700px) { .section-shell { width: calc(100% - 40px); }.faq-section { padding: 75px 0 80px; scroll-margin-top: 110px; }.section-heading { display: block; margin-bottom: 35px; }.section-heading > p { margin-top: 18px; } }
</style>
