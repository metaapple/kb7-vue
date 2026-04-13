<script setup>
import { computed, onMounted, ref, shallowRef } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useTransactionStore } from '@/stores/transactions'
import { useGameResultsStore } from '@/stores/gameResults'
import { buildFinancialGameInsights } from '@/utils/financialGameInsights'

const gameStore = useGameStore()
const transactionStore = useTransactionStore()
const gameResultsStore = useGameResultsStore()
const { xp } = storeToRefs(gameStore)

const improvementPlan = computed(() =>
  buildFinancialGameInsights({
    transactions: transactionStore.transactions,
    gameHistory: gameResultsStore.history,
    tierStats: gameStore.tierStats,
    xp: xp.value,
    level: gameStore.level,
  }),
)

onMounted(() => {
  transactionStore.fetchTransactions()
  gameResultsStore.fetchMyResults()
})

/** 인덱스 1=입문, 2=중급, 3=심화 (배열로 두어 QUESTIONS[2] 접근 이슈 방지) */
const QUESTION_TIERS = [
  [],
  [
    {
      q: '[Lv.1 입문] 월급이 통장에 들어왔어요. 가계부에는 어떻게 적을까요? 💰',
      choices: ['지출', '수입', '이월금', '대출'],
      correct: 1,
      tip: '들어온 돈은 수입으로 적어야 한 달 수입 합계가 맞아요.',
    },
    {
      q: '[Lv.1 입문] 편의점에서 음료를 샀어요. 이건 무엇일까요? 🥤',
      choices: ['수입', '저축', '지출', '투자 원금'],
      correct: 2,
      tip: '작은 소비도 지출로 쌓이면 패턴을 보기 쉬워요.',
    },
    {
      q: '[Lv.1 입문] “먼저 저축하고 남은 돈으로 쓴다”에 가까운 습관은? 🐷',
      choices: ['월말에 남은 것만 저축', '월급일에 목표 금액부터 빼두기', '카드만 쓰기', '통장 비우기'],
      correct: 1,
      tip: '월급 받자마자 자동이체로 저축하면 계획이 잘 지켜져요.',
    },
    {
      q: '[Lv.1 입문] 비상금을 모아두면 좋은 이유로 맞는 것은? 🛟',
      choices: ['세금 환급', '갑작스런 지출·실직에 대비', '금리가 항상 높음', '카드 포인트'],
      correct: 1,
      tip: '3~6개월 생활비 정도를 현금성으로 두면 마음이 편해요.',
    },
    {
      q: '[Lv.1 입문] 이 앱에서 “잔액”에 가장 가까운 뜻은? 📊',
      choices: ['은행 통장 잔고', '총 수입 − 총 지출', '다음 달 예산', '세금'],
      correct: 1,
      tip: '거래를 수입·지출로 나눠 합친 뒤 차이를 보면 흑자·적자를 알 수 있어요.',
    },
    {
      q: '[Lv.1 입문] 부모님이 용돈을 보내주셨어요. 기록한다면? 🧧',
      choices: ['지출', '수입', '할부', '이자만'],
      correct: 1,
      tip: '가계에 들어온 돈은 성격에 따라 수입으로 적는 경우가 많아요.',
    },
    {
      q: '[Lv.1 입문] 매달 비슷하게 나가는 돈을 뭐라고 부르기 쉬울까요? 🏠',
      choices: ['보너스', '고정지출', '일시지출', '환급'],
      correct: 1,
      tip: '월세·공과금·보험료처럼 매달 예상되는 지출이에요.',
    },
  ],
  [
    {
      q: '[Lv.2 중급] 12개월 무이자 할부로 산 물건, 월 납입분은 어떻게 기록할까요? 💳',
      choices: ['구매 월에만 전액 지출', '매달 실제 납입액만 지출', '수입에서 빼기', '기록 안 함'],
      correct: 1,
      tip: '돈이 나가는 달에 맞추면 월별 현금 흐름이 정확해져요.',
    },
    {
      q: '[Lv.2 중급] 가계부를 줄이려면 보통 무엇부터 보는 게 효율적일까요? 🔍',
      choices: ['수입만', '금액이 큰 지출 카테고리부터', '영수증 색깔', '통장 개수'],
      correct: 1,
      tip: '식비·교통·구독처럼 비중 큰 곳부터 조정하면 효과가 커요.',
    },
    {
      q: '[Lv.2 중급] 신용카드 사용액은 언제쯤 “지출”로 보는 게 현실적일까요? 🧾',
      choices: ['카드 찍은 순간', '결제일에 청구된 금액', '연말 한 번에', '카드 발급일'],
      correct: 1,
      tip: '통장에서 빠져나가는 시점에 맞추면 잔고 관리에 유리해요.',
    },
    {
      q: '[Lv.2 중급] 연말정산으로 환급금이 들어왔다면 가계부에는? 💴',
      choices: ['지출 차감', '수입(또는 환급 수입)', '무시', '대출 상환'],
      correct: 1,
      tip: '가계에 들어온 돈으로 처리하면 그 달 현금이 맞아요.',
    },
    {
      q: '[Lv.2 중급] “소비기준일”이 있는 카드는 무엇을 정하는 날에 가깝나요? 📅',
      choices: ['카드 디자인 교체일', '이번 달 사용이 다음 달 청구에 묶이는 기준', '연회비 납부일', '카드 재발급일'],
      correct: 1,
      tip: '기준일 전후로 사용이 어느 청구월에 들어가는지 나뉘어요.',
    },
    {
      q: '[Lv.2 중급] CMA에 넣어둔 생활비는 가계부에서 보통 어떻게 다루기 좋을까요? 🏦',
      choices: ['지출로 즉시 소멸', '자산(현금성)으로 두고 이체 시 지출', '수입으로만', '대출로'],
      correct: 1,
      tip: '통장 간 이동은 “옮김”이고, 실제 소비 시점에 지출로 잡는 방식이 흔해요.',
    },
    {
      q: '[Lv.2 중급] 구독 서비스 여러 개를 정리할 때 먼저 하기 좋은 것은? 📺',
      choices: ['가장 비싼 것만 해지', '사용 빈도·금액 순으로 목록화 후 결정', '전부 유지', '카드만 변경'],
      correct: 1,
      tip: '목록으로 보면 잊고 있던 구독을 찾기 쉬워요.',
    },
  ],
  [
    {
      q: '[Lv.3 심화] 물가가 오를 때 같은 금액의 현금의 “살 수 있는 힘”은 어떻게 되나요? 📉',
      choices: ['항상 같다', '보통 줄어든다(실질가치 하락)', '무조건 늘어난다', '금리와 무관'],
      correct: 1,
      tip: '인플레이션은 화폐의 실질 구매력을 약하게 만들 수 있어요.',
    },
    {
      q: '[Lv.3 심화] “기회비용”에 가장 가까운 설명은? ⚖️',
      choices: ['세금으로 낸 금액', '한 가지를 선택해 포기한 차선의 이익', '카드 연회비', '환율 차이'],
      correct: 1,
      tip: 'A를 고르면 B를 포기한 대가를 생각하는 개념이에요.',
    },
    {
      q: '[Lv.3 심화] 복리와 단리의 차이로 맞는 것은? 📈',
      choices: ['복리는 이자에 이자가 붙을 수 있다', '둘은 항상 같다', '단리만 은행에서 쓴다', '복리는 예금에만 적용'],
      correct: 0,
      tip: '복리는 원금뿐 아니라 쌓인 이자에도 이자가 붙는 구조예요.',
    },
    {
      q: '[Lv.3 심화] DSR(총부채원리금상환비율)에 가까운 설명은? 🏠',
      choices: ['순자산 비율', '연 소득 대비 원리금 상환 부담 정도', '카드 한도', '부가세'],
      correct: 1,
      tip: '대출 상환 능력을 볼 때 쓰는 지표 중 하나예요.',
    },
    {
      q: '[Lv.3 심화] 같은 연이자율이라도, 이자를 연 1회 vs 월 복리로 주면 보통 어떤가요? 💹',
      choices: ['항상 동일', '월 복리 쪽이 유리한 경우가 많다', '연 1회가 항상 유리', '이자는 법으로 같다'],
      correct: 1,
      tip: '이자 지급 주기가 짧을수록 복리 효과로 불어날 여지가 커질 수 있어요.',
    },
    {
      q: '[Lv.3 심화] “분산 투자”의 핵심 목적에 가까운 것은? 🧺',
      choices: ['수익률 항상 극대화', '특정 자산만 고르기', '한곳에 몰빵 위험을 줄이기', '세금 0'],
      correct: 2,
      tip: '여러 자산·지역에 나누어 리스크를 분산하는 전략이에요.',
    },
    {
      q: '[Lv.3 심화] 세전 이자소득과 세후를 비교할 때 알맞은 말은? 🧾',
      choices: ['세전이 항상 손에 쥐는 돈', '세후가 실제로 남는 이자에 가깝다', '둘은 항상 같다', '세금은 이자에 없다'],
      correct: 1,
      tip: '이자소득세 등을 반영한 뒤가 “내 통장에 남는” 체감에 가까워요.',
    },
  ],
]

