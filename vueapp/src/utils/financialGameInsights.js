/**
 * 가계부 거래 + 퀴즈(구간별) 기록을 바탕으로 한 휴리스틱 개선 제안.
 * 투자·대출 등 최종 판단은 전문가 상담을 권합니다.
 */
function tierAccuracy(tierStats, t) {
  const row = tierStats?.[t]
  if (!row || !row.attempted) return null
  return Math.round((row.correct / row.attempted) * 100)
}

export function buildFinancialGameInsights({ transactions, gameHistory, tierStats, xp, level }) {
  const items = []
  const txs = Array.isArray(transactions) ? transactions : []
  const history = Array.isArray(gameHistory)
    ? [...gameHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : []

  let totalIncome = 0
  let totalExpense = 0
  const catExpense = new Map()
  for (const row of txs) {
    const amt = Number(row.amount) || 0
    if (row.type === 'income') totalIncome += amt
    else if (row.type === 'expense') {
      totalExpense += amt
      const c = row.category || '기타'
      catExpense.set(c, (catExpense.get(c) || 0) + amt)
    }
  }
  const balance = totalIncome - totalExpense

  const r1 = tierAccuracy(tierStats, 1)
  const r2 = tierAccuracy(tierStats, 2)
  const r3 = tierAccuracy(tierStats, 3)

  const recent = history.slice(0, 8)
  let recentAcc = null
  if (recent.length > 0) {
    const sumFrac = recent.reduce((s, r) => {
      const tot = Math.max(1, Number(r.total) || 5)
      return s + (Number(r.correct) || 0) / tot
    }, 0)
    recentAcc = Math.round((sumFrac / recent.length) * 100)
  }

  if (totalIncome > 0 && balance < 0) {
    items.push(
      `가계부 합계 기준으로 지출이 수입보다 약 ${Math.abs(balance).toLocaleString('ko-KR')}원 많아요. 퀴즈 입문(수입·지출 구분)을 복습한 뒤, 지출 상위 카테고리부터 줄이는 순서를 정해보세요.`,
    )
  } else if (totalIncome > 0 && balance >= 0) {
    const saveRatio = Math.round((balance / totalIncome) * 100)
    if (saveRatio < 8) {
      items.push(
        `남는 비율이 약 ${saveRatio}%로 낮아요. 고정지출·구독을 한 번에 적어 보고, 퀴즈에서 말하는 "금액이 큰 지출부터" 점검을 실제 기록에 적용해 보세요.`,
      )
    } else if (saveRatio >= 22 && r3 != null && r3 < 62) {
      items.push(
        '흑자 여력은 있는데 심화 정답률이 낮아요. 복리·DSR·분산 투자 퀴즈 해설을 읽으며 장기 자산·부채 개념을 다져 두면 좋아요.',
      )
    }
  }

  const sortedCats = [...catExpense.entries()].sort((a, b) => b[1] - a[1])
  if (totalExpense > 0 && sortedCats.length) {
    const [topCat, topAmt] = sortedCats[0]
    const pct = Math.round((topAmt / totalExpense) * 100)
    if (pct >= 30) {
      items.push(
        `지출 중 "${topCat}"이 약 ${pct}%를 차지해요. 해당 카테고리에 월 상한을 두고, 중급 퀴즈의 카드 청구·할부 기록 시점과 맞춰 "언제 통장에서 빠졌는지" 기준을 통일해 보세요.`,
      )
    }
  }

  const hasSubscription = txs.some(
    (t) =>
      t.type === 'expense' &&
      (String(t.description).includes('구독') || String(t.category).includes('구독')),
  )
  if (hasSubscription && (r2 ?? 72) < 68) {
    items.push(
      '구독성 지출이 보이는데 중급 정답률이 부담된다면, 퀴즈에서 안내한 것처럼 사용 빈도·금액 순으로 목록을 만든 뒤 해지 후보를 고르는 방식이 효율적이에요.',
    )
  }

  if (r1 != null && r1 < 60 && (tierStats?.[1]?.attempted || 0) >= 6) {
    items.push(
      '입문 구간 정답률이 낮아요. 수입·지출·비상금 개념을 해설과 함께 다시 읽고, 거래 입력 시 카테고리를 일관되게 맞춰 보세요.',
    )
  }

  if (r2 != null && r2 < 55 && (tierStats?.[2]?.attempted || 0) >= 5) {
    items.push(
      '중급(카드·환급·CMA 등) 개념이 약하면 월별 현금 흐름이 왜곡되기 쉬워요. 틀린 문항 위주로 같은 구간 라운드를 한 번 더 돌아보세요.',
    )
  }

  if (txs.length >= 8 && history.length < 2) {
    items.push(
      '거래는 쌓였는데 저장된 퀴즈 라운드가 적어요. 라운드를 끝낼 때마다 결과가 서버에 쌓이니 꾸준히 완료하면 이 분석이 더 정교해져요.',
    )
  }

  if (recentAcc != null && recentAcc < 52 && history.length >= 3) {
    items.push(
      `최근 ${recent.length}라운드 평균 정답률이 약 ${recentAcc}%예요. 매 문제 끝난 직후 해설을 천천히 읽고 같은 난이도를 반복하면 회복이 빨라요.`,
    )
  }

  if (items.length === 0) {
    items.push(
      Number(level) >= 3
        ? `현재 Lv.${level}·총 ${xp}XP예요. 심화 라운드를 꾸준히 병행하면 금융 개념과 기록 습관이 함께 좋아져요.`
        : '퀴즈와 가계부 기록을 조금만 더 쌓으면, 지출 패턴과 맞물린 맞춤 코멘트가 여기 채워져요.',
    )
  }

  const summary =
    history.length > 0
      ? `서버에 저장된 라운드 ${history.length}회 · 거래 ${txs.length}건을 함께 반영했어요.`
      : `거래 ${txs.length}건 기준이에요. 라운드를 완료하면 결과가 db에 저장되어 분석이 풍부해져요.`

  return { summary, items: [...new Set(items)].slice(0, 6) }
}
