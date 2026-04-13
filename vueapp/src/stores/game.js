import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const keyFor = (userId) => `household-game-xp-${userId}`
const statsKeyFor = (userId) => `household-game-stats-${userId}`

const emptyTier = () => ({ correct: 0, attempted: 0, rounds: 0 })

const defaultTierStats = () => ({
  1: emptyTier(),
  2: emptyTier(),
  3: emptyTier(),
})

export const useGameStore = defineStore('game', () => {
  const xp = ref(0)
  const tierStats = ref(defaultTierStats())

  const mergeTierStats = (raw) => {
    const base = defaultTierStats()
    if (!raw || typeof raw !== 'object') return base
    for (const t of [1, 2, 3]) {
      const row = raw[t] || raw[String(t)]
      if (row && typeof row === 'object') {
        base[t] = {
          correct: Math.max(0, Number(row.correct) || 0),
          attempted: Math.max(0, Number(row.attempted) || 0),
          rounds: Math.max(0, Number(row.rounds) || 0),
        }
      }
    }
    return base
  }

  const loadForUser = (userId) => {
    if (!userId) {
      xp.value = 0
      tierStats.value = defaultTierStats()
      return
    }
    const rawXp = localStorage.getItem(keyFor(userId))
    xp.value = rawXp ? Number.parseInt(rawXp, 10) || 0 : 0
    try {
      const rawStats = localStorage.getItem(statsKeyFor(userId))
      tierStats.value = rawStats ? mergeTierStats(JSON.parse(rawStats)) : defaultTierStats()
    } catch {
      tierStats.value = defaultTierStats()
    }
  }

  const persist = () => {
    const id = useAuthStore().user?.id
    if (!id) return
    try {
      localStorage.setItem(keyFor(id), String(xp.value))
    } catch {
      /* quota / private mode — XP는 세션 동안만 유지 */
    }
  }

  const persistStats = () => {
    const id = useAuthStore().user?.id
    if (!id) return
    try {
      localStorage.setItem(statsKeyFor(id), JSON.stringify(tierStats.value))
    } catch {
      /* ignore */
    }
  }

  const authStore = useAuthStore()
  watch(
    () => authStore.user?.id,
    (id) => loadForUser(id),
    { immediate: true },
  )

  /** 레벨 1부터, 100XP마다 +1 */
  const level = computed(() => Math.floor(xp.value / 100) + 1)

  /** 현재 레벨 구간에서의 XP (0~99) */
  const xpInCurrentLevel = computed(() => xp.value % 100)

  const addXp = (amount) => {
    const n = Number(amount) || 0
    if (n <= 0) return
    xp.value += n
    persist()
  }

  /** 퀴즈 라운드 종료 시 구간(tier 1~3)별 누적 기록 */
  const recordRound = ({ tier, correct, total }) => {
    const t = Math.min(3, Math.max(1, Number(tier) || 1))
    const c = Math.max(0, Number(correct) || 0)
    const n = Math.max(0, Number(total) || 0)
    const prev = tierStats.value[t]
    const next = { ...tierStats.value, [t]: { ...prev, correct: prev.correct + c, attempted: prev.attempted + n, rounds: prev.rounds + 1 } }
    tierStats.value = next
    persistStats()
  }

  const totalsFromStats = computed(() => {
    const s = tierStats.value
    let correct = 0
    let attempted = 0
    let rounds = 0
    for (const t of [1, 2, 3]) {
      correct += s[t].correct
      attempted += s[t].attempted
      rounds += s[t].rounds
    }
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : null
    return { correct, attempted, rounds, accuracy }
  })

  return {
    xp,
    tierStats,
    level,
    xpInCurrentLevel,
    totalsFromStats,
    addXp,
    recordRound,
    loadForUser,
  }
})