const TIER_LABEL = { 1: '입문 ⭐', 2: '중급 ⭐⭐', 3: '심화 ⭐⭐⭐' }

const XP_PER_CORRECT = 28
const ROUND_SIZE = 5

const phase = ref('intro')
const deck = shallowRef([])
const index = ref(0)
const correctCount = ref(0)
const lastTip = ref('')
const picked = ref(null)
const answered = ref(false)
/** 라운드 시작 시점의 문제 구간 (1~3), 도중 레벨업해도 같은 세트 유지 */
const roundTier = ref(1)

const current = computed(() => deck.value[index.value] || null)
const progressLabel = computed(() => `${index.value + 1} / ${deck.value.length}`)

const tierAtStart = computed(() => roundTier.value)
const tierLabel = computed(() => TIER_LABEL[roundTier.value] || TIER_LABEL[1])

const tierMeta = {
  1: { title: '입문', emoji: '🌱', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.45)' },
  2: { title: '중급', emoji: '⚡', accent: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.45)' },
  3: { title: '심화', emoji: '🚀', accent: '#a855f7', glow: 'rgba(168, 85, 247, 0.45)' },
}

const tierCards = computed(() =>
  [1, 2, 3].map((t) => {
    const row = gameStore.tierStats[t]
    const rate = row.attempted > 0 ? Math.round((row.correct / row.attempted) * 100) : null
    const m = tierMeta[t]
    return {
      tier: t,
      correct: row.correct,
      attempted: row.attempted,
      rounds: row.rounds,
      rate,
      ringDeg: rate == null ? 0 : (rate / 100) * 360,
      ...m,
      isUnlocked: tierFromXp(xp.value) >= t,
      isCurrent: tierFromXp(xp.value) === t,
    }
  }),
)

