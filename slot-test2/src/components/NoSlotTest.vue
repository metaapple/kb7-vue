<template>
  <div>
    <h3>당신이 경험한 프론트 엔드 기술은? (첫번째: Slot사용(X)</h3>
    <!-- <span v-for="item in items" :key="item.id"> {{ item.label }} , </span> -->
    <CheckBox1
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :checked="item.checked"
      :label="item.label"
      @check-changed="CheckBoxChanged"
    />
  </div>
</template>

<script>
import CheckBox1 from './CheckBox1.vue';

export default {
  name: 'NoSlotTest',
  components: { CheckBox1 },
  data() {
    return {
      items: [
        { id: 'V', checked: true, label: 'Vue' },
        { id: 'A', checked: false, label: 'Angular' },
        { id: 'R', checked: false, label: 'React' },
        { id: 'S', checked: false, label: 'Svelte' },
      ],
    };
  },
  methods: {
    CheckBoxChanged(e) {
      let item = this.items.find((item) => item.id === e.id);
      item.checked = e.checked;
    },
  },
};
</script>

<style></style>
