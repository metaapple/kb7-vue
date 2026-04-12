# Vue 3 가계부 앱

원본 React/TSX 프로젝트를 아래 스택으로 재구성한 버전입니다.

- Vue 3
- Composition API
- ECMAScript Modules
- Pinia
- Vue Router
- Tailwind CSS
- Bootstrap 5

## 설치

```bash
npm install
npm run dev
```

## 주요 구조

```text
src/
├─ components/
├─ router/
├─ stores/
├─ views/
├─ App.vue
├─ main.js
└─ style.css
```

## 기능

- 로그인 / 회원가입
- Pinia 기반 인증 상태 관리
- 거래 추가 / 삭제
- 수입 / 지출 / 잔액 요약
- 월별 차트 표시
- localStorage 기반 데이터 유지