const quizDigest = computed(() => {
  const { correct, attempted, rounds, accuracy } = gameStore.totalsFromStats
  if (!rounds) {
    return {
      gradeLabel: '첫 도전',
      gradeEmoji: '✨',
      tagline: '완료한 라운드가 없어요. 시작하면 구간별 기록·정답률이 여기 쌓여요.',
      bullets: [
        '입문·중급·심화마다 맞힌 개수와 정답률이 따로 집계돼요.',
        'XP가 오르면 더 높은 구간 문제가 출제되고, 레벨 배지도 함께 올라가요.',
      ],
    }
  }
  const bullets = []
  const parts = [1, 2, 3].map((t) => {
    const r = gameStore.tierStats[t]
    const pct = r.attempted > 0 ? Math.round((r.correct / r.attempted) * 100) : null
    return { t, ...r, pct }
  })
  const ranked = parts.filter((p) => p.attempted >= 4)
  const name = { 1: '입문', 2: '중급', 3: '심화' }
  if (ranked.length >= 2) {
    const byPct = [...ranked].sort((a, b) => (b.pct || 0) - (a.pct || 0))
    const best = byPct[0]
    const weak = byPct[byPct.length - 1]
    if (best.t !== weak.t && best.pct !== weak.pct) {
      bullets.push(`${name[best.t]}에서 ${best.pct}%로 가장 안정적이에요.`)
      bullets.push(`${name[weak.t]}(${weak.pct}%)는 해설 복습으로 올리기 좋은 구간이에요.`)
    } else {
      bullets.push(`${name[best.t]} 구간 위주로 플레이 중이에요. 다른 구간도 섞으면 균형이 좋아져요.`)
    }
  } else if (ranked.length === 1) {
    const p = ranked[0]
    bullets.push(`${name[p.t]} 위주로 ${p.rounds}라운드를 완료했어요. 정답률 ${p.pct}%.`)
  }

  if (accuracy >= 82) bullets.push('전체 정답률이 매우 높아요. 심화 라운드를 자주 열어보세요.')
  else if (accuracy >= 58) bullets.push('전체적으로 개념이 자리 잡는 중이에요. 틀린 문항만 모아 복습하면 효율이 좋아요.')
  else bullets.push('데이터가 쌓이는 단계예요. 같은 구간을 반복하면 패턴이 빨리 보여요.')

  const curT = tierFromXp(xp.value)
  if (curT === 3 && gameStore.tierStats[3].rounds > 0 && gameStore.tierStats[3].attempted < 15) {
    bullets.push('심화 구간이 열렸어요. 인플레·기회비용·DSR 같은 키워드가 점점 익숙해질 거예요.')
  }

  let gradeLabel = '성장형'
  let gradeEmoji = '📈'
  if (accuracy != null && accuracy >= 88) {
    gradeLabel = '마스터'
    gradeEmoji = '👑'
  } else if (accuracy != null && accuracy >= 72) {
    gradeLabel = '우수'
    gradeEmoji = '⭐️'
  }

  const tagline =
    attempted > 0
      ? `누적 ${correct}문제 정답 · 시도 ${attempted}문항 · 정답률 ${accuracy}% · 완료 ${rounds}라운드`
      : `완료 라운드 ${rounds}회`

  return { gradeLabel, gradeEmoji, tagline, bullets }
})

