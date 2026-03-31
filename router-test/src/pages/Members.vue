<template>
  <div>
    <!-- (1) 페이지 제목 -->
    <h2 class="m-4">이날치 멤버</h2>

    <!-- (2) Bootstrap 컨테이너 (레이아웃 시작) -->
    <div class="container">
      <div class="row">

        <!-- (3) members 배열을 반복 렌더링 -->
        <div
            v-for="m in members"
            :key="m.id"
            class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2"
        >
          <!-- (4) router-link로 상세 페이지 이동 -->
          <!-- name 기반 라우팅 + params로 id 전달 -->
          <router-link :to="{ name:'members/id', params: { id: m.id } }">

            <!-- (5) 멤버 이미지 출력 -->
            <!-- :src → 동적 바인딩 -->
            <!-- :title → 마우스 hover 시 이름 표시 -->
            <img
                class="img-thumbnail"
                style="width: 90px; height: 110px"
                :src="m.photo"
                :title="m.name"
            /><br />

            <!-- (6) 멤버 이름 출력 -->
            <h6 class="display-7">{{ m.name }}</h6>

          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// (7) JSON 데이터 import (멤버 리스트)
import members from '@/members.json';

export default {
  name: 'Members',

  setup() {
    // (8) template에서 사용할 members 데이터 반환
    return { members };
  },
};
</script>