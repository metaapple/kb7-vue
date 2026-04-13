<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transactions'
import { useGameStore } from '@/stores/game'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const gameStore = useGameStore()

const avatarSrc = computed(() => {
  const u = authStore.user
  if (u?.avatarUrl) return u.avatarUrl
  return '/default-avatar.svg'
})

const close = () => emit('update:modelValue', false)
</script>

<template>
  <div v-if="modelValue" class="modal d-block" tabindex="-1" style="background: rgba(15, 23, 42, 0.5)">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
        <div class="modal-header border-0 bg-body-tertiary">
          <h5 class="modal-title fw-bold">👤 내 프로필</h5>
          <button type="button" class="btn-close" aria-label="닫기" @click="close"></button>
        </div>
        <div class="modal-body p-4 p-md-5 text-center">
          <div class="position-relative d-inline-block mb-4">
            <img
              :src="avatarSrc"
              alt=""
              width="120"
              height="120"
              class="rounded-circle border border-3 border-primary shadow object-fit-cover bg-body-secondary"
              style="object-fit: cover"
            />
            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-warning text-dark fs-6 px-2 fw-bold">
              Lv.{{ gameStore.level }}
            </span>
          </div>
          <h2 class="h4 fw-bold mb-1">{{ authStore.user?.name }}</h2>
          <p class="text-secondary mb-4">{{ authStore.user?.email }}</p>
          <div class="row g-3 text-start">
            <div class="col-12">
              <div class="rounded-4 p-3 bg-body-tertiary border border-primary border-opacity-25">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="small text-secondary">🎮 게임 레벨</span>
                  <span class="badge bg-primary fs-6">Lv.{{ gameStore.level }}</span>
                </div>
                <div class="small text-secondary mb-1">경험치 {{ gameStore.xp }} XP · 100XP마다 레벨업</div>
                <div class="progress rounded-pill mb-3" style="height: 8px">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :style="{ width: `${gameStore.xpInCurrentLevel}%` }"
                  />
                </div>
                <RouterLink
                  to="/game"
                  class="btn btn-outline-primary btn-sm w-100 rounded-pill"
                  @click="close"
                >
                  돈 관리 퀴즈 하러 가기 🚀
                </RouterLink>
              </div>
            </div>
            <div class="col-12">
              <div class="rounded-4 p-3 bg-body-tertiary border">
                <div class="small text-secondary mb-1">📊 등록 거래</div>
                <div class="fw-semibold fs-5">{{ transactionStore.sortedTransactions.length }}건</div>
              </div>
            </div>
            <div class="col-12">
              <div class="rounded-4 p-3 bg-body-tertiary border">
                <div class="small text-secondary mb-1">💡 안내</div>
                <div class="small mb-0">프로필 이름·이메일은 <strong>db.json</strong>과 동기화됩니다. 게임 XP는 이 기기의 브라우저에만 저장됩니다.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-center pb-4">
          <button type="button" class="btn btn-primary rounded-4 px-5" @click="close">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>