/** XP 기준: 0~99 구간1, 100~199 구간2, 200+ 구간3 (스토어 level 공식과 동일) */
function tierFromXp(xpVal) {
  const n = Number(xpVal) || 0
  const tier = Math.floor(n / 100) + 1
  return Math.min(3, Math.max(1, tier))
}

function shufflePick() {
  const tier = tierFromXp(xp.value)
  roundTier.value = tier
  let pool = QUESTION_TIERS[tier]
  if (!pool?.length) {
    roundTier.value = 1
    pool = QUESTION_TIERS[1]
  }
  const copy = [...pool].sort(() => Math.random() - 0.5)
  const n = Math.min(ROUND_SIZE, pool.length)
  deck.value = copy.slice(0, n)
  index.value = 0
  correctCount.value = 0
  lastTip.value = ''
  picked.value = null
  answered.value = false
  phase.value = 'playing'
}

function pickChoice(i) {
  if (answered.value || !current.value) return
  picked.value = i
  answered.value = true
  if (i === current.value.correct) {
    correctCount.value += 1
    gameStore.addXp(XP_PER_CORRECT)
    lastTip.value = `정답! +${XP_PER_CORRECT} XP 🎉`
  } else {
    lastTip.value = current.value.tip
  }
}

async function nextQuestion() {
  if (index.value >= deck.value.length - 1) {
    gameStore.recordRound({
      tier: roundTier.value,
      correct: correctCount.value,
      total: deck.value.length,
    })
    await gameResultsStore.saveResult({
      tier: roundTier.value,
      correct: correctCount.value,
      total: deck.value.length,
      xpTotal: gameStore.xp,
      level: gameStore.level,
    })
    phase.value = 'result'
    return
  }
  index.value += 1
  picked.value = null
  answered.value = false
  lastTip.value = ''
}

async function backToReport() {
  phase.value = 'intro'
  await Promise.all([transactionStore.fetchTransactions(), gameResultsStore.fetchMyResults()])
}

</script>

