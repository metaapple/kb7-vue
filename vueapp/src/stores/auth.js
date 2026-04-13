import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/client'

const CURRENT_USER_KEY = 'currentUser'

const toPublicUser = (row) => ({
  id: String(row.id),
  name: row.name,
  email: row.email,
  avatarUrl: row.avatarUrl || '',
})

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profileLoading = ref(false)
  const profileError = ref('')

  const isAuthenticated = computed(() => !!user.value)

  const restoreSession = () => {
    if (user.value) return
    const savedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const persistSession = (sessionUser) => {
    user.value = sessionUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser))
  }

  /** 서버 최신 프로필 (이름·이메일) 동기화 */
  const fetchProfile = async () => {
    if (!user.value?.id) {
      return { ok: false, message: '로그인이 필요합니다.' }
    }
    profileLoading.value = true
    profileError.value = ''
    try {
      const { data } = await api.get(`/users/${user.value.id}`)
      const sessionUser = toPublicUser(data)
      persistSession(sessionUser)
      return { ok: true }
    } catch {
      profileError.value = '프로필을 불러오지 못했습니다.'
      return { ok: false, message: profileError.value }
    } finally {
      profileLoading.value = false
    }
  }

  const signup = async (name, email, password) => {
    try {
      const dup = await api.get('/users', { params: { email } })
      if (Array.isArray(dup.data) && dup.data.length > 0) {
        return { ok: false, message: '이미 존재하는 이메일입니다.' }
      }

      const { data } = await api.post('/users', { name, email, password, avatarUrl: '' })
      persistSession(toPublicUser(data))
      return { ok: true }
    } catch {
      return { ok: false, message: '회원가입 요청에 실패했습니다. API 서버를 확인하세요.' }
    }
  }

  const login = async (email, password) => {
    try {
      // email만 쿼리 후 비밀번호는 클라이언트에서 비교 (프록시/필터 이슈 완화, 비밀번호를 URL 쿼리에 덜 노출)
      const { data } = await api.get('/users', { params: { email } })
      const list = Array.isArray(data) ? data : []
      const found = list.find((u) => String(u.password) === String(password))
      if (!found) {
        return { ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
      }
      persistSession(toPublicUser(found))
      return { ok: true }
    } catch (e) {
      const isNetwork = !e?.response
      const hint = isNetwork
        ? ' (json-server가 3001에서 떠 있는지, `npm run api` 또는 `npm run dev:full` 확인)'
        : ''
      return {
        ok: false,
        message: `로그인 요청에 실패했습니다.${hint}`,
      }
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  return {
    user,
    profileLoading,
    profileError,
    isAuthenticated,
    restoreSession,
    fetchProfile,
    signup,
    login,
    logout,
  }
})
