<script setup lang="ts">
import { DatePicker, parseDate } from '@ark-ui/vue/date-picker'
import { useId } from 'vue'
import type { DatePickerValueChangeDetails, DateValue } from '@ark-ui/vue/date-picker'

const props = defineProps<{ modelValue: string, label: string, name?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const inputId = useId()

function parseInput(value: string): DateValue | undefined {
  try {
    return parseDate(value)
  }
  catch {
    return undefined
  }
}

const selected = computed(() => {
  const value = parseInput(props.modelValue)
  return value ? [value] : []
})

function updateValue(details: DatePickerValueChangeDetails) {
  emit('update:modelValue', details.valueAsString[0] || '')
}

function updateInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <DatePicker.Root
    class="date-picker"
    :model-value="selected"
    :name="name"
    :ids="{ input: () => inputId }"
    locale="zh-CN"
    :start-of-week="1"
    :format="(date) => date.toString()"
    :parse="parseInput"
    :positioning="{ placement: 'bottom-start', strategy: 'fixed', gutter: 6, fitViewport: true, overflowPadding: 12 }"
    @value-change="updateValue"
  >
    <DatePicker.Control class="date-control">
      <input :id="inputId" class="date-input" :value="modelValue" :name="name" :aria-label="label" placeholder="YYYY-MM-DD" autocomplete="off" @input="updateInput">
      <DatePicker.Trigger class="date-trigger" :aria-label="`选择${label}`">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></svg>
      </DatePicker.Trigger>
    </DatePicker.Control>
    <Teleport to="body">
      <DatePicker.Positioner class="date-positioner">
        <DatePicker.Content class="date-content">
          <DatePicker.Context v-slot="calendar">
            <DatePicker.View view="day">
              <DatePicker.ViewControl class="calendar-header">
                <DatePicker.PrevTrigger class="calendar-nav" aria-label="上个月">
                  ‹
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class="calendar-heading">
                  {{ calendar.visibleRangeText.start }}
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class="calendar-nav" aria-label="下个月">
                  ›
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class="calendar-table">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    <DatePicker.TableHeader v-for="day in calendar.weekDays" :key="day.long" :aria-label="day.long">
                      {{ day.narrow }}
                    </DatePicker.TableHeader>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  <DatePicker.TableRow v-for="(week, index) in calendar.weeks" :key="index">
                    <DatePicker.TableCell v-for="day in week" :key="day.toString()" :value="day">
                      <DatePicker.TableCellTrigger class="calendar-cell">
                        {{ day.day }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.ViewControl class="calendar-header">
                <DatePicker.PrevTrigger class="calendar-nav" aria-label="上一年">
                  ‹
                </DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger class="calendar-heading">
                  {{ calendar.visibleRange.start.year }}年
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger class="calendar-nav" aria-label="下一年">
                  ›
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class="calendar-table calendar-grid" :columns="4">
                <DatePicker.TableBody>
                  <DatePicker.TableRow v-for="(row, index) in calendar.getMonthsGrid({ columns: 4, format: 'short' })" :key="index">
                    <DatePicker.TableCell v-for="month in row" :key="month.value" :value="month.value">
                      <DatePicker.TableCellTrigger class="calendar-cell">
                        {{ month.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.ViewControl class="calendar-header">
                <DatePicker.PrevTrigger class="calendar-nav" aria-label="上一个十年">
                  ‹
                </DatePicker.PrevTrigger>
                <span class="calendar-heading">{{ calendar.getDecade().start }}–{{ calendar.getDecade().end }}</span>
                <DatePicker.NextTrigger class="calendar-nav" aria-label="下一个十年">
                  ›
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class="calendar-table calendar-grid" :columns="4">
                <DatePicker.TableBody>
                  <DatePicker.TableRow v-for="(row, index) in calendar.getYearsGrid({ columns: 4 })" :key="index">
                    <DatePicker.TableCell v-for="year in row" :key="year.value" :value="year.value">
                      <DatePicker.TableCellTrigger class="calendar-cell">
                        {{ year.label }}
                      </DatePicker.TableCellTrigger>
                    </DatePicker.TableCell>
                  </DatePicker.TableRow>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
            <div class="calendar-footer">
              <button type="button" class="calendar-clear" @click="emit('update:modelValue', ''); calendar.clearValue()">
                清除日期
              </button>
            </div>
          </DatePicker.Context>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </Teleport>
  </DatePicker.Root>
</template>

<style scoped>
.date-picker { position: relative; min-width: 0; }
.date-control { display: flex; align-items: center; min-width: 0; height: 44px; box-sizing: border-box; border: 1px solid var(--bg-color-borer); border-radius: 8px; background: var(--bg-color-page); transition: border-color .15s, box-shadow .15s; }
.date-control:hover { border-color: var(--text-color-placeholder); }
.date-control:focus-within { border-color: var(--brand-color); box-shadow: 0 0 0 3px var(--brand-color-focus); }
.date-input { width: 100%; min-width: 0; padding: 0 0 0 12px; border: 0; outline: 0; background: transparent; color: var(--text-color-primary); font: 14px sans-serif; }
.date-input::placeholder { color: var(--text-color-placeholder); font-size: 12px; }
.date-trigger { display: grid; place-items: center; flex: 0 0 42px; height: 42px; color: var(--text-color-secondary); cursor: pointer; }
.date-trigger svg { width: 17px; height: 17px; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.date-trigger:focus-visible, .date-content :focus-visible { outline: 2px solid var(--brand-color); outline-offset: 1px; }
.date-positioner { z-index: 100 !important; }
.date-content { max-height: var(--available-height, 100vh); overflow-y: auto; width: min(296px, calc(100vw - 40px)); box-sizing: border-box; padding: 12px; border: 1px solid var(--bg-color-borer); border-radius: 12px; background: var(--bg-color-page); color: var(--text-color-primary); box-shadow: 0 12px 32px rgb(0 0 0 / 14%); font: 13px sans-serif; }
.calendar-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.calendar-heading { flex: 1; text-align: center; font: 600 14px sans-serif; cursor: pointer; }
.calendar-nav { width: 34px; height: 34px; border-radius: 7px; color: var(--text-color-secondary); font: 24px/1 sans-serif; cursor: pointer; }
.calendar-nav:hover, .calendar-heading:hover, .calendar-clear:hover { background: var(--bg-color-secondarypage); color: var(--brand-color); }
.calendar-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: center; }
.calendar-table th { height: 30px; color: var(--text-color-secondary); font: 12px sans-serif; }
.calendar-table td { padding: 1px; }
.calendar-cell { display: grid; place-items: center; width: 100%; height: 34px; border-radius: 7px; cursor: pointer; }
.calendar-cell:hover, .calendar-cell[data-focus] { background: var(--brand-color-light); color: var(--brand-color); }
.calendar-cell[data-selected] { background: var(--brand-color); color: white; }
.calendar-cell[data-outside-range] { color: var(--text-color-placeholder); }
.calendar-cell[data-disabled] { opacity: .35; cursor: not-allowed; }
.calendar-grid .calendar-cell { height: 42px; }
.calendar-footer { display: flex; justify-content: flex-end; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--bg-color-borer); }
.calendar-clear { padding: 7px 9px; border-radius: 6px; color: var(--text-color-secondary); font: 12px sans-serif; cursor: pointer; }
</style>