<template>
  <div class="min-vh-100 game-page py-4 py-lg-5">
    <div class="container game-container">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <RouterLink to="/dashboard" class="text-decoration-none small text-secondary">← 대시보드</RouterLink>
          <h1 class="h3 fw-bold mt-2 mb-0">🎮 돈 관리 퀴즈</h1>
          <p class="text-secondary small mb-0">게임 레벨에 맞는 <strong>1·2·3구간</strong> 문제가 출제돼요</p>
        </div>
        <div class="text-end">
          <div class="badge bg-primary fs-6 px-3 py-2 rounded-pill">Lv.{{ gameStore.level }}</div>
          <div class="small text-secondary mt-1">총 {{ xp }} XP</div>
        </div>
      </div>

      <div class="card card-soft border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between small text-secondary mb-1">
            <span>다음 레벨까지</span>
            <span>{{ gameStore.xpInCurrentLevel }} / 100 XP</span>
          </div>
          <div class="progress rounded-pill" style="height: 10px">
            <div
              class="progress-bar bg-success progress-bar-striped progress-bar-animated"
              role="progressbar"
              :style="{ width: `${gameStore.xpInCurrentLevel}%` }"
            />
          </div>
        </div>
      </div>

      <div v-if="phase === 'intro'" class="intro-dashboard">
        <div class="intro-hero card-soft text-center position-relative overflow-hidden">
          <div class="intro-hero-orbit" aria-hidden="true" />
          <div class="position-relative">
            <div class="intro-pill small fw-semibold text-uppercase tracking-wide">나의 퀴즈 리포트</div>
            <h2 class="intro-hero-title mt-2 mb-2">
              <span class="intro-gradient-text">돈 관리 DNA</span>
              <span class="intro-shimmer ms-1">스캔</span>
            </h2>
            <p class="text-secondary mb-3 px-md-4">
              구간별 <strong>맞힌 수</strong>와 <strong>정답률</strong>을 모아 두었어요. 아래 인사이트는 기록을 바탕으로 한 가벼운 분석이에요.
            </p>
            <div class="d-flex flex-wrap justify-content-center gap-2 mb-2">
              <span class="badge rounded-pill px-3 py-2 intro-badge-grade">
                {{ quizDigest.gradeEmoji }} {{ quizDigest.gradeLabel }}
              </span>
              <span class="badge rounded-pill px-3 py-2 intro-badge-xp">Lv.{{ gameStore.level }} · {{ xp }} XP</span>
            </div>
            <p class="small text-secondary mb-0 intro-tagline">{{ quizDigest.tagline }}</p>
          </div>
        </div>

        <div class="row g-3 mt-1">
          <div v-for="card in tierCards" :key="card.tier" class="col-md-4">
            <div
              class="tier-card h-100 position-relative"
              :class="{
                'tier-card--current': card.isCurrent,
                'tier-card--locked': !card.isUnlocked,
              }"
              :style="{ '--tier-accent': card.accent, '--tier-glow': card.glow }"
            >
              <div class="tier-card-glow" aria-hidden="true" />
              <div class="position-relative p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <div class="tier-emoji">{{ card.emoji }}</div>
                    <div class="fw-bold fs-5 mt-1">{{ card.tier }}구간 · {{ card.title }}</div>
                    <div class="small text-secondary">완료 {{ card.rounds }}라운드</div>
                  </div>
                  <div
                    class="tier-ring"
                    role="img"
                    :aria-label="card.rate != null ? `정답률 ${card.rate}%` : '정답률 없음'"
                  >
                    <div
                      class="tier-ring-fill"
                      :style="{ background: `conic-gradient(${card.accent} ${card.ringDeg}deg, rgba(148,163,184,0.25) 0)` }"
                    />
                    <div class="tier-ring-inner d-flex flex-column align-items-center justify-content-center">
                      <span class="tier-ring-pct">{{ card.rate != null ? `${card.rate}%` : '—' }}</span>
                      <span class="tier-ring-label">정답률</span>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-end border-top border-secondary border-opacity-25 pt-3">
                  <div>
                    <div class="text-secondary small">맞힌 문제</div>
                    <div class="fs-3 fw-bold tier-stat-num">{{ card.correct }}</div>
                  </div>
                  <div class="text-end">
                    <div class="text-secondary small">시도</div>
                    <div class="fs-5 fw-semibold">{{ card.attempted }}문항</div>
                  </div>
                </div>
                <div v-if="!card.isUnlocked" class="tier-locked-ribbon small">XP 100×(구간−1) 달성 시 오픈</div>
              </div>
            </div>
          </div>
        </div>

        <div class="analysis-panel card-soft mt-4 position-relative overflow-hidden">
          <div class="analysis-panel-shine" aria-hidden="true" />
          <div class="position-relative p-4 p-md-5">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="fs-3" aria-hidden="true">🔮</span>
              <h3 class="h5 fw-bold mb-0 intro-gradient-text">분석 인사이트</h3>
            </div>
            <ul class="list-unstyled mb-0 analysis-list">
              <li v-for="(line, i) in quizDigest.bullets" :key="i" class="d-flex gap-2 mb-2">
                <span class="analysis-bullet" aria-hidden="true">✦</span>
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="financial-panel card-soft mt-4 position-relative overflow-hidden">
          <div class="financial-panel-glow" aria-hidden="true" />
          <div class="position-relative p-4 p-md-5">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="fs-3" aria-hidden="true">💎</span>
                <h3 class="h5 fw-bold mb-0 financial-gradient-title">금융 맞춤 개선안</h3>
              </div>
              <span class="badge rounded-pill financial-badge-pill small">거래 + 퀴즈 기록</span>
            </div>
            <p class="small text-secondary mb-3">{{ improvementPlan.summary }}</p>
            <ul class="list-unstyled mb-2 financial-improve-list">
              <li v-for="(line, i) in improvementPlan.items" :key="i" class="d-flex gap-2 mb-2">
                <span class="financial-chevron" aria-hidden="true">›</span>
                <span>{{ line }}</span>
              </li>
            </ul>
            <p class="small text-muted mb-0 financial-disclaimer">
              참고용 코멘트이며, 투자·대출 등 중요한 결정은 전문가 상담을 권해요. 라운드가 끝나면 결과가 서버(DB)의 게임 기록에 사용자별로 쌓이고, 여기 분석에 함께 반영돼요.
            </p>
            <p v-if="gameResultsStore.error" class="small text-warning mb-0 mt-2">{{ gameResultsStore.error }}</p>
          </div>
        </div>

        <div class="card card-soft border-0 shadow-sm mt-4">
          <div class="card-body p-4 text-center">
            <p class="text-secondary mb-2">
              다음 라운드는
              <span class="badge text-bg-primary">{{ tierFromXp(xp) }}구간</span>
              <span class="text-nowrap">({{ TIER_LABEL[tierFromXp(xp)] }})</span>
              · 문제 {{ ROUND_SIZE }}개 · 정답마다 <strong>{{ XP_PER_CORRECT }} XP</strong>
            </p>
            <p class="small text-muted mb-4">
              2구간(중급)은 누적 XP 100 이상부터, 3구간은 200 이상부터 출제돼요.
            </p>
            <button type="button" class="btn btn-cta btn-lg rounded-pill px-5 fw-bold shadow-lg" @click="shufflePick">
              퀴즈 시작하기 🚀
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="phase === 'playing' && current" class="card card-soft border-0 shadow">
        <div class="card-body p-4 p-md-5">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <span class="badge text-bg-light border">문제 {{ progressLabel }}</span>
              <span class="badge bg-secondary">{{ tierLabel }}</span>
            </div>
            <span class="small text-success fw-semibold">맞힌 개수: {{ correctCount }}</span>
          </div>
          <p class="lead fw-semibold mb-4">{{ current.q }}</p>
          <div class="d-grid gap-2">
            <button
              v-for="(c, i) in current.choices"
              :key="i"
              type="button"
              class="btn btn-lg rounded-4 text-start"
              :class="{
                'btn-outline-primary': !answered || picked !== i,
                'btn-success': answered && i === current.correct,
                'btn-danger': answered && picked === i && i !== current.correct,
              }"
              :disabled="answered"
              @click="pickChoice(i)"
            >
              <span class="me-2">{{ ['A', 'B', 'C', 'D'][i] }}.</span>{{ c }}
            </button>
          </div>
          <div v-if="lastTip" class="alert mt-4 mb-0 rounded-4" :class="answered && picked === current.correct ? 'alert-success' : 'alert-info'">
            {{ lastTip }}
          </div>
          <div v-if="answered" class="mt-4 text-end">
            <button type="button" class="btn btn-primary rounded-4" @click="nextQuestion">
              {{ index >= deck.length - 1 ? '결과 보기 ✨' : '다음 문제 →' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="phase === 'result'" class="card card-soft border-0 shadow text-center p-5">
        <div class="display-3 mb-3">{{ correctCount === deck.length ? '🏆' : correctCount >= 3 ? '👍' : '💪' }}</div>
        <h2 class="h4 fw-bold mb-2">라운드 종료!</h2>
        <p class="text-secondary mb-1">
          <span class="badge text-bg-secondary me-1">{{ tierAtStart }}구간</span>
          <span class="badge text-bg-light border">{{ TIER_LABEL[tierAtStart] }}</span>
        </p>
        <p class="text-secondary mb-4">
          <strong>{{ correctCount }}</strong> / {{ deck.length }} 문제 정답 · 현재 레벨 <strong>Lv.{{ gameStore.level }}</strong>
        </p>
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <button type="button" class="btn btn-primary rounded-4" @click="shufflePick">다시 도전 🔁</button>
          <button type="button" class="btn btn-outline-primary rounded-4" @click="backToReport">📊 리포트</button>
          <RouterLink to="/dashboard" class="btn btn-outline-secondary rounded-4">대시보드로</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-page {
  background: linear-gradient(180deg, #eef2ff 0%, #fff7ed 55%, #fdf4ff 100%);
}
html[data-bs-theme='dark'] .game-page {
  background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%);
}

.game-container {
  max-width: 960px;
}

.intro-dashboard {
  animation: intro-pop 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes intro-pop {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro-hero {
  border-radius: 1.5rem;
  padding: 2rem 1.5rem 2.25rem;
  border: 1px solid rgba(99, 102, 241, 0.35);
  background:
    radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99, 102, 241, 0.28), transparent 55%),
    linear-gradient(165deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.88) 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.6) inset,
    0 24px 48px rgba(79, 70, 229, 0.12);
}

html[data-bs-theme='dark'] .intro-hero {
  border-color: rgba(129, 140, 248, 0.4);
  background:
    radial-gradient(ellipse 120% 80% at 50% -20%, rgba(129, 140, 248, 0.22), transparent 55%),
    linear-gradient(165deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.92) 100%);
  box-shadow:
    0 0 0 1px rgba(148, 163, 184, 0.12) inset,
    0 24px 48px rgba(0, 0, 0, 0.35);
}

