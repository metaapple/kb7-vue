import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'household-theme'

const apply = (dark) => {
  document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
  document.documentElement.classList.toggle('app-dark', dark)
}

export const useThemeStore = defineStore('theme', () => {
  const dark = ref(typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'dark')

  watch(
    dark,
    (v) => {
      apply(v)
      localStorage.setItem(STORAGE_KEY, v ? 'dark' : 'light')
    },
    { immediate: true },
  )

  const toggle = () => {
    dark.value = !dark.value
  }

  return { dark, toggle }
})
