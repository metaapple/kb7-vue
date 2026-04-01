// 라우터(id) // ↓ // 현재 영상 찾기 // ↓ // 이전/다음 ID 계산 // ↓ //
YoutubeVue3에 전달 // ↓ // 이벤트 발생 (ended) // ↓ //다음 영상으로 router 이동

<template>
  <!-- (1) 모달 전체 영역 -->
  <div class="modal">
    <div class="box">
      <!-- (2) 상단 헤더 영역 -->
      <div class="heading">
        <!-- (3) 현재 영상 제목 -->
        <span class="title">:: {{ videoInfo.video.title }}</span>

        <!-- (4) 카테고리 표시 -->
        <span class="category"> ( {{ videoInfo.video.category }} ) </span>

        <!-- (5) 닫기 버튼 (영상 정지 + 목록 이동) -->
        <span class="float-end badge bg-secondary pointer" @click="stopVideo">
          X
        </span>
      </div>

      <!-- (6) 유튜브 플레이어 영역 -->
      <div class="player">
        <!-- (7) 플레이어 인스턴스 접근 -->
        <!-- (8) 현재 영상 ID -->
        <!-- (9) 자동 재생 -->
        <!-- (10) 컨트롤 표시 -->
        <!-- (11) 영상 끝나면 다음 영상 -->
        <YoutubeVue3
          ref="playerRef"
          :videoid="videoInfo.video.id"
          :autoplay="1"
          :controls="1"
          @ended="playNext"
        />
      </div>

      <!-- (12) 컨트롤 버튼 영역 -->
      <div>
        <div>
          <!-- (13) 이전 영상 -->
          <i class="fa fa-backward ml-2 pointer" @click="playPrev"></i>

          <!-- (14) 정지 -->
          <i class="fa fa-stop ml-2 pointer" @click="stopVideo"></i>

          <!-- (15) 다음 영상 -->
          <i class="fa fa-forward ml-2 pointer" @click="playNext"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, inject } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { YoutubeVue3 } from 'youtube-vue3';

export default {
  name: 'VideoPlayer',
  components: { YoutubeVue3 },

  setup() {
    // (16) 상위 컴포넌트에서 제공된 영상 목록
    const videos = inject('videos');

    // (17) 유튜브 플레이어 ref
    const playerRef = ref(null);

    // (18) 현재 라우트 정보
    const currentRoute = useRoute();

    // (19) 라우터 객체 (이동용)
    const router = useRouter();

    // (20) 현재 영상 + 이전/다음 인덱스 변수
    let videoInfo, currentIndex, prevVideoId, nextVideoId;

    // (21) 현재 영상 초기 설정
    videoInfo = reactive({
      video: videos.find((v) => v.id === currentRoute.params.id),
    });

    // (22) 이전/다음 영상 ID 계산 함수
    const getNavId = (to) => {
      // 현재 영상 갱신
      videoInfo.video = videos.find((v) => v.id === to.params.id);

      // 현재 인덱스 찾기
      currentIndex = videos.findIndex((v) => v.id === videoInfo.video.id);

      // 이전 영상
      prevVideoId = videos[currentIndex - 1]
        ? videos[currentIndex - 1].id
        : null;

      // 다음 영상
      nextVideoId = videos[currentIndex + 1]
        ? videos[currentIndex + 1].id
        : null;
    };

    // (23) 초기 진입 시 실행
    getNavId(currentRoute);

    // (24) 영상 정지 + 목록 페이지 이동
    const stopVideo = () => {
      playerRef.value.player.stopVideo();
      router.push({ name: 'videos' });
    };

    // (25) 다음 영상 이동
    const playNext = () => {
      if (nextVideoId)
        router.push({ name: 'videos/id', params: { id: nextVideoId } });
      else router.push({ name: 'videos/id', params: { id: videos[0].id } }); // 처음으로 순환
    };

    // (26) 이전 영상 이동
    const playPrev = () => {
      if (prevVideoId)
        router.push({ name: 'videos/id', params: { id: prevVideoId } });
    };

    // (27) 라우트 변경 시 자동 업데이트
    onBeforeRouteUpdate((to) => {
      getNavId(to);
    });

    // (28) 템플릿에서 사용할 값 반환
    return { videoInfo, playerRef, playNext, stopVideo, playPrev };
  },
};
</script>
<style scoped>
/* (29) 모달 배경 */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

/* (30) 박스 */
.box {
  background-color: white;
  margin: 80px auto;
  max-width: 500px;
  min-height: 350px;
  padding: 10px;
}

/* (31) 헤더 */
.box .heading {
  background: #33a17f;
  color: white;
  padding: 10px;
}

/* (32) 클릭 커서 */
.pointer {
  cursor: pointer;
}
</style>
