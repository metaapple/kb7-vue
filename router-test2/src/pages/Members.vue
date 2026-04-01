<template>
  <div class="card card-body">
    <h2 class="m-4">이날치 그룹 Members</h2>
    <div class="container">
      <div class="row">
        <!-- 한 가로 줄에 컬럼을 지정할 수 있음. 최대크기에는 6개, 중간에는 3-4개, 최소 2개 이상 설정가능
        부트스트랩으로!! 가능
         -->
        <div
          class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2"
          v-for="m in members"
          :key="m.id"
        >
          <router-link to=""> {{ m.id }} - {{ m.name }} </router-link>
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

<style></style>
