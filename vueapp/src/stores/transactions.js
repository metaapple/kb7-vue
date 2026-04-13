import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const monthKey = (dateStr) => {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const monthLabel = (key) => {
  if (!key) return ''
  const [y, m] = key.split('-')
  return `${Number(m)}월`
}

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref('')
  const listPage = ref(1)
  const listPageSize = ref(8)

  const sortedTransactions = computed(() =>
    [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date)),
  )

  const listTotalPages = computed(() =>
    Math.max(1, Math.ceil(sortedTransactions.value.length / listPageSize.value)),
  )

  const pagedSortedTransactions = computed(() => {
    const start = (listPage.value - 1) * listPageSize.value
    return sortedTransactions.value.slice(start, start + listPageSize.value)
  })

  const listRangeText = computed(() => {
    if (sortedTransactions.value.length === 0) return '0건'
    const start = (listPage.value - 1) * listPageSize.value + 1
    const end = Math.min(listPage.value * listPageSize.value, sortedTransactions.value.length)
    return `${start}–${end} / ${sortedTransactions.value.length}건`
  })

  const clampListPage = () => {
    const tp = listTotalPages.value
    if (listPage.value > tp) listPage.value = tp
  }

  const goToListPage = (p) => {
    listPage.value = Math.min(Math.max(1, p), listTotalPages.value)
  }

  const totalIncome = computed(() =>
    transactions.value
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0),
  )

  const totalExpense = computed(() =>
    transactions.value
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0),
  )

  const balance = computed(() => totalIncome.value - totalExpense.value)

  const chartData = computed(() => {
    const byMonth = new Map()
    for (const t of transactions.value) {
      const key = monthKey(t.date)
      if (!key) continue
      if (!byMonth.has(key)) {
        byMonth.set(key, { month: monthLabel(key), income: 0, expense: 0 })
      }
      const bucket = byMonth.get(key)
      const n = Number(t.amount)
      if (t.type === 'income') bucket.income += n
      else bucket.expense += n
    }
    const keys = [...byMonth.keys()].sort()
    const last4 = keys.slice(-4)
    return last4.map((k) => byMonth.get(k))
  })

  const setErrorFromResponse = (e, fallback) => {
    error.value = e?.response?.data?.message || fallback
  }

  const fetchTransactions = async () => {
    const auth = useAuthStore()
    const userId = auth.user?.id
    if (!userId) {
      transactions.value = []
      return { ok: false, message: '로그인이 필요합니다.' }
    }
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get('/transactions', { params: { userId } })
      transactions.value = Array.isArray(data) ? data : []
      listPage.value = 1
      return { ok: true }
    } catch (e) {
      setErrorFromResponse(e, '거래 내역을 불러오지 못했습니다.')
      transactions.value = []
      listPage.value = 1
      return { ok: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const addTransaction = async (payload) => {
    const auth = useAuthStore()
    const userId = auth.user?.id
    if (!userId) return { ok: false, message: '로그인이 필요합니다.' }
    error.value = ''
    try {
      const body = {
        userId,
        date: payload.date,
        category: payload.category,
        description: payload.description,
        amount: Number(payload.amount),
        type: payload.type,
      }
      const { data } = await api.post('/transactions', body)
      transactions.value.unshift(data)
      listPage.value = 1
      return { ok: true }
    } catch (e) {
      setErrorFromResponse(e, '거래 추가에 실패했습니다.')
      return { ok: false, message: error.value }
    }
  }

  const updateTransaction = async (id, payload) => {
    const auth = useAuthStore()
    const userId = auth.user?.id
    if (!userId) return { ok: false, message: '로그인이 필요합니다.' }
    error.value = ''
    try {
      const body = {
        userId,
        date: payload.date,
        category: payload.category,
        description: payload.description,
        amount: Number(payload.amount),
        type: payload.type,
      }
      const { data } = await api.put(`/transactions/${id}`, body)
      const idx = transactions.value.findIndex((t) => String(t.id) === String(id))
      if (idx !== -1) transactions.value[idx] = data
      return { ok: true }
    } catch (e) {
      setErrorFromResponse(e, '거래 수정에 실패했습니다.')
      return { ok: false, message: error.value }
    }
  }

  const deleteTransaction = async (id) => {
    error.value = ''
    try {
      await api.delete(`/transactions/${id}`)
      transactions.value = transactions.value.filter((item) => String(item.id) !== String(id))
      clampListPage()
      return { ok: true }
    } catch (e) {
      setErrorFromResponse(e, '거래 삭제에 실패했습니다.')
      return { ok: false, message: error.value }
    }
  }

  return {
    transactions,
    loading,
    error,
    listPage,
    listPageSize,
    listTotalPages,
    pagedSortedTransactions,
    listRangeText,
    goToListPage,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    sortedTransactions,
    totalIncome,
    totalExpense,
    balance,
    chartData,
  }
})
