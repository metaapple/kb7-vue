<script setup>
defineProps({
  transactions: { type: Array, required: true },
})

const emit = defineEmits(['delete'])

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
</script>

<template>
  <div>
    <div class="d-none d-md-grid table-grid px-4 py-3 border-bottom text-secondary small fw-semibold">
      <div>날짜</div>
      <div>카테고리</div>
      <div>내역</div>
      <div class="text-end">금액</div>
      <div></div>
    </div>

    <div v-if="transactions.length === 0" class="px-4 py-5 text-center text-secondary">
      거래 내역이 없습니다.
    </div>

    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="px-4 py-3 border-bottom hover:bg-light"
    >
      <div class="d-none d-md-grid table-grid align-items-center">
        <div class="small text-secondary">{{ transaction.date }}</div>
        <div>
          <span class="badge rounded-pill" :class="badgeClass(transaction.category)">{{ transaction.category }}</span>
        </div>
        <div class="fw-medium">{{ transaction.description }}</div>
        <div class="text-end fw-semibold" :class="transaction.type === 'income' ? 'text-primary' : 'text-danger'">
          {{ transaction.type === 'income' ? '+' : '-' }}{{ Number(transaction.amount).toLocaleString() }}원
        </div>
        <div class="text-end">
          <button class="btn btn-sm btn-outline-danger rounded-circle" @click="emit('delete', transaction.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <div class="d-md-none">
        <div class="d-flex justify-content-between align-items-start gap-3">
          <div>
            <div class="small text-secondary mb-2">{{ transaction.date }}</div>
            <div class="mb-2">
              <span class="badge rounded-pill" :class="badgeClass(transaction.category)">{{ transaction.category }}</span>
            </div>
            <div class="fw-medium">{{ transaction.description }}</div>
          </div>
          <button class="btn btn-sm btn-outline-danger rounded-circle" @click="emit('delete', transaction.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="mt-3 fw-semibold" :class="transaction.type === 'income' ? 'text-primary' : 'text-danger'">
          {{ transaction.type === 'income' ? '+' : '-' }}{{ Number(transaction.amount).toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>