.intro-hero-orbit {
  position: absolute;
  inset: -40%;
  background: conic-gradient(from 120deg, #6366f1, #ec4899, #f97316, #22d3ee, #6366f1);
  opacity: 0.14;
  animation: orbit-spin 14s linear infinite;
  filter: blur(36px);
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

.intro-pill {
  display: inline-block;
  letter-spacing: 0.12em;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15));
  color: #4f46e5;
}

html[data-bs-theme='dark'] .intro-pill {
  color: #c7d2fe;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.25), rgba(236, 72, 153, 0.2));
}

.intro-hero-title {
  font-size: clamp(1.35rem, 4vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.intro-gradient-text {
  background: linear-gradient(105deg, #4f46e5, #db2777 45%, #ea580c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.intro-shimmer {
  display: inline-block;
  background: linear-gradient(90deg, #0ea5e9, #a855f7, #0ea5e9);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer-move 2.8s ease-in-out infinite;
}

@keyframes shimmer-move {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.intro-badge-grade {
  background: linear-gradient(120deg, #fef3c7, #fde68a);
  color: #78350f !important;
  border: 1px solid rgba(245, 158, 11, 0.45);
}

.intro-badge-xp {
  background: linear-gradient(120deg, #e0e7ff, #ddd6fe);
  color: #3730a3 !important;
  border: 1px solid rgba(99, 102, 241, 0.35);
}

html[data-bs-theme='dark'] .intro-badge-xp {
  background: linear-gradient(120deg, rgba(55, 48, 163, 0.6), rgba(76, 29, 149, 0.5));
  color: #e0e7ff !important;
}

.intro-tagline {
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}

.tier-card {
  border-radius: 1.35rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

html[data-bs-theme='dark'] .tier-card {
  background: rgba(30, 41, 59, 0.75);
  border-color: rgba(100, 116, 139, 0.4);
}

.tier-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
}

.tier-card--current {
  border-color: var(--tier-accent);
  box-shadow:
    0 0 0 1px var(--tier-accent),
    0 18px 36px var(--tier-glow);
}

.tier-card--locked {
  opacity: 0.72;
}

.tier-card-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle at 30% 20%, var(--tier-glow), transparent 45%);
  opacity: 0.55;
  pointer-events: none;
}

.tier-emoji {
  font-size: 1.75rem;
  line-height: 1;
}

.tier-ring {
  position: relative;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
}

.tier-ring-fill {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  mask: radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px));
}

.tier-ring-inner {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.25);
}

html[data-bs-theme='dark'] .tier-ring-inner {
  background: rgba(15, 23, 42, 0.92);
  border-color: rgba(71, 85, 105, 0.5);
}

.tier-ring-pct {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--tier-accent);
  line-height: 1.1;
}

.tier-ring-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

html[data-bs-theme='dark'] .tier-ring-label {
  color: #94a3b8;
}

.tier-stat-num {
  background: linear-gradient(180deg, var(--tier-accent), #334155);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

html[data-bs-theme='dark'] .tier-stat-num {
  background: linear-gradient(180deg, #e2e8f0, var(--tier-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tier-locked-ribbon {
  margin-top: 0.75rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  background: rgba(100, 116, 139, 0.12);
  color: #64748b;
}

.analysis-panel {
  border-radius: 1.35rem;
  border: 1px solid transparent;
  background:
    linear-gradient(#f8fafc, #f8fafc) padding-box,
    linear-gradient(125deg, #6366f1, #ec4899, #f97316, #22d3ee) border-box;
}

html[data-bs-theme='dark'] .analysis-panel {
  background:
    linear-gradient(#1e293b, #1e293b) padding-box,
    linear-gradient(125deg, #6366f1, #ec4899, #f97316, #22d3ee) border-box;
}

.analysis-panel-shine {
  position: absolute;
  top: -40%;
  left: -30%;
  width: 70%;
  height: 120%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  transform: skewX(-18deg);
  animation: shine-sweep 5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine-sweep {
  0%,
  100% {
    opacity: 0;
    transform: skewX(-18deg) translateX(-30%);
  }
  45% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: skewX(-18deg) translateX(180%);
  }
}

.analysis-list li:last-child {
  margin-bottom: 0 !important;
}

.analysis-bullet {
  color: #ec4899;
  font-weight: 700;
  flex-shrink: 0;
}

.btn-cta {
  border: 0;
  color: #fff !important;
  background: linear-gradient(115deg, #4f46e5 0%, #db2777 48%, #ea580c 100%);
  background-size: 180% auto;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-position 0.35s ease;
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
}

.btn-cta:hover {
  transform: translateY(-2px) scale(1.02);
  background-position: 100% center;
  box-shadow: 0 16px 36px rgba(219, 39, 119, 0.35);
}

.btn-cta:active {
  transform: translateY(0) scale(0.99);
}

.financial-panel {
  border-radius: 1.35rem;
  border: 1px solid transparent;
  background:
    linear-gradient(#fffbeb, #fffbeb) padding-box,
    linear-gradient(120deg, #f59e0b, #ec4899, #8b5cf6, #0ea5e9) border-box;
}

html[data-bs-theme='dark'] .financial-panel {
  background:
    linear-gradient(#1c1917, #1c1917) padding-box,
    linear-gradient(120deg, #f59e0b, #ec4899, #8b5cf6, #0ea5e9) border-box;
}

.financial-panel-glow {
  position: absolute;
  inset: -30%;
  background: radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.2), transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.15), transparent 45%);
  pointer-events: none;
}

.financial-gradient-title {
  background: linear-gradient(95deg, #b45309, #db2777, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

html[data-bs-theme='dark'] .financial-gradient-title {
  background: linear-gradient(95deg, #fcd34d, #f472b6, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.financial-badge-pill {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(236, 72, 153, 0.2));
  color: #9a3412 !important;
  border: 1px solid rgba(245, 158, 11, 0.45);
}

html[data-bs-theme='dark'] .financial-badge-pill {
  color: #fde68a !important;
  border-color: rgba(251, 191, 36, 0.35);
}

.financial-improve-list li:last-child {
  margin-bottom: 0 !important;
}

.financial-chevron {
  color: #f59e0b;
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.35;
  flex-shrink: 0;
}

html[data-bs-theme='dark'] .financial-chevron {
  color: #fcd34d;
}
</style>
