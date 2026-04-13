<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, default: '' },
  changeType: { type: String, default: 'neutral' },
})

const changeClassMap = {
  positive: 'text-success',
  negative: 'text-danger',
  neutral: 'text-secondary',
}
</script>

<template>
  <div>
    <div class="text-secondary small mb-1">{{ label }}</div>
    <div class="fs-3 fw-semibold text-body">{{ value }}</div>
    <div v-if="change" :class="['small', changeClassMap[changeType] || changeClassMap.neutral]">
      {{ change }}
    </div>
  </div>
</template>
