import axios from 'axios'

/**
 * - 프로덕션: `/api`(배포 시 Nginx 등에서 json-server/백엔드로 프록시).
 * - 개발: 브라우저와 같은 호스트명으로 `:3000`에 직접 요청(Vite `/api` 프록시 실패·IPv6 이슈 회피).
 * - json-server를 기본 포트 3000으로만 켠 경우: `.env.development`에
 *   `VITE_API_BASE_URL=http://localhost:3000` (또는 127.0.0.1:3000) 설정.
 */
const devDefaultBase = () => {
  if (typeof window === 'undefined') return 'http://127.0.0.1:3000'
  const { hostname } = window.location
  return `http://${hostname}:3000`
}

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim()
  || (import.meta.env.DEV ? devDefaultBase() : '/api')

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})
