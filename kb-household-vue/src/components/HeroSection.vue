<template>
  <section class="hero-section">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">KB MONEY LIFE</p>
        <h1>매일의 지출을<br />더 단정하게 관리하세요</h1>
        <p class="hero-copy">
          카드, 계좌, 생활비 항목을 한 화면에서 확인할 수 있는
          국민은행 스타일 가계부 예제입니다.
        </p>

        <div class="hero-actions">
          <router-link to="/login" class="btn btn-primary">로그인</router-link>
          <router-link to="/signup" class="btn btn-secondary">회원가입</router-link>
        </div>

        <ul class="hero-points">
          <li>월별 소비 추이 확인</li>
          <li>카테고리별 자동 분류</li>
          <li>예산 대비 초과 지출 알림</li>
        </ul>
      </div>

      <div class="phone-card">
        <div class="phone-header">
          <span>이번 달 사용액</span>
          <strong>₩1,286,000</strong>
        </div>

        <div class="spending-list">
          <div class="spending-item" v-for="item in items" :key="item.title">
            <div>
              <p>{{ item.title }}</p>
              <small>{{ item.desc }}</small>
            </div>
            <strong>{{ item.amount }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { title: '식비', desc: '이번 주 6건', amount: '₩214,000' },
  { title: '교통', desc: '버스·지하철', amount: '₩58,400' },
  { title: '구독', desc: '정기결제', amount: '₩41,900' },
  { title: '쇼핑', desc: '온라인 결제', amount: '₩167,200' },
]
</script>
