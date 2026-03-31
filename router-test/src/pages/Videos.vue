<template>
  <div class="card card-body">

    <!-- (1) 페이지 제목 -->
    <h2 class="m-3">영상 리스트</h2>

    <!-- (2) Bootstrap 리스트 그룹 -->
    <ul class="list-group">

      <!-- (3) videos 배열을 반복 렌더링 -->
      <li
          v-for="v in videos"
          :key="v.id"
          class="list-group-item text-left"
          :class="playingVideo(v.id)"
      >
      <!-- (4) 현재 재생 중인 영상이면 스타일 적용 -->
      <!-- playingVideo 함수 결과로 클래스 동적 바인딩 -->

      <!-- (5) 영상 제목 + 카테고리 출력 -->
      {{v.title}} ( {{v.category}} )

      <!-- (6) 영상 상세 페이지로 이동 -->
      <!-- name 기반 라우팅 + id 파라미터 전달 -->
      <router-link :to="{ name:'videos/id', params: { id: v.id } }">

        <!-- (7) 우측에 '듣기' 버튼 표시 -->
        <span class="float-end badge bg-secondary">듣기</span>
      </router-link>
      </li>

    </ul>

    <!-- (8) 자식 라우트 컴포넌트 출력 영역 -->
    <!-- 예: /videos/1 → VideoDetail.vue -->
    <router-view></router-view>

  </div>
</template>

<script>
// (9) provide된 데이터를 가져오기 위한 inject
import { inject } from 'vue'

// (10) 현재 라우트 정보를 가져오기 위한 함수
import { useRoute } from 'vue-router'

export default {
  name : "Videos",

  setup() {
    // (11) 상위 컴포넌트에서 provide한 videos 데이터 주입
    const videos = inject('videos')

    // (12) 현재 URL 라우트 객체 가져오기
    const currentRoute = useRoute();

    // (13) 현재 재생 중인 영상인지 판단하는 함수
    const playingVideo = (id) => {
      // 현재 URL의 params.id와 비교
      // 같으면 강조 클래스 반환, 아니면 빈 문자열
      return id === currentRoute.params.id
          ? "list-group-item-secondary"
          : "";
    }

    // (14) template에서 사용할 데이터/함수 반환
    return { playingVideo, videos }
  }
}
</script>