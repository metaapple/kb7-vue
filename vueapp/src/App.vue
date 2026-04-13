<script setup>
import { useThemeStore } from '@/stores/theme'
import { useGameStore } from '@/stores/game'

useThemeStore()
useGameStore()
</script>

<template>
  <router-view />
</template>
