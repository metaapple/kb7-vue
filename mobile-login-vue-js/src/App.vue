<template>
  <div class="container">
    <div class="row min-vh-100 align-items-center justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <div class="text-center mb-4">
              <h1 class="h2 mb-2">로그인</h1>
              <p class="text-muted">계정에 로그인하세요</p>
            </div>

            <form @submit="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">이메일</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <div class="mb-4">
                <label for="password" class="form-label">비밀번호</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">로그인</button>
              </div>
            </form>

            <div class="mt-4 text-center">
              <a href="#" class="text-decoration-none text-muted small">비밀번호를 잊으셨나요?</a>
            </div>

            <hr class="my-4" />

            <div class="text-center">
              <p class="text-muted small mb-0">
                계정이 없으신가요?
                <a href="#" class="text-decoration-none ms-1">회원가입</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = (event) => {
  event.preventDefault()
  console.log('로그인 시도:', { email: email.value, password: password.value })
  alert(`로그인 시도\n이메일: ${email.value}`)
}
</script>
