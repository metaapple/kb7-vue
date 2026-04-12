import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'currentUser'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  const restoreSession = () => {
    if (user.value) return
    const savedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const exists = users.find((item) => item.email === email)
    if (exists) return { ok: false, message: '이미 존재하는 이메일입니다.' }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    const currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }

    user.value = currentUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
    return { ok: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const foundUser = users.find((item) => item.email === email && item.password === password)
    if (!foundUser) {
      return { ok: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
    }

    const currentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    }

    user.value = currentUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
    return { ok: true }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  return {
    user,
    isAuthenticated,
    restoreSession,
    signup,
    login,
    logout,
  }
})
