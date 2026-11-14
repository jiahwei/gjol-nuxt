export type LoadState = 'idle' | 'loading' | 'ready' | 'empty' | 'error'

export interface ArchiveVersion {
  id: number
  name: string
  start: string
  end: string | null
  updateCount: number
  sourceCount: number
  totalCharacters: number
  medianCharacters: number
}
export interface ArchiveTimelineItem {
  id: number
  date: string
  title: string
  version: { id: number, name: string }
  totalCharacters: number
}
export interface ArchiveOverview {
  coverage: { start: string | null, end: string | null, processedSources: number, totalSources: number, complete: boolean }
  totals: { updates: number, sources: number, versions: number, characters: number }
  versions: ArchiveVersion[]
  timeline: ArchiveTimelineItem[]
}
export interface ArchiveSource { id: string, type: string, name: string, date: string, url: string }
export interface ArchiveCategory { type: string, characters: number, paragraphs: number }
export interface ArchiveUpdate {
  id: number
  date: string
  title: string
  version: { id: number, name: string }
  totalCharacters: number
  sourceCount: number
  sources: ArchiveSource[]
  categories: ArchiveCategory[]
  status: 'published'
}
export interface ArchiveDetail extends ArchiveUpdate { groups: { type: string, leng: number, content: string[] }[] }
export interface ArchiveFilters { version_id: string, from: string, to: string }
export interface ArchiveDetailState { state: LoadState, data: ArchiveDetail | null }
export interface ArchiveList { items: ArchiveUpdate[], total: number, page: number, page_size: number }
export interface ArchiveState {
  overview: ArchiveOverview | null
  overviewState: LoadState
  items: ArchiveUpdate[]
  total: number
  page: number
  pageSize: number
  updatesState: LoadState
  filters: ArchiveFilters
  filterError: string
  details: Record<number, ArchiveDetailState>
}
