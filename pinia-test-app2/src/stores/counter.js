import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  //states(상태를 체크할 변수)
  const count = ref(0);

  //getters(미리 계산해서 다른 컴포넌트에 제공하고자 하는 경우)
  const doubleCount = computed(() => count.value * 2);

  //actions(함수, 화살표함수를 권장함.)
  function increment() {
    count.value++;
  }

  const decrement = () => {
    count.value--; //count.value = count.value - 1;
  };

  return { count, doubleCount, increment, decrement };
});
