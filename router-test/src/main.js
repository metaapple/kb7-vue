// (1) Vue 애플리케이션을 생성하기 위한 함수 import
import { createApp } from 'vue'

// (2) Bootstrap CSS를 전역으로 적용 (스타일 프레임워크)
import 'bootstrap/dist/css/bootstrap.css'

// (3) 루트 컴포넌트(App.vue) import
import App from './App.vue'

// (4) Vue Router 설정 import
import router from './router'

// (5) App.vue를 기반으로 Vue 애플리케이션 인스턴스 생성
const app = createApp(App)

// (6) 라우터를 앱에 등록 (페이지 이동 기능 활성화)
app.use(router)

// (7) HTML의 #app 요소에 Vue 앱을 마운트 (렌더링 시작)
app.mount('#app')