<template>
  <section class="section container">
    <div class="section-head">
      <p class="eyebrow">핵심 기능</p>
      <h2>가계부 화면에 필요한 요소를 컴포넌트로 분리했습니다</h2>
    </div>

    <div class="feature-grid">
      <article class="feature-card" v-for="feature in features" :key="feature.title">
        <span class="feature-icon">{{ feature.icon }}</span>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: '💳', title: '자산 통합 보기', desc: '은행 계좌, 카드, 현금 흐름을 요약 카드로 배치했습니다.' },
  { icon: '📊', title: '카테고리 분석', desc: '식비, 교통, 쇼핑 등 소비 패턴을 리스트와 통계 블록으로 구성했습니다.' },
  { icon: '🎯', title: '예산 목표 관리', desc: '월 예산과 실제 지출 차이를 직관적으로 보여주는 구조입니다.' },
  { icon: '🔔', title: '알림 UX', desc: '예산 초과, 정기결제 예정 등의 안내 영역을 추가했습니다.' },
]
</script>
