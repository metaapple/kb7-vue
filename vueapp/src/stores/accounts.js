import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref([])
  const loading = ref(false)
  const error = ref('')
  const page = ref(1)
  const pageSize = ref(5)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(accounts.value.length / pageSize.value)),
  )

  const pagedAccounts = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return accounts.value.slice(start, start + pageSize.value)
  })

  const rangeText = computed(() => {
    if (accounts.value.length === 0) return '0건'
    const start = (page.value - 1) * pageSize.value + 1
    const end = Math.min(page.value * pageSize.value, accounts.value.length)
    return `${start}–${end} / ${accounts.value.length}건`
  })

  const fetchAccounts = async () => {
    const auth = useAuthStore()
    if (!auth.user?.id) {
      accounts.value = []
      return { ok: false, message: '로그인이 필요합니다.' }
    }
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get('/accounts', { params: { userId: auth.user.id } })
      accounts.value = Array.isArray(data) ? data : []
      page.value = 1
      return { ok: true }
    } catch (e) {
      error.value = e?.response?.data?.message || '계좌 목록을 불러오지 못했습니다.'
      accounts.value = []
      return { ok: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), totalPages.value)
    page.value = next
  }

  const clear = () => {
    accounts.value = []
    page.value = 1
    error.value = ''
  }

  return {
    accounts,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    pagedAccounts,
    rangeText,
    fetchAccounts,
    goToPage,
    clear,
  }
})
