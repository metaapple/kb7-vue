<template>
  <div>id에 따른 개인정보 화면</div>
</template>

<script>
import members from '@/members.json';

export default {
  name: 'MemberInfo',
  setup() {
    //전달된 id를 꺼내서 id로 json에서 개인 정보 검색한 후
    //개인정보 return하면 template에 출력 가능

    //members안에 있는 것들을 하나씩 꺼내 m에 넣고,
    //한 사람에 대한 정보 객체리터럴인 m에 있는 id와 전달받은 파라메터가 같은지 확인하여
    //해당 객체 리터럴을 검색함.

    return { member };
  },
};
</script>

<style></style>
