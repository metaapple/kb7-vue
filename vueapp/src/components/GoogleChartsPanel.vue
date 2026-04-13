<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { loadGoogleCharts } from '@/composables/loadGoogleCharts'

const props = defineProps({
  transactions: { type: Array, required: true },
  dark: { type: Boolean, default: false },
})

/** 앱 전역 폰트(MJ벚꽃)와 맞춤 — 미설치 시 맑은고딕 등으로 대체 */
const CHART_FONT = 'MJ벚꽃, Apple SD Gothic Neo, Malgun Gothic, sans-serif'

const ready = ref(false)
const loadError = ref('')

const monthKey = (dateStr) => {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const monthLabel = (key) => {
  if (!key) return ''
  const [, m] = key.split('-')
  return `${Number(m)}월`
}

const chartTextStyle = computed(() => ({
  color: props.dark ? '#e5e7eb' : '#374151',
  fontSize: 12,
  fontName: CHART_FONT,
}))

const chartOptionsBase = computed(() => ({
  backgroundColor: props.dark ? '#1e293b' : '#ffffff',
  fontName: CHART_FONT,
  legend: { position: 'bottom', textStyle: chartTextStyle.value },
  titleTextStyle: { ...chartTextStyle.value, fontSize: 14, bold: true },
  hAxis: { textStyle: chartTextStyle.value, titleTextStyle: chartTextStyle.value },
  vAxis: { textStyle: chartTextStyle.value, titleTextStyle: chartTextStyle.value },
}))

const monthlyRows = computed(() => {
  const byMonth = new Map()
  for (const t of props.transactions) {
    const key = monthKey(t.date)
    if (!key) continue
    if (!byMonth.has(key)) byMonth.set(key, { income: 0, expense: 0 })
    const b = byMonth.get(key)
    const n = Number(t.amount)
    if (t.type === 'income') b.income += n
    else b.expense += n
  }
  const keys = [...byMonth.keys()].sort()
  const rows = [['월', '수입 💵', '지출 💸']]
  for (const k of keys) {
    const b = byMonth.get(k)
    rows.push([monthLabel(k), b.income, b.expense])
  }
  if (rows.length === 1) rows.push(['—', 0, 0])
  return rows
})

const categoryExpenseRows = computed(() => {
  const map = new Map()
  for (const t of props.transactions) {
    if (t.type !== 'expense') continue
    const c = t.category || '기타'
    map.set(c, (map.get(c) || 0) + Number(t.amount))
  }
  const rows = [['카테고리', '금액']]
  for (const [k, v] of [...map.entries()].sort((a, b) => b[1] - a[1])) {
    rows.push([k, v])
  }
  if (rows.length === 1) rows.push(['내역 없음', 1])
  return rows
})

const incomeVsExpense = computed(() => {
  let inc = 0
  let exp = 0
  for (const t of props.transactions) {
    if (t.type === 'income') inc += Number(t.amount)
    else exp += Number(t.amount)
  }
  return [
    ['구분', '금액'],
    ['총 수입 ✨', inc],
    ['총 지출 🛒', exp],
  ]
})

const cumulativeRows = computed(() => {
  const sorted = [...props.transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
  const rows = [['일자', '누적 잔액']]
  let bal = 0
  for (const t of sorted) {
    bal += t.type === 'income' ? Number(t.amount) : -Number(t.amount)
    rows.push([t.date, bal])
  }
  if (rows.length === 1) rows.push(['—', 0])
  return rows
})

const weeklyExpenseRows = computed(() => {
  const map = new Map()
  for (const t of props.transactions) {
    if (t.type !== 'expense') continue
    const d = new Date(t.date)
    if (Number.isNaN(d.getTime())) continue
    const one = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const day = one.getDay()
    const diff = one.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(one)
    monday.setDate(diff)
    const key = monday.toISOString().slice(0, 10)
    map.set(key, (map.get(key) || 0) + Number(t.amount))
  }
  const rows = [['주(시작일)', '지출']]
  for (const [k, v] of [...map.entries()].sort()) {
    rows.push([k, v])
  }
  if (rows.length === 1) rows.push(['—', 0])
  return rows
})

const elColumn = ref(null)
const elPie = ref(null)
const elLine = ref(null)
const elArea = ref(null)
const elBar = ref(null)
const elDonut = ref(null)

const clearContainers = () => {
  for (const r of [elColumn, elPie, elLine, elArea, elBar, elDonut]) {
    if (r.value) r.value.innerHTML = ''
  }
}

const drawAll = () => {
  if (!ready.value || !window.google?.visualization) return
  clearContainers()
  const { google } = window
  const common = chartOptionsBase.value

  if (elColumn.value && monthlyRows.value.length > 1) {
    const data = google.visualization.arrayToDataTable(monthlyRows.value)
    const chart = new google.visualization.ColumnChart(elColumn.value)
    chart.draw(data, {
      ...common,
      title: '📊 월별 수입·지출',
      colors: ['#6366f1', '#f97316'],
      legend: { position: 'top', textStyle: chartTextStyle.value },
    })
  }

  if (elPie.value && categoryExpenseRows.value.length > 1) {
    const data = google.visualization.arrayToDataTable(categoryExpenseRows.value)
    const chart = new google.visualization.PieChart(elPie.value)
    chart.draw(data, {
      ...common,
      title: '🍕 카테고리별 지출',
      pieHole: 0.35,
      slices: {
        0: { color: '#8b5cf6' },
        1: { color: '#ec4899' },
        2: { color: '#f59e0b' },
        3: { color: '#10b981' },
        4: { color: '#3b82f6' },
        5: { color: '#64748b' },
      },
    })
  }

  if (elLine.value && cumulativeRows.value.length > 1) {
    const data = google.visualization.arrayToDataTable(cumulativeRows.value)
    const chart = new google.visualization.LineChart(elLine.value)
    chart.draw(data, {
      ...common,
      title: '📈 누적 잔액 추이',
      colors: ['#22c55e'],
      curveType: 'function',
      pointSize: 4,
    })
  }

  if (elArea.value && monthlyRows.value.length > 1) {
    const data = google.visualization.arrayToDataTable(monthlyRows.value)
    const chart = new google.visualization.AreaChart(elArea.value)
    chart.draw(data, {
      ...common,
      title: '🌊 월별 흐름(면적)',
      colors: ['#38bdf8', '#fb7185'],
    })
  }

  if (elBar.value && weeklyExpenseRows.value.length > 1) {
    const data = google.visualization.arrayToDataTable(weeklyExpenseRows.value)
    const chart = new google.visualization.BarChart(elBar.value)
    chart.draw(data, {
      ...common,
      title: '📅 주차별 지출',
      colors: ['#f472b6'],
    })
  }

  if (elDonut.value && incomeVsExpense.value.length > 1) {
    const data = google.visualization.arrayToDataTable(incomeVsExpense.value)
    const chart = new google.visualization.PieChart(elDonut.value)
    chart.draw(data, {
      ...common,
      title: '⚖️ 수입 vs 지출',
      pieHole: 0.55,
      colors: ['#4ade80', '#fb923c'],
    })
  }
}

const onResize = () => {
  if (ready.value) drawAll()
}

onMounted(async () => {
  window.addEventListener('resize', onResize)
  try {
    await loadGoogleCharts()
    ready.value = true
    drawAll()
  } catch (e) {
    loadError.value = e?.message || '차트를 불러오지 못했습니다.'
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  clearContainers()
})

watch(
  () => [props.transactions, props.dark],
  () => {
    if (ready.value) drawAll()
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div v-if="loadError" class="alert alert-warning rounded-4">{{ loadError }}</div>
    <div v-else-if="!ready" class="text-secondary small py-3">📉 Google Charts 불러오는 중…</div>

    <div class="row g-4">
      <div class="col-12 col-xl-6">
        <div ref="elColumn" class="google-chart-box rounded-4 border" />
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div ref="elPie" class="google-chart-box rounded-4 border" />
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div ref="elDonut" class="google-chart-box rounded-4 border" />
      </div>
      <div class="col-12 col-lg-6">
        <div ref="elLine" class="google-chart-box rounded-4 border" />
      </div>
      <div class="col-12 col-lg-6">
        <div ref="elArea" class="google-chart-box rounded-4 border" />
      </div>
      <div class="col-12">
        <div ref="elBar" class="google-chart-box google-chart-wide rounded-4 border" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.google-chart-box {
  min-height: 400px;
  width: 100%;
}
.google-chart-wide {
  min-height: 440px;
}
</style>
