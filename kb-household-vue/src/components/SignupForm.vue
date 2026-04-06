<template>
  <section class="auth-wrap">
    <div class="auth-card auth-card-wide">
      <p class="eyebrow">KB SIGN UP</p>
      <h2>회원가입</h2>
      <p class="auth-copy">가계부 서비스를 위한 기본 정보를 입력하세요.</p>

      <form @submit.prevent="submitSignup" class="auth-form two-columns">
        <label>
          이름
          <input type="text" v-model="form.name" placeholder="홍길동" />
        </label>

        <label>
          이메일
          <input type="email" v-model="form.email" placeholder="example@kb.co.kr" />
        </label>

        <label>
          비밀번호
          <input type="password" v-model="form.password" placeholder="8자 이상 입력" />
        </label>

        <label>
          비밀번호 확인
          <input type="password" v-model="form.confirmPassword" placeholder="비밀번호를 다시 입력" />
        </label>

        <label class="full-span">
          휴대폰 번호
          <input type="text" v-model="form.phone" placeholder="010-0000-0000" />
        </label>

        <button type="submit" class="btn btn-primary btn-full full-span">회원가입</button>
      </form>

      <p class="auth-footer">
        이미 계정이 있나요?
        <router-link to="/login">로그인</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const submitSignup = () => {
  alert(`${form.name || '사용자'}님 회원가입 정보를 확인했습니다.`)
}
</script>
