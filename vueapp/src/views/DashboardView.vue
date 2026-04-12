<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transactions'
import MetricCard from '@/components/MetricCard.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransactionModal from '@/components/AddTransactionModal.vue'
import MonthlyChart from '@/components/MonthlyChart.vue'

const router = useRouter()
const authStore = useAuthStore()
const transactionStore = useTransactionStore()
transactionStore.init()

const showModal = ref(false)

const formatCurrency = (value) => `${Number(value).toLocaleString()}원`

const balanceText = computed(() => transactionStore.balance >= 0 ? '흑자' : '적자')
const balanceTextClass = computed(() => transactionStore.balance >= 0 ? 'text-success' : 'text-danger')

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-vh-100">
    <header class="dashboard-header text-white shadow">
      <div class="container py-4">
        <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded-4 d-inline-flex align-items-center justify-content-center"
              style="width:60px;height:60px;background:rgba(255,255,255,0.18)">
              <i class="bi bi-wallet2 fs-3"></i>
            </div>
            <div>
              <h1 class="h3 mb-1 fw-bold">가계부</h1>
              <div class="opacity-75">스마트한 재정 관리</div>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-2 gap-sm-3 align-items-stretch align-items-sm-center">
            <div class="px-3 py-2 rounded-4" style="background:rgba(255,255,255,0.18)">
              <i class="bi bi-person-circle me-2"></i>{{ authStore.user?.name }}
            </div>
            <button class="btn btn-outline-light rounded-4" @click="logout">
              <i class="bi bi-box-arrow-right me-2"></i>로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container py-4 py-lg-5">
      <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
        <div>
          <h2 class="h4 fw-bold mb-1">대시보드</h2>
          <p class="text-secondary mb-0">재정 현황을 한눈에 확인하세요.</p>
        </div>
        <button class="btn btn-primary rounded-4 px-4 py-3 shadow-sm" @click="showModal = true">
          <i class="bi bi-plus-lg me-2"></i>거래 추가
        </button>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0">
            <div class="card-body p-4 d-flex justify-content-between gap-3">
              <MetricCard label="총 수입" :value="formatCurrency(transactionStore.totalIncome)" />
              <div class="metric-icon bg-primary"><i class="bi bi-graph-up-arrow fs-4"></i></div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0">
            <div class="card-body p-4 d-flex justify-content-between gap-3">
              <MetricCard label="총 지출" :value="formatCurrency(transactionStore.totalExpense)" />
              <div class="metric-icon bg-danger"><i class="bi bi-graph-down-arrow fs-4"></i></div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0">
            <div class="card-body p-4 d-flex justify-content-between gap-3">
              <MetricCard
                label="잔액"
                :value="formatCurrency(transactionStore.balance)"
                :change="balanceText"
                :changeType="transactionStore.balance >= 0 ? 'positive' : 'negative'"
              />
              <div class="metric-icon" :class="transactionStore.balance >= 0 ? 'bg-success' : 'bg-dark'">
                <i class="bi bi-cash-stack fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-12 col-xl-7">
          <div class="card card-soft border-0 h-100">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="h5 fw-bold mb-1">월별 수입/지출</h3>
                  <div class="text-secondary small">최근 4개월 기준 요약</div>
                </div>
                <span class="badge text-bg-light border">{{ balanceText }}</span>
              </div>
              <MonthlyChart :data="transactionStore.chartData" />
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-5">
          <div class="card card-soft border-0 h-100">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="h5 fw-bold mb-1">요약 정보</h3>
                  <div class="text-secondary small">현재 상태 요약</div>
                </div>
              </div>

              <div class="rounded-4 p-4 mb-3 bg-light border">
                <div class="small text-secondary mb-1">현재 사용자</div>
                <div class="fw-semibold">{{ authStore.user?.name }} ({{ authStore.user?.email }})</div>
              </div>

              <div class="rounded-4 p-4 mb-3 bg-light border">
                <div class="small text-secondary mb-1">총 거래 수</div>
                <div class="fw-semibold fs-4">{{ transactionStore.sortedTransactions.length }}건</div>
              </div>

              <div class="rounded-4 p-4 bg-light border">
                <div class="small text-secondary mb-1">수지 상태</div>
                <div class="fw-semibold fs-4" :class="balanceTextClass">{{ balanceText }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card card-soft border-0 mt-4">
        <div class="card-body p-0">
          <div class="p-4 border-bottom">
            <h3 class="h5 fw-bold mb-1">거래 내역</h3>
            <div class="text-secondary small">최신 날짜순 정렬</div>
          </div>
          <TransactionList
            :transactions="transactionStore.sortedTransactions"
            @delete="transactionStore.deleteTransaction"
          />
        </div>
      </div>
    </main>

    <AddTransactionModal
      v-model="showModal"
      @submit="transactionStore.addTransaction"
    />
  </div>
</template>
