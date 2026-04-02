<template>
  <div class="card card-body">
    <h2>Videos 영상리스트</h2>
    <ul class="list-group">
      <li v-for="v in videos" :key="v.id" class="list-group-item">{{ v.title }}
        <!-- router-link태그는 router/index.js에 등록된 path로 호출시(컴포넌트 변경) 사용
        :to = "path명" 또는 "name" 사용
        반드시 path, name은 index.js에 등록되어있어야함.
        외부 사이트 연결은 일반적으로 a태그 사용
        -->
        <router-link :to="{name : 'videos/id', params :{ id : v.id}}">
          <span class="float-end badge bg-secondary">듣기</span>
        </router-link>
      </li>
    </ul>

<!-- 중첩되어서 들어갈 자리를 만들어주어야함. -->
<router-view></router-view>

  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'Videos',
  setup(){
    //App.vue에서 provide된 이름인 videos를 지정해서 가지고 와서 넣어주세요.
    //주사놓다. 주입하다.
    const videos = inject('videos');
    console.log(videos);

    return {videos}
  }
};
</script>

<style></style>
