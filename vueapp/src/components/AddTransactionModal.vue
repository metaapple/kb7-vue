<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  editing: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue', 'submit', 'update'])

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

const isEdit = computed(() => !!props.editing)

const resetEmpty = () => {
  form.type = 'expense'
  form.date = new Date().toISOString().split('T')[0]
  form.category = ''
  form.description = ''
  form.amount = ''
}

const applyEditing = () => {
  if (!props.editing) {
    resetEmpty()
    return
  }
  form.type = props.editing.type || 'expense'
  form.date = props.editing.date || form.date
  form.category = props.editing.category || ''
  form.description = props.editing.description || ''
  form.amount = props.editing.amount != null ? String(props.editing.amount) : ''
}

watch(
  () => [props.modelValue, props.editing],
  () => {
    if (props.modelValue) applyEditing()
  },
  { deep: true },
)

watch(() => form.type, () => {
  if (!props.editing) form.category = ''
})

const close = () => emit('update:modelValue', false)

const handleSubmit = () => {
  if (!form.category || !form.description || !form.amount) return

  const payload = {
    type: form.type,
    date: form.date,
    category: form.category,
    description: form.description,
    amount: Number(form.amount),
  }

  if (isEdit.value) {
    emit('update', { id: props.editing.id, ...payload })
  } else {
    emit('submit', payload)
  }

  if (!isEdit.value) {
    form.category = ''
    form.description = ''
    form.amount = ''
  }
  close()
}
</script>

<template>
  <div v-if="modelValue" class="modal d-block" tabindex="-1" style="background: rgba(15, 23, 42, 0.55)">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl px-2">
      <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
        <div class="modal-header border-0 bg-body-tertiary px-4 px-md-5 py-4">
          <div>
            <h4 class="modal-title fw-bold gradient-text mb-1">
              {{ isEdit ? '✏️ 거래 수정' : '✨ 거래 추가' }}
            </h4>
            <div class="text-secondary small">큰 입력 화면에서 편하게 입력하세요 📝</div>
          </div>
          <button type="button" class="btn-close btn-lg" @click="close"></button>
        </div>
        <div class="modal-body p-4 p-md-5">
          <div class="row g-4">
            <div class="col-12 col-lg-5">
              <div class="rounded-4 p-4 h-100 border bg-body-tertiary d-flex flex-column justify-content-center text-center">
                <div class="display-3 mb-3">{{ form.type === 'income' ? '💵' : '💸' }}</div>
                <p class="mb-2 fw-semibold fs-5">{{ form.type === 'income' ? '수입' : '지출' }} 기록</p>
                <p class="text-secondary small mb-0">
                  날짜·카테고리·내역·금액을 정확히 입력하면 대시보드와 Google 차트에 바로 반영됩니다.
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-7">
              <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
                <button
                  type="button"
                  class="btn btn-lg flex-fill rounded-4 py-3"
                  :class="form.type === 'expense' ? 'btn-danger' : 'btn-outline-secondary'"
                  @click="form.type = 'expense'"
                >
                  💸 지출
                </button>
                <button
                  type="button"
                  class="btn btn-lg flex-fill rounded-4 py-3"
                  :class="form.type === 'income' ? 'btn-primary' : 'btn-outline-secondary'"
                  @click="form.type = 'income'"
                >
                  💵 수입
                </button>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold fs-6">📅 날짜</label>
                <input v-model="form.date" type="date" class="form-control form-control-lg rounded-4" />
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold fs-6">🏷️ 카테고리</label>
                <select v-model="form.category" class="form-select form-select-lg rounded-4">
                  <option value="">선택하세요</option>
                  <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold fs-6">✏️ 내역 설명</label>
                <input
                  v-model="form.description"
                  type="text"
                  class="form-control form-control-lg rounded-4"
                  placeholder="예: ☕ 스타벅스 아메리카노"
                />
              </div>

              <div class="mb-2">
                <label class="form-label fw-semibold fs-6">💰 금액 (원)</label>
                <input v-model="form.amount" type="number" min="0" class="form-control form-control-lg rounded-4" placeholder="0" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 px-4 px-md-5 py-4 bg-body-tertiary">
          <button type="button" class="btn btn-light btn-lg rounded-4 px-4" @click="close">취소</button>
          <button type="button" class="btn btn-primary btn-lg rounded-4 px-5" @click="handleSubmit">
            {{ isEdit ? '💾 저장' : '➕ 추가' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
