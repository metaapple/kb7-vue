<template>
  <div class="modal">
    <div class="box">
      <div class="heading">
        {{ videoInfo.video.title }} - {{ videoInfo.video.category }}
      </div>
      <div class="player">
        <YoutubeVue3
         :videoid="videoInfo.video.id"
         :autoplay="1"
         :controls="1"
        ></YoutubeVue3>
      </div>
    </div>
  </div>

</template>

<script>
import { YoutubeVue3 } from 'youtube-vue3';
import { reactive, ref, inject } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

export default {
    name : "VideoPlayer",
    components : { YoutubeVue3},
    setup() {
      //위에 제목을 전달받은 id로 검색한 다음 제목 부분에 출력해줄 목적임.
      const videos = inject('videos');

      //전달받은 id받을 목적임.
      const currentRoute = useRoute();

      //이전, 이후 버튼 눌렀을 때 해당하는 id로 다시 VideoPlayer컴포넌트를 다시 라우팅하기 위함.
      //이때 주소는 router/index.js에 있어야함.
      //router-link태그와 같은 역할, js에서 라우팅을 하는 경우는 router객체 사용함.
      const router = useRouter();

      //전달받은 파라메터인 id를 가지고 해당 video를 찾아주자.
      let videoInfo = reactive({video : videos.find( (v) => v.id === currentRoute.params.id)})

      console.log(videoInfo.video);
      
      return {videoInfo}
    }

}
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