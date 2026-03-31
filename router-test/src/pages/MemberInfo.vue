<template>
  <div class="mt-5">
    <!-- (1) member 객체의 photo 속성을 이미지 src로 바인딩 -->
    <img :src="member.photo" class="img" />

    <!-- (2) 이름과 역할(role)을 출력 (문자열 인터폴레이션) -->
    <h4 class="mt-2">{{member.name}}({{member.role}})</h4>

    <!-- (3) 설명(desc) 출력 -->
    <p>{{member.desc}} </p>

    <!-- (4) 인스타그램 링크가 존재할 때만 렌더링 (조건부 렌더링 v-if) -->
    <a v-if="member.insta && member.insta !== ''"
       class="fa fa-instagram m-1"
       :href="member.insta"></a>

    <!-- (5) 페이스북 링크 조건부 렌더링 -->
    <a v-if="member.facebook && member.facebook !== ''"
       class="fa fa-facebook m-1"
       :href="member.facebook"></a>

    <!-- (6) 유튜브 링크 조건부 렌더링 -->
    <a v-if="member.youtube && member.youtube !== ''"
       class="fa fa-youtube m-1"
       :href="member.youtube"></a>

    <br /><br />

    <!-- (7) Vue Router를 이용한 페이지 이동 (name 기반 라우팅) -->
    <router-link :to="{ name:'members' }">
      멤버 목록으로
    </router-link>
  </div>
</template>

<script>
// (8) 현재 라우트 정보를 가져오기 위한 Composition API 함수
import { useRoute } from 'vue-router'

// (9) 멤버 데이터 (정적 JSON 파일)
import members from '@/members.json'

export default {
  name : "MemberInfo",

  setup() {
    // (10) 현재 URL 라우트 객체 가져오기
    const currentRoute = useRoute()

    // (11) URL 파라미터에서 id 추출 후 숫자로 변환
    // 예: /member/3 → params.id = "3" → parseInt → 3
    const id = parseInt(currentRoute.params.id, 10);

    // (12) JSON 데이터에서 해당 id와 일치하는 멤버 찾기
    const member = members.find((m)=>m.id === id)

    // (13) template에서 사용할 데이터 반환
    return { member }
  }
}
</script>