/** Group updates by their actual year while retaining empty intervening years. */
export function buildTimelineYears(entries) {
  const byYear = new Map()
  const undated = []
  for (const entry of entries) {
    const value = entry.date
    const date = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00Z`) : null
    if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
      undated.push(entry)
      continue
    }
    const year = Number(value.slice(0, 4))
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year).push(entry)
  }
  const years = [...byYear.keys()].sort((a, b) => a - b)
  const span = years.length ? years[years.length - 1] - years[0] : 0
  // Avoid an unbounded allocation if a malformed upstream response spans millennia.
  const labels = span <= 100 && years.length ? Array.from({ length: span + 1 }, (_, i) => years[0] + i) : years
  const groups = labels.map(year => ({
    label: String(year),
    items: [...(byYear.get(year) || [])].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id),
  }))
  if (undated.length) groups.push({ label: '日期待确认', items: undated })
  return groups
}
