<template>
  <div>
    <h3>당신이 경험한 프론트 엔드 기술은? (첫번째: Slot사용(O)</h3>
    <!-- <span v-for="item in items" :key="item.id"> {{ item.label }} , </span> -->
    <CheckBox2
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :checked="item.checked"
      :label="item.label"
      @check-changed="CheckBoxChanged"
    >
      <!-- slot하나인 경우 레이아웃까지 넣어주고 싶은 컴포넌트 태그 사이에 레이아웃을 넣어줌. -->
      <span
        v-if="item.checked === true"
        style="color: red; text-decoration: underline"
      >
        <i>{{ item.label }}</i>
      </span>
      <span v-else style="color: gray">{{ item.label }}</span>
    </CheckBox2>
  </div>
</template>

<script>
import CheckBox2 from './CheckBox2.vue';

export default {
  name: 'NoSlotTest',
  components: { CheckBox2 },
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
