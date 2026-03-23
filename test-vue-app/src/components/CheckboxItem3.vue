<template>
  <li><input type="checkbox" :checked="checked" />{{ id }} - {{ name }}</li>
</template>
<script>
export default {
  name: 'CheckboxItem',
  props: {
    id: [Number, String], // Number 또는 String 타입
    name: String, // String 타입
    checked: {
      type: Boolean, // Boolean 타입
      required: false, // 옵션
      default: false, // 생략시, 기본값은 false
    },
  },
};
</script>
