<script setup>
defineProps({
  transactions: { type: Array, required: true },
})

const emit = defineEmits(['delete', 'edit'])

const categoryEmoji = (category) => ({
  식비: '🍱',
  교통비: '🚇',
  문화생활: '🎬',
  쇼핑: '🛍️',
  의료: '💊',
  급여: '💰',
  용돈: '🧧',
  부수입: '💼',
  기타: '📌',
}[category] || '✨')

const badgeClass = (category) => ({
  식비: 'text-bg-warning',
  교통비: 'text-bg-primary',
  문화생활: 'text-bg-info',
  쇼핑: 'text-bg-danger',
  의료: 'text-bg-success',
  급여: 'text-bg-primary',
  용돈: 'text-bg-success',
  부수입: 'text-bg-secondary',
  기타: 'text-bg-dark',
}[category] || 'text-bg-dark')

const typeEmoji = (type) => (type === 'income' ? '📈' : '📉')
</script>

<template>
  <div class="transaction-list-root">
    <div class="d-none d-md-grid table-grid px-4 py-3 border-bottom text-secondary small fw-semibold">
      <div>날짜</div>
      <div>유형</div>
      <div>카테고리</div>
      <div>내역</div>
      <div class="text-end">금액</div>
      <div></div>
    </div>

    <div v-if="transactions.length === 0" class="px-4 py-5 text-center text-secondary">
      거래 내역이 없습니다 📭
    </div>

    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="px-4 py-3 border-bottom hover-bg-transaction"
    >
      <div class="d-none d-md-grid table-grid align-items-center">
        <div class="small text-secondary">{{ transaction.date }}</div>
        <div class="small" :title="transaction.type">{{ typeEmoji(transaction.type) }}</div>
        <div>
          <span class="me-1" aria-hidden="true">{{ categoryEmoji(transaction.category) }}</span>
          <span class="badge rounded-pill" :class="badgeClass(transaction.category)">{{ transaction.category }}</span>
        </div>
        <div class="fw-medium">{{ transaction.description }}</div>
        <div class="text-end fw-semibold" :class="transaction.type === 'income' ? 'text-primary' : 'text-danger'">
          {{ transaction.type === 'income' ? '+' : '-' }}{{ Number(transaction.amount).toLocaleString() }}원
        </div>
        <div class="text-end d-flex gap-1 justify-content-end">
          <button type="button" class="btn btn-sm btn-outline-secondary rounded-circle" title="수정"
            @click="emit('edit', transaction)">
            ✏️
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger rounded-circle" title="삭제"
            @click="emit('delete', transaction.id)">
            🗑️
          </button>
        </div>
      </div>

      <div class="d-md-none">
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div>
            <div class="small text-secondary mb-2">{{ transaction.date }} {{ typeEmoji(transaction.type) }}</div>
            <div class="mb-2">
              <span class="me-1">{{ categoryEmoji(transaction.category) }}</span>
              <span class="badge rounded-pill" :class="badgeClass(transaction.category)">{{ transaction.category }}</span>
            </div>
            <div class="fw-medium">{{ transaction.description }}</div>
          </div>
          <div class="d-flex gap-1">
            <button type="button" class="btn btn-sm btn-outline-secondary rounded-circle" @click="emit('edit', transaction)">✏️</button>
            <button type="button" class="btn btn-sm btn-outline-danger rounded-circle" @click="emit('delete', transaction.id)">🗑️</button>
          </div>
        </div>
        <div class="mt-3 fw-semibold" :class="transaction.type === 'income' ? 'text-primary' : 'text-danger'">
          {{ transaction.type === 'income' ? '+' : '-' }}{{ Number(transaction.amount).toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-bg-transaction:hover {
  background: rgba(124, 58, 237, 0.06);
}
html[data-bs-theme='dark'] .hover-bg-transaction:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
