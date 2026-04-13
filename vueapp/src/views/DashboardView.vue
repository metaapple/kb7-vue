<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transactions'
import { useThemeStore } from '@/stores/theme'
import MetricCard from '@/components/MetricCard.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransactionModal from '@/components/AddTransactionModal.vue'
import GoogleChartsPanel from '@/components/GoogleChartsPanel.vue'
import ProfileModal from '@/components/ProfileModal.vue'
import AccountListCard from '@/components/AccountListCard.vue'
import { useAccountStore } from '@/stores/accounts'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const accountStore = useAccountStore()
const themeStore = useThemeStore()
const gameStore = useGameStore()

const showModal = ref(false)
const showProfile = ref(false)
const editingTransaction = ref(null)
const bootLoading = ref(true)
const actionError = ref('')

const formatCurrency = (value) => `${Number(value).toLocaleString()}원`

const balanceText = computed(() => transactionStore.balance >= 0 ? '흑자' : '적자')
const balanceTextClass = computed(() => transactionStore.balance >= 0 ? 'text-success' : 'text-danger')

const loadDashboard = async () => {
  bootLoading.value = true
  actionError.value = ''
  await authStore.fetchProfile()
  const [tx, acc] = await Promise.all([
    transactionStore.fetchTransactions(),
    accountStore.fetchAccounts(),
  ])
  if (!tx.ok) actionError.value = tx.message || transactionStore.error
  if (!acc.ok && acc.message) actionError.value = actionError.value || acc.message
  bootLoading.value = false
}

onMounted(() => {
  loadDashboard()
})

const logout = () => {
  authStore.logout()
  transactionStore.transactions = []
  transactionStore.listPage = 1
  accountStore.clear()
  router.push('/login')
}

const openAddModal = () => {
  editingTransaction.value = null
  showModal.value = true
}

const openEditModal = (row) => {
  editingTransaction.value = row
  showModal.value = true
}

const openProfile = async () => {
  await authStore.fetchProfile()
  showProfile.value = true
}

const onAddTransaction = async (payload) => {
  actionError.value = ''
  const r = await transactionStore.addTransaction(payload)
  if (!r.ok) actionError.value = r.message || ''
}

const onUpdateTransaction = async ({ id, ...payload }) => {
  actionError.value = ''
  const r = await transactionStore.updateTransaction(id, payload)
  if (!r.ok) actionError.value = r.message || ''
}

const onDeleteTransaction = async (id) => {
  actionError.value = ''
  const r = await transactionStore.deleteTransaction(id)
  if (!r.ok) actionError.value = r.message || ''
}

const txPaginationPages = computed(() => {
  const total = transactionStore.listTotalPages
  const cur = transactionStore.listPage
  const windowSize = 5
  let start = Math.max(1, cur - Math.floor(windowSize / 2))
  let end = Math.min(total, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)
  const list = []
  for (let i = start; i <= end; i += 1) list.push(i)
  return list
})
</script>

