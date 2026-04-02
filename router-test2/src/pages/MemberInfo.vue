<template>
  <div>id에 따른 개인정보 화면</div>
  <div class="mt-5">
    <img :src="member.photo" :alt="member.name">
    <h4>{{ member.name }} - {{ member.role }}</h4>
    <p>{{ member.desc }}</p>
    <a :href="member.insta" v-if="member.insta && member.insta != ''" class="fa fa-instagram m-1"></a>
    <a :href="member.facebook" v-if="member.facebook && member.facebook != ''" class="fa fa-facebook m-1"></a>
    <a :href="member.youtube " v-if="member.youtube  && member.youtube  != ''" class="fa fa-youtube m-1"></a>
  </div>
</template>

<script>
import members from '@/members.json';

//현재 컴포넌트와 관련된 세부정보를 얻어오기 위한 함수
//path, 전달된 파라메터 id 추출
import { useRoute } from 'vue-router';

export default {
  name: 'MemberInfo',
  setup() {
    //전달된 id를 꺼내서 id로 json에서 개인 정보 검색한 후
    //개인정보 return하면 template에 출력 가능

    const currentRoute = useRoute()
    //주소로 전달받은 파라메터는 항상 문자열로 인식
    //json에 있는 id는 정수였음. 전달받은 파라메터는 문자열임
    //파라메터를 정수(10진수, 8진수,...)로 바꾸어주자.
    const id = parseInt(currentRoute.params.id, 10);

    //members안에 있는 것들을 하나씩 꺼내 m에 넣고,
    //한 사람에 대한 정보 객체리터럴인 m에 있는 id와 전달받은 파라메터가 같은지 확인하여
    //해당 객체 리터럴을 검색함.
    const member = members.find((m) => m.id == id); //객체 리터럴 하나(한 명에 대한 정보)
    console.log(member);
    
    return { member };
  },
};
</script>

<style></style>
