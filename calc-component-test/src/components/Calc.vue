<template>
  <div>
    X :
    <input
      type="text"
      v-model.number="x"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    Y :
    <input
      type="text"
      v-model.number="y"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    <button @click="calcAdd" class="btn btn-primary" style="width: 780px">
      계산
    </button>
    <div class="alert alert-warning">결과 : {{ result }}</div>
  </div>
  <hr style="color: red" />

  <div>
    X :
    <input
      type="text"
      v-model.number="state.x"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    Y :
    <input
      type="text"
      v-model.number="state.y"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    <button @click="calcAdd2" class="btn btn-primary" style="width: 780px">
      계산
    </button>
    <div class="alert alert-warning">결과 : {{ state.result }}</div>
  </div>
  <hr style="color: red" />

  <div>
    X :
    <input
      type="text"
      v-model.number="state2.x"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    Y :
    <input
      type="text"
      v-model.number="state2.y"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    <div class="alert alert-warning">
      버튼(이벤트없이) 계산결과를 바로 출력하고 싶을 때 결과 :
      {{ result2 }}
    </div>
  </div>
  <hr style="color: red" />

  <div>
    X :
    <input
      type="text"
      v-model.number="x2"
      style="background-color: yellow"
      class="form-control"
    />
    <br />
    <div class="alert alert-warning">
      버튼(이벤트없이) 이전,이후값을 가지고 처리를 할 때, 감시대상이 변경되면
      비동기통신 같은 복잡한 처리를 하고 싶을 때 결과 :
      {{ result3 }}
    </div>
  </div>
  <hr style="color: red" />
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';

export default {
  name: 'Calc',
  setup() {
    //1. ref
    const x = ref(0);
    const y = ref(0);
    // const imsi = 100; --> ref, reactive함수가 설정되어있지 않은 변수는 v-model, v-bind로 연결해서 쓸 수 없음.
    const result = ref(0);

    const calcAdd = () => {
      result.value = x.value + y.value;
    };

    //2. reactive
    const state = reactive({ x: 0, y: 0, result: 0 });

    const calcAdd2 = () => {
      state.result = state.x + state.y;
    };

    //3. computed
    const state2 = reactive({ x: 0, y: 0 });
    const result2 = computed(() => {
      return state2.x + state2.y;
    });

    //4. watch
    const x2 = ref(0);
    const result3 = ref(0);
    // watch(감시대상, 감시대상이 변경되었을 때 처리함수)
    watch(x2, (current, old) => {
      console.log('이전값 : ' + old + ' 이후값 : ' + current);
      result3.value = current - old;
    });

    //리턴은 setup()맨끝에 위치해야함.
    return {
      x,
      y,
      result,
      calcAdd,
      state,
      state2,
      result2,
      x2,
      result3,
      calcAdd2,
    }; //{변수명, 변수명, 함수명}
  },
};
</script>

<style></style>
