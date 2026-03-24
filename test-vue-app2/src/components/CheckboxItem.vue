<template>
  <li><input type="checkbox" :checked="checked" />{{ name }}</li>
</template>

<script>
export default {
  name: 'CheckboxItem',
  //자식 컴포넌트는 부모가 보낸 속성들(props)을 받아야함.
  //부모가 3개를 보냈으면 자식은 3개를 받음.
  //부모 :속성명과 동일하게 자식의 props의 ['속성명']으로 써주어야함.
  //부모로 부터 props로 받은 속성값들은 출력만 가능!!
  props: ['name', 'checked', 'id'],
};
</script>
