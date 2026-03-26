<template>
  <div>
    <input
      type="checkbox"
      :value="id"
      :checked="checked"
      @change="$emit('check-changed', { id, checked: $event.target.checked })"
    />
    <span v-if="checked === true" style="color: blue; background: lime">{{
      label
    }}</span>
    <span v-else style="color: lime">{{ label }}</span>
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
