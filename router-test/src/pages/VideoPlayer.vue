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
      // 1) videos 배열에서
      //    "현재 재생 중인 영상(videoInfo.video)"의 위치(index)를 찾는다.
      //    예:
      //    videos = [a, b, c]
      //    현재 영상이 b면 index는 1이 된다.
      const index = videos.findIndex((v) => v.id === videoInfo.video.id);

      // 2) 현재 index의 바로 다음 위치(index + 1)에 있는 영상을 꺼낸다.
      //    예:
      //    현재 index가 1이면 videos[2]를 가져온다.
      //    즉, 다음 영상이 있으면 nextVideo에 저장된다.
      const nextVideo = videos[index + 1];

      // 3) 다음 영상이 실제로 존재하는지 확인한다.
      //    - 현재 영상이 마지막 영상이 아니면 nextVideo가 존재한다.
      //    - 마지막 영상이면 nextVideo는 undefined가 된다.
      if (nextVideo) {
        // 4) 현재 화면에 표시되는 영상 정보를
        //    다음 영상 객체로 교체한다.
        //    reactive 객체이므로 템플릿도 자동 갱신된다.
        //    즉, 제목 / 카테고리 / videoid 값이 모두 다음 영상 기준으로 바뀐다.
        videoInfo.video = nextVideo;

        // 5) 주소(URL)도 다음 영상 id에 맞게 변경한다.
        //    예: /videos/현재id  ->  /videos/다음id
        //    이렇게 해야 브라우저 주소와 실제 재생 영상 정보가 일치한다.
        router.push({
          name: 'videos/id',
          params: { id: nextVideo.id }
        });
      } else {
        // 6) 만약 현재 영상이 마지막 영상이라면
        //    "다음 영상"이 없으므로 첫 번째 영상으로 다시 이동한다.
        //    즉, 재생목록을 순환(loop)하도록 만든 코드이다.
        videoInfo.video = videos[0];

        // 7) 라우터 주소도 첫 번째 영상의 id로 변경한다.
        router.push({
          name: 'videos/id',
          params: { id: videos[0].id }
        });
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