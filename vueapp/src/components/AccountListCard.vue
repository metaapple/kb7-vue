<script setup>
import { computed } from 'vue'
import { useAccountStore } from '@/stores/accounts'

const accountStore = useAccountStore()

const formatCurrency = (n) => `${Number(n).toLocaleString()}원`

const pages = computed(() => {
  const total = accountStore.totalPages
  const cur = accountStore.page
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
  <div class="card card-soft border-0 mb-4 account-list-root">
    <div class="card-body p-0">
      <div class="p-4 dash-hairline-b d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h3 class="h5 fw-bold mb-1">🏦 계좌 목록</h3>
          <div class="text-secondary small">연결된 은행 계좌 · 아래에서 페이지 이동</div>
        </div>
        <span class="badge text-bg-info rounded-pill">{{ accountStore.rangeText }}</span>
      </div>

      <div v-if="accountStore.loading" class="px-4 py-4 text-secondary">⏳ 불러오는 중…</div>
      <div v-else-if="accountStore.error" class="px-4 py-3 alert alert-warning rounded-0 mb-0">{{ accountStore.error }}</div>
      <div v-else-if="accountStore.accounts.length === 0" class="px-4 py-5 text-center text-secondary">
        등록된 계좌가 없습니다 🏧
      </div>

      <template v-else>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr class="small text-secondary">
                <th class="ps-4">은행</th>
                <th>별칭</th>
                <th>계좌번호</th>
                <th class="text-end pe-4">잔액</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="acc in accountStore.pagedAccounts" :key="acc.id">
                <td class="ps-4 fw-semibold">🏛️ {{ acc.bankName }}</td>
                <td>{{ acc.alias }}</td>
                <td class="font-monospace small text-secondary">{{ acc.numberMasked }}</td>
                <td class="text-end pe-4 fw-semibold" :class="Number(acc.balance) < 0 ? 'text-danger' : ''">
                  {{ formatCurrency(acc.balance) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-4 py-3 dash-hairline-t bg-body-tertiary d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div class="small text-secondary">
            페이지 {{ accountStore.page }} / {{ accountStore.totalPages }}
          </div>
          <nav v-if="accountStore.totalPages > 1" aria-label="계좌 목록 페이지">
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: accountStore.page <= 1 }">
                <button type="button" class="page-link" :disabled="accountStore.page <= 1" @click="accountStore.goToPage(accountStore.page - 1)">
                  이전
                </button>
              </li>
              <li
                v-for="n in pages"
                :key="n"
                class="page-item"
                :class="{ active: n === accountStore.page }"
              >
                <button type="button" class="page-link" @click="accountStore.goToPage(n)">{{ n }}</button>
              </li>
              <li class="page-item" :class="{ disabled: accountStore.page >= accountStore.totalPages }">
                <button
                  type="button"
                  class="page-link"
                  :disabled="accountStore.page >= accountStore.totalPages"
                  @click="accountStore.goToPage(accountStore.page + 1)"
                >
                  다음
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </template>
    </div>
  </div>
</template>
