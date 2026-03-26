<template>
  <div>
    <input
      type="checkbox"
      :value="id"
      :checked="checked"
      @change="$emit('check-changed', { id, checked: $event.target.checked })"
    />
    <slot>부모가 레이아웃을 넣어줄 구멍을 하나 만들었음.</slot>
  </div>
</template>

<script>
export default {
  name: 'CheckBox1',
  //   데이터는 부모가 가지고 있으니 받아와야함.
  props: ['id', 'checked', 'label'],
};
</script>

<style></style>
