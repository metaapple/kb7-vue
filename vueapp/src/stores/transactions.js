import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const TRANSACTIONS_KEY = 'transactions'

const defaultTransactions = [
  { id: '1', date: '2026-04-10', category: '급여', description: '월급', amount: 3000000, type: 'income' },
  { id: '2', date: '2026-04-09', category: '식비', description: '저녁 회식', amount: 45000, type: 'expense' },
  { id: '3', date: '2026-04-08', category: '교통비', description: '지하철 충전', amount: 50000, type: 'expense' },
  { id: '4', date: '2026-04-07', category: '문화생활', description: '영화관람', amount: 15000, type: 'expense' },
  { id: '5', date: '2026-04-05', category: '식비', description: '마트 장보기', amount: 120000, type: 'expense' },
]

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref([])
  const initialized = ref(false)

  const init = () => {
    if (initialized.value) return
    const saved = localStorage.getItem(TRANSACTIONS_KEY)
    transactions.value = saved ? JSON.parse(saved) : defaultTransactions
    initialized.value = true
  }

  const persist = () => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions.value))
  }

  const addTransaction = (payload) => {
    transactions.value.unshift({
      id: Date.now().toString(),
      ...payload,
      amount: Number(payload.amount),
    })
    persist()
  }

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter((item) => item.id !== id)
    persist()
  }

  const sortedTransactions = computed(() => {
    return [...transactions.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const totalIncome = computed(() => transactions.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0))

  const totalExpense = computed(() => transactions.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0))

  const balance = computed(() => totalIncome.value - totalExpense.value)

  const chartData = computed(() => {
    const months = ['1월', '2월', '3월', '4월']
    return months.map((month, index) => {
      if (index === 3) {
        return { month, income: totalIncome.value, expense: totalExpense.value }
      }
      return {
        month,
        income: 2500000 + (index + 1) * 170000,
        expense: 1200000 + (index + 1) * 130000,
      }
    })
  })

  return {
    transactions,
    init,
    addTransaction,
    deleteTransaction,
    sortedTransactions,
    totalIncome,
    totalExpense,
    balance,
    chartData,
  }
})
