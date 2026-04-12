<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const expenseCategories = ['식비', '교통비', '문화생활', '쇼핑', '의료', '기타']
const incomeCategories = ['급여', '용돈', '부수입', '기타']

const form = reactive({
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
  category: '',
  description: '',
  amount: '',
})

const categories = computed(() => (form.type === 'income' ? incomeCategories : expenseCategories))

watch(() => form.type, () => {
  form.category = ''
})

const close = () => emit('update:modelValue', false)

const handleSubmit = () => {
  if (!form.category || !form.description || !form.amount) return

  emit('submit', {
    type: form.type,
    date: form.date,
    category: form.category,
    description: form.description,
    amount: Number(form.amount),
  })

  form.category = ''
  form.description = ''
  form.amount = ''
  close()
}
</script>

<template>
  <div v-if="modelValue" class="modal d-block" tabindex="-1" style="background: rgba(15, 23, 42, 0.45)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
        <div class="modal-header border-0 bg-body-tertiary px-4 py-3">
          <h5 class="modal-title fw-bold gradient-text">거래 추가</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="d-flex gap-2 mb-4">
            <button
              type="button"
              class="btn flex-fill rounded-4"
              :class="form.type === 'expense' ? 'btn-danger' : 'btn-light border'"
              @click="form.type = 'expense'"
            >
              지출
            </button>
            <button
              type="button"
              class="btn flex-fill rounded-4"
              :class="form.type === 'income' ? 'btn-primary' : 'btn-light border'"
              @click="form.type = 'income'"
            >
              수입
            </button>
          </div>

          <div class="mb-3">
            <label class="form-label">날짜</label>
            <input v-model="form.date" type="date" class="form-control rounded-4" />
          </div>

          <div class="mb-3">
            <label class="form-label">카테고리</label>
            <select v-model="form.category" class="form-select rounded-4">
              <option value="">선택하세요</option>
              <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">내역</label>
            <input v-model="form.description" type="text" class="form-control rounded-4" placeholder="예: 점심 식사" />
          </div>

          <div class="mb-3">
            <label class="form-label">금액</label>
            <input v-model="form.amount" type="number" class="form-control rounded-4" placeholder="0" />
          </div>
        </div>
        <div class="modal-footer border-0 px-4 pb-4">
          <button type="button" class="btn btn-light rounded-4" @click="close">취소</button>
          <button type="button" class="btn btn-primary rounded-4 px-4" @click="handleSubmit">추가</button>
        </div>
      </div>
    </div>
  </div>
</template>
