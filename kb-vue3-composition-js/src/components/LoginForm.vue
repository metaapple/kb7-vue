<template>
  <section class="auth-wrap">
    <div class="auth-card">
      <p class="eyebrow">KB LOGIN</p>
      <h2>로그인</h2>
      <p class="auth-copy">아이디와 비밀번호를 입력해 가계부 서비스를 시작하세요.</p>

      <form @submit.prevent="submitLogin" class="auth-form">
        <label>
          이메일
          <input type="email" v-model="form.email" placeholder="example@kb.co.kr" />
        </label>

        <label>
          비밀번호
          <input type="password" v-model="form.password" placeholder="비밀번호를 입력하세요" />
        </label>

        <button type="submit" class="btn btn-primary btn-full">로그인</button>
      </form>

      <p class="auth-footer">
        아직 계정이 없나요?
        <router-link to="/signup">회원가입</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
})

const submitLogin = () => {
  alert(`로그인 시도: ${form.email || '이메일 미입력'}`)
}
</script>
