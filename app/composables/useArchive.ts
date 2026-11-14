import { createArchiveController, createArchiveState } from '~/utils/archive.mjs'

/** Client-side archive state; the static site uses the existing /api reverse proxy. */
export function useArchive() {
  const state = reactive(createArchiveState())
  return createArchiveController((url: string, options?: { signal?: AbortSignal }) => $fetch(url, options), state)
}
