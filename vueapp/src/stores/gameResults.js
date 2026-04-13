import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

export const useGameResultsStore = defineStore('gameResults', () => {
  const history = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchMyResults = async () => {
    const auth = useAuthStore()
    const userId = auth.user?.id
    if (!userId) {
      history.value = []
      return { ok: false, message: '' }
    }
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get('/gameResults', { params: { userId } })
      const list = Array.isArray(data) ? data : []
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      history.value = list
      return { ok: true }
    } catch (e) {
      error.value = e?.response?.data?.message || '게임 결과를 불러오지 못했습니다.'
      history.value = []
      return { ok: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const saveResult = async (payload) => {
    const auth = useAuthStore()
    const userId = auth.user?.id
    if (!userId) return { ok: false, message: '로그인이 필요합니다.' }
    error.value = ''
    try {
      const body = {
        userId,
        tier: Math.min(3, Math.max(1, Number(payload.tier) || 1)),
        correct: Math.max(0, Number(payload.correct) || 0),
        total: Math.max(1, Number(payload.total) || 5),
        xpTotal: Math.max(0, Number(payload.xpTotal) || 0),
        level: Math.max(1, Number(payload.level) || 1),
        createdAt: new Date().toISOString(),
      }
      const { data } = await api.post('/gameResults', body)
      history.value = [data, ...history.value.filter((h) => String(h.id) !== String(data.id))]
      return { ok: true }
    } catch (e) {
      const msg = e?.response?.data?.message || '게임 결과 저장에 실패했습니다.'
      error.value = msg
      return { ok: false, message: msg }
    }
  }

  return {
    history,
    loading,
    error,
    fetchMyResults,
    saveResult,
  }
})
