<template>
  <!-- (1) 모달 전체 영역 -->
  <div class="modal">
    <div class="box">
      <!-- (2) 상단 제목 영역 -->
      <div class="heading">
        <!-- (3) 현재 영상 제목 출력 -->
        <span class="title">:: {{videoInfo.video.title}}</span>
        <!-- (4) 카테고리 출력 -->
        <span class="category"> ( {{videoInfo.video.category}} ) </span>
        <!-- (5) 닫기 버튼 (영상 정지 + 라우터 이동) -->
        <span class="float-end badge bg-secondary pointer" @click="stopVideo">
                    X
        </span>
      </div>
      <!-- (6) 유튜브 플레이어 영역 -->
      <div class="player">
        <!--
          (7) YoutubeVue3 컴포넌트
          - ref="playerRef" : 플레이어 인스턴스 접근용
          - videoid : 현재 영상 ID
          - autoplay : 자동 재생
          - controls : 컨트롤 UI 표시
          - ended 이벤트 → 다음 영상 자동 재생
        -->
        <YoutubeVue3 ref="playerRef" :videoid="videoInfo.video.id"
                     :autoplay="1" :controls="1" @ended="playNext" />
      </div>
      <div>
        <!-- (8) 플레이어 컨트롤 버튼 영역 -->
        <div>
          <!-- (9) 이전 영상 -->
          <i class="fa fa-backward ml-2 pointer" @click="playPrev"></i>
          <!-- (10) 정지 -->
          <i class="fa fa-stop ml-2 pointer" @click="stopVideo"></i>
          <!-- (11) 다음 영상 -->
          <i class="fa fa-forward ml-2 pointer" @click="playNext"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// (12) Vue 반응형 API import
import { reactive, ref, inject } from 'vue';
// (13) 라우터 관련 API import
import { useRoute, useRouter } from 'vue-router';
// (14) 유튜브 플레이어 컴포넌트 import
import { YoutubeVue3} from 'youtube-vue3';

export default {
  name : "VideoPlayer",
  // (15) 컴포넌트 등록
  components : { YoutubeVue3 },
  setup() {
    // (16) 부모에서 제공한 videos 데이터 주입
    const videos = inject('videos');

    // (17) 유튜브 플레이어 인스턴스를 참조하기 위한 ref
    const playerRef = ref(null);

    // (18) 현재 라우트 정보
    const currentRoute = useRoute();

    // (19) 라우터 이동을 위한 객체
    const router = useRouter();

    // (20) 현재 영상 정보 (reactive 객체)
    // URL의 id와 일치하는 영상 찾기
    let videoInfo =
        reactive({ video: videos.find((v)=>v.id === currentRoute.params.id) });

    // (21) 영상 정지 + 리스트 페이지로 이동
    const stopVideo = () => {
      playerRef.value.player.stopVideo();
      router.push({ name:'videos' });
    }

    // (22) 다음 영상 재생
    const playNext = () => {
      const index = videos.findIndex((v)=>v.id === videoInfo.video.id);
      const nextVideo = videos[index+1];
      if (nextVideo) {
        videoInfo.video = nextVideo;
        router.push({ name:'videos/id', params: { id: nextVideo.id } });
      } else {
        videoInfo.video = videos[0];
        router.push({ name:'videos/id', params: { id: videos[0].id } });
      }
    }
    const playPrev = () => {
      const index = videos.findIndex((v)=>v.id === videoInfo.video.id);
      const prevVideo = videos[index-1];
      if (prevVideo) {
        videoInfo.video = prevVideo;
        router.push({ name:'videos/id', params: { id: prevVideo.id } });
      }
    }

    return { videoInfo, playerRef, playNext, stopVideo,  playPrev };
  }
}
</script>

<style scoped>
.modal { display: block; position: fixed; z-index: 1;
  left: 0; top: 0; width: 100%; height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4); }
.box { background-color: white; margin:80px auto;
  max-width: 500px; min-width: 100px; min-height: 350px;
  font: 13px "verdana";
  padding: 10px 10px 10px 10px;  }
.box div { padding: 0;  display: block;  margin: 10px 0 0 0; }
.box .heading { background: #33A17F; font-weight: 300;
  text-align: left; color: #fff;
  margin:5px 0 5px 0; padding: 10px; min-width:200px;
  max-width:500px; }
.box .player { background:white; }
.pointer { cursor:pointer; }
</style>