<template>
  <div class="min-vh-100 pb-5 dashboard-page">
    <header class="dashboard-header text-white shadow-lg">
      <div class="container py-4 py-lg-5">
        <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
          <div class="d-flex align-items-center gap-3 gap-lg-4">
            <div class="dashboard-brand-icon d-inline-flex align-items-center justify-content-center flex-shrink-0">
              <span class="dashboard-brand-emoji" aria-hidden="true">💰</span>
            </div>
            <div>
              <h1 class="h2 mb-1 fw-bold text-white letter-tight">가계부</h1>
              <div class="dashboard-header-tagline opacity-90 fs-6">스마트한 재정 관리 ✨</div>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-2 align-items-center justify-content-lg-end">
            <button
              type="button"
              class="btn rounded-4 d-flex align-items-center gap-2"
              :class="themeStore.dark ? 'btn-light text-dark' : 'btn-outline-light'"
              :title="themeStore.dark ? '라이트 모드' : '다크 모드'"
              @click="themeStore.toggle()"
            >
              <span class="fs-5">{{ themeStore.dark ? '☀️' : '🌙' }}</span>
              <span class="small fw-semibold">{{ themeStore.dark ? '라이트' : '다크' }}</span>
            </button>

            <RouterLink
              to="/game"
              class="btn btn-outline-light rounded-4 d-flex align-items-center gap-2 text-white text-decoration-none"
            >
              <span class="fs-5">🎮</span>
              <span class="small fw-semibold">퀴즈</span>
              <span class="badge bg-warning text-dark rounded-pill">Lv.{{ gameStore.level }}</span>
            </RouterLink>

            <button
              type="button"
              class="btn btn-light text-dark rounded-4 px-3 py-2 d-flex align-items-center gap-3 shadow-sm"
              @click="openProfile"
            >
              <img
                :src="authStore.user?.avatarUrl || '/default-avatar.svg'"
                alt=""
                width="56"
                height="56"
                class="rounded-circle object-fit-cover dashboard-avatar"
              />
              <span class="fw-semibold text-truncate" style="max-width: 10rem">{{ authStore.user?.name }}</span>
              <span v-if="authStore.profileLoading" class="small text-secondary">…</span>
              <i class="bi bi-chevron-right small text-secondary"></i>
            </button>

            <button type="button" class="btn btn-outline-light rounded-4" @click="logout">
              <i class="bi bi-box-arrow-right me-1"></i>로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container py-4 py-lg-5 dashboard-main">
      <div v-if="bootLoading" class="alert alert-light border rounded-4 mb-0 d-flex align-items-center gap-2">
        <span>⏳</span> 데이터를 불러오는 중…
      </div>

      <div v-if="actionError" class="alert alert-warning rounded-4 mt-4 d-flex align-items-center gap-2">
        <span>⚠️</span>{{ actionError }}
      </div>
      <div v-if="authStore.profileError && !bootLoading" class="alert alert-secondary rounded-4 mt-2">
        {{ authStore.profileError }}
      </div>

      <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4 mt-2 mt-lg-3">
        <div>
          <div class="dashboard-section-eyebrow">Money overview</div>
          <h2 class="h3 dashboard-section-title mb-2">📊 대시보드</h2>
          <p class="text-secondary mb-0 fs-6">재정 현황을 한눈에 확인하세요 🎯</p>
        </div>
        <button
          type="button"
          class="btn btn-lg rounded-4 px-4 py-3 shadow-sm fw-semibold dashboard-cta-add"
          :disabled="bootLoading"
          @click="openAddModal"
        >
          <span class="me-2">➕</span>거래 추가
        </button>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0 dashboard-metric-card">
            <div class="card-body p-4 p-lg-4 d-flex justify-content-between gap-3 align-items-center">
              <MetricCard label="총 수입 💵" :value="formatCurrency(transactionStore.totalIncome)" />
              <div class="metric-icon bg-primary flex-shrink-0"><i class="bi bi-graph-up-arrow fs-3"></i></div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0 dashboard-metric-card">
            <div class="card-body p-4 p-lg-4 d-flex justify-content-between gap-3 align-items-center">
              <MetricCard label="총 지출 🛒" :value="formatCurrency(transactionStore.totalExpense)" />
              <div class="metric-icon bg-danger flex-shrink-0"><i class="bi bi-graph-down-arrow fs-3"></i></div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card card-soft h-100 border-0 dashboard-metric-card">
            <div class="card-body p-4 p-lg-4 d-flex justify-content-between gap-3 align-items-center">
              <MetricCard
                label="잔액 💎"
                :value="formatCurrency(transactionStore.balance)"
                :change="balanceText"
                :changeType="transactionStore.balance >= 0 ? 'positive' : 'negative'"
              />
              <div class="metric-icon flex-shrink-0" :class="transactionStore.balance >= 0 ? 'bg-success' : 'bg-dark'">
                <i class="bi bi-cash-stack fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card card-soft border-0 mb-4 dashboard-chart-card">
        <div class="card-body p-4 p-lg-5">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
              <h3 class="h5 fw-bold mb-1 letter-tight">📈 Google Charts 인사이트</h3>
              <div class="text-secondary small">월별 · 카테고리 · 누적 · 주차별 등 다양한 시각화</div>
            </div>
            <span class="badge rounded-pill text-bg-primary">{{ balanceText }}</span>
          </div>
          <GoogleChartsPanel :transactions="transactionStore.transactions" :dark="themeStore.dark" />
        </div>
      </div>

      <AccountListCard />

      <div class="row g-4 mb-4">
        <div class="col-12 col-xl-7">
          <div class="card card-soft border-0 h-100">
            <div class="card-body p-4">
              <h3 class="h5 fw-bold mb-3 letter-tight">📝 요약 카드</h3>
              <div class="p-4 mb-3 dash-inset-panel">
                <div class="small text-secondary mb-1">현재 사용자 (이름 클릭으로 프로필)</div>
                <button type="button" class="btn btn-link text-start text-decoration-none fw-semibold p-0 fs-5" @click="openProfile">
                  {{ authStore.user?.name }} · {{ authStore.user?.email }}
                </button>
              </div>
              <div class="p-4 mb-3 dash-inset-panel">
                <div class="small text-secondary mb-1">총 거래 수</div>
                <div class="fw-semibold fs-4">{{ transactionStore.sortedTransactions.length }}건 🧾</div>
              </div>
              <div class="p-4 dash-inset-panel">
                <div class="small text-secondary mb-1">수지 상태</div>
                <div class="fw-semibold fs-4" :class="balanceTextClass">{{ balanceText }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-5">
          <div class="card card-soft border-0 h-100 dashboard-spotlight-card">
            <div class="card-body p-4 p-lg-5 d-flex flex-column justify-content-center text-center">
              <div class="dashboard-hero-ring mb-4">
                <span aria-hidden="true">🎉</span>
              </div>
              <h4 class="fw-bold mb-2 fs-4 letter-tight">오늘도 알뜰 소비!</h4>
              <p class="text-secondary mb-0 fs-6 lh-lg">
                거래를 추가·수정하면 차트가 자동으로 갱신됩니다. 다크 모드는 우측 상단 🌙 버튼으로 전환하세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card card-soft border-0 mt-2 dashboard-tx-card">
        <div class="card-body p-0">
          <div class="p-4 p-lg-4 dash-hairline-b d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div>
              <h3 class="h5 fw-bold mb-1 letter-tight">🧾 거래 내역</h3>
              <div class="text-secondary small">최신순 · 수정/삭제 가능</div>
            </div>
            <span class="badge text-bg-secondary rounded-pill">{{ transactionStore.listRangeText }}</span>
          </div>
          <div v-if="transactionStore.loading && !bootLoading" class="px-4 py-3 text-secondary small">🔄 목록 갱신 중…</div>
          <TransactionList
            :transactions="transactionStore.pagedSortedTransactions"
            @delete="onDeleteTransaction"
            @edit="openEditModal"
          />
          <div
            v-if="!transactionStore.loading && transactionStore.sortedTransactions.length > 0"
            class="px-4 py-3 dash-hairline-t bg-body-tertiary d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
          >
            <div class="small text-secondary">
              페이지 {{ transactionStore.listPage }} / {{ transactionStore.listTotalPages }}
              · 총 {{ transactionStore.sortedTransactions.length }}건
            </div>
            <nav v-if="transactionStore.listTotalPages > 1" aria-label="거래 내역 페이지">
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item" :class="{ disabled: transactionStore.listPage <= 1 }">
                  <button
                    type="button"
                    class="page-link"
                    :disabled="transactionStore.listPage <= 1"
                    @click="transactionStore.goToListPage(transactionStore.listPage - 1)"
                  >
                    이전
                  </button>
                </li>
                <li
                  v-for="n in txPaginationPages"
                  :key="n"
                  class="page-item"
                  :class="{ active: n === transactionStore.listPage }"
                >
                  <button type="button" class="page-link" @click="transactionStore.goToListPage(n)">{{ n }}</button>
                </li>
                <li class="page-item" :class="{ disabled: transactionStore.listPage >= transactionStore.listTotalPages }">
                  <button
                    type="button"
                    class="page-link"
                    :disabled="transactionStore.listPage >= transactionStore.listTotalPages"
                    @click="transactionStore.goToListPage(transactionStore.listPage + 1)"
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <AddTransactionModal
      v-model="showModal"
      :editing="editingTransaction"
      @submit="onAddTransaction"
      @update="onUpdateTransaction"
    />

    <ProfileModal v-model="showProfile" />
  </div>
</template>
