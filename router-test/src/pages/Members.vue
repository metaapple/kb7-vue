<!--<template>-->
<!--  <div class="card card-body">-->
<!--    <h2>Members</h2>-->
<!--    <p>요청 경로 : {{currentRoute.fullPath}}</p>-->

<!--  </div></>-->

<!--</template>-->
<template>
    <div>
      <h2 class="m-4">이날치 멤버</h2>
      <div class="container">
        <div class="row">
          <div
              v-for="m in members"
              :key="m.id"
              class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2"
          >
            <router-link :to="{ name:'members/id', params: { id: m.id } }">
              <!--
                  col-6: 한 줄에 6개의 컬럼
                  col-xs-6 : 한 줄에 작게는 6개의 컬럼까지 허용
                  col-sm-4 col-md-3 : 한 줄에 3개나 4개는 허용, 5개는 XXX
                  col-lg-2 : 한 줄에 크게는 2개까지 허용, 1개는 X
               -->

<!--
-- 라우터에 등록된 주소는 "주소모양"을 만들어주세요.
<router-link :to="'/members/' + m.id">-->
              <img
                  class="img-thumbnail"
                  style="width: 90px; height: 110px"
                  :src="m.photo"
                  :title="m.name"
              /><br />
                <!--  display-7은 기본 글꼴 크기(display-1~display6)보다 더 크고 진하게 설정(추가확장됨.) -->
              <h6 class="display-7">{{ m.name }}</h6>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
    import members from '@/members.json';

    export default {
      name: 'Members',
      setup() {
        return { members };
      },
    };
  </script>

