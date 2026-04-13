<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})
const error = ref('')
const submitting = ref(false)

const handleSubmit = async () => {
  error.value = ''
  submitting.value = true
  try {
    const result = await authStore.login(form.email, form.password)
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
  <div class="auth-bg-login d-flex align-items-center justify-content-center px-3 py-5">
    <div class="w-100" style="max-width: 520px">
      <div class="card card-soft border-0">
        <div class="card-body p-4 p-md-5">
          <div class="text-center mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-4 shadow text-white mb-3"
              style="width:72px;height:72px;background:linear-gradient(135deg,#8b5cf6,#ec4899)">
              <i class="bi bi-stars fs-2"></i>
            </div>
            <h1 class="fw-bold gradient-text mb-2">가계부에 오신 것을 환영합니다</h1>
            <p class="text-secondary mb-0">로그인하여 재정 관리를 시작하세요</p>
          </div>

          <div class="mb-3">
            <label class="form-label fw-medium">이메일</label>
            <input v-model="form.email" type="email" class="form-control form-control-lg rounded-4" placeholder="your@email.com" />
          </div>

          <div class="mb-3">
            <label class="form-label fw-medium">비밀번호</label>
            <input v-model="form.password" type="password" class="form-control form-control-lg rounded-4" placeholder="••••••••" />
          </div>

          <div v-if="error" class="alert alert-danger rounded-4">{{ error }}</div>

          <button class="btn btn-lg text-white w-100 rounded-4 shadow-sm" type="button"
            style="background:linear-gradient(90deg,#7c3aed,#ec4899)" :disabled="submitting" @click="handleSubmit">
            <i class="bi bi-box-arrow-in-right me-2"></i>{{ submitting ? '처리 중…' : '로그인' }}
          </button>

          <div class="text-center mt-4">
            <span class="text-secondary">계정이 없으신가요?</span>
            <RouterLink to="/signup" class="ms-2 fw-semibold text-decoration-none">회원가입</RouterLink>
          </div>
        </div>
      </div>

      <div class="text-center text-white mt-4 small">© 2026 가계부. 스마트한 재정 관리의 시작</div>
    </div>
  </div>
</template>
