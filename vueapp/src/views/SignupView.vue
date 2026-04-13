<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const error = ref('')
const submitting = ref(false)

const handleSubmit = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  if (form.password.length < 6) {
    error.value = '비밀번호는 최소 6자 이상이어야 합니다.'
    return
  }

  submitting.value = true
  try {
    const result = await authStore.signup(form.name, form.email, form.password)
    if (!result.ok) {
      error.value = result.message
      return
    }
    router.push('/dashboard')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="auth-bg-signup d-flex align-items-center justify-content-center px-3 py-5">
    <div class="w-100" style="max-width: 560px">
      <div class="card card-soft border-0">
        <div class="card-body p-4 p-md-5">
          <div class="text-center mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-4 shadow text-white mb-3"
              style="width:72px;height:72px;background:linear-gradient(135deg,#3b82f6,#14b8a6)">
              <i class="bi bi-person-plus fs-2"></i>
            </div>
            <h1 class="fw-bold mb-2" style="background:linear-gradient(90deg,#2563eb,#0f766e);-webkit-background-clip:text;background-clip:text;color:transparent;">계정 만들기</h1>
            <p class="text-secondary mb-0">무료로 시작하여 재정을 관리하세요</p>
          </div>

          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-medium">이름</label>
              <input v-model="form.name" type="text" class="form-control form-control-lg rounded-4" placeholder="홍길동" />
            </div>
            <div class="col-12">
              <label class="form-label fw-medium">이메일</label>
              <input v-model="form.email" type="email" class="form-control form-control-lg rounded-4" placeholder="your@email.com" />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-medium">비밀번호</label>
              <input v-model="form.password" type="password" class="form-control form-control-lg rounded-4" placeholder="••••••••" />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-medium">비밀번호 확인</label>
              <input v-model="form.confirmPassword" type="password" class="form-control form-control-lg rounded-4" placeholder="••••••••" />
            </div>
          </div>

          <div v-if="error" class="alert alert-danger rounded-4 mt-3 mb-0">{{ error }}</div>

          <button class="btn btn-lg text-white w-100 rounded-4 shadow-sm mt-4" type="button"
            style="background:linear-gradient(90deg,#2563eb,#14b8a6)" :disabled="submitting" @click="handleSubmit">
            <i class="bi bi-person-check me-2"></i>{{ submitting ? '처리 중…' : '회원가입' }}
          </button>

          <div class="text-center mt-4">
            <span class="text-secondary">이미 계정이 있으신가요?</span>
            <RouterLink to="/login" class="ms-2 fw-semibold text-decoration-none">로그인</RouterLink>
          </div>
        </div>
      </div>

      <div class="text-center text-white mt-4 small">© 2026 가계부. 스마트한 재정 관리의 시작</div>
    </div>
  </div>
</template>
