<template>
  <section class="section container">
    <div class="section-head row-head">
      <div>
        <p class="eyebrow">MY LEDGER</p>
        <h2>이번 달 가계부 현황</h2>
      </div>
      <button class="btn btn-secondary">내역 추가</button>
    </div>

    <div class="summary-grid">
      <article class="summary-card" v-for="card in summaryCards" :key="card.title">
        <span>{{ card.title }}</span>
        <strong>{{ card.value }}</strong>
        <small>{{ card.desc }}</small>
      </article>
    </div>

    <div class="ledger-layout">
      <div class="ledger-panel">
        <h3>최근 거래 내역</h3>
        <div class="ledger-item" v-for="item in transactions" :key="item.id">
          <div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.date }} · {{ item.category }}</p>
          </div>
          <b :class="item.type === 'income' ? 'income' : 'expense'">
            {{ item.type === 'income' ? '+' : '-' }}{{ item.amount }}
          </b>
        </div>
      </div>

      <div class="ledger-panel side-panel">
        <h3>카테고리 예산</h3>
        <div class="budget-row" v-for="budget in budgets" :key="budget.name">
          <div class="budget-top">
            <span>{{ budget.name }}</span>
            <span>{{ budget.used }} / {{ budget.limit }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: budget.percent + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const summaryCards = [
  { title: '총 자산', value: '₩12,480,000', desc: '지난달 대비 +3.2%' },
  { title: '총 지출', value: '₩1,286,000', desc: '예산의 64% 사용' },
  { title: '총 수입', value: '₩2,750,000', desc: '급여 및 기타 수입' },
  { title: '남은 예산', value: '₩714,000', desc: '무난한 소비 흐름' },
]

const transactions = [
  { id: 1, title: 'KB국민카드 결제', date: '2026-04-03', category: '생활', amount: '82,000원', type: 'expense' },
  { id: 2, title: '급여 입금', date: '2026-04-01', category: '수입', amount: '2,500,000원', type: 'income' },
  { id: 3, title: '스타벅스', date: '2026-04-01', category: '식비', amount: '6,100원', type: 'expense' },
  { id: 4, title: '지하철 충전', date: '2026-03-31', category: '교통', amount: '50,000원', type: 'expense' },
]

const budgets = [
  { name: '식비', used: '214,000원', limit: '300,000원', percent: 71 },
  { name: '교통', used: '58,400원', limit: '100,000원', percent: 58 },
  { name: '쇼핑', used: '167,200원', limit: '250,000원', percent: 66 },
  { name: '구독', used: '41,900원', limit: '60,000원', percent: 69 },
]
</script>
