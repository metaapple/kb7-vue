<template>
  <div>
    X :
    <input
      type="text"
      v-model.number="x"
      style="background-color: yellow"
    /><br />
    Y :
    <input
      type="text"
      v-model.number="y"
      style="background-color: yellow"
    /><br />

    <button @click="calcAdd" class="btn btn-primary">계산</button><br />
    <div class="btn btn-warning">결과 : {{ result }}</div>
  </div>

  <hr style="color: red" />
  <div>
    X :
    <input
      type="text"
      v-model.number="state.x"
      style="background-color: yellow"
    /><br />
    Y :
    <input
      type="text"
      v-model.number="state.y"
      style="background-color: yellow"
    /><br />

    <button @click="calcAdd2" class="btn btn-primary">계산</button><br />
    <div class="btn btn-warning">결과 : {{ state.result }}</div>
  </div>

  <hr style="color: red" />
  <div>
    X :
    <input
      type="text"
      v-model.number="state2.x"
      style="background-color: yellow"
    /><br />
    Y :
    <input
      type="text"
      v-model.number="state2.y"
      style="background-color: yellow"
    /><br />

    <div class="btn btn-danger" style="width: 200px">결과 : {{ result2 }}</div>
  </div>

  <hr style="color: red" />
  <div>
    X :
    <input type="text" style="background-color: yellow" v-model.number="x2" />
    <br />
    <div class="btn btn-danger" style="width: 300px; border: 3px dotted">
      결과 : {{ result3 }}, 이전 값과의 차이 : {{ diff }}
    </div>
  </div>

  <hr style="color: red" />
  <div>
    X :
    <input
      type="text"
      style="background-color: yellow"
      v-model.number="state3.x"
    />
    <br />
    <div class="btn btn-danger" style="width: 300px; border: 3px dotted">
      결과 : {{ state3.result }}
    </div>
  </div>

  <hr style="color: red" />
  <div>
    X :
    <input
      type="text"
      v-model.number="x3"
      style="background-color: yellow"
    /><br />
    Y :
    <input
      type="text"
      v-model.number="y3"
      style="background-color: yellow"
    /><br />
    <div class="btn btn-danger" style="width: 300px; border: 3px dotted">
      결과 : {{ result4 }}
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, watch, watchEffect } from 'vue';
// import { reactive } from 'vue';

export default {
  name: 'Calc',
  setup() {
    //1. ref, calcAdd()
    const x = ref(10);
    const y = ref(20);
    const result = ref(30);

    const calcAdd = () => {
      result.value = x.value + y.value;
    };

    //2. reactive, calcAdd2()
    const state = reactive({ x: 10, y: 20, result: 30 });

    const calcAdd2 = () => {
      state.result = state.x + state.y;
    };

    //3. computed
    const state2 = reactive({ x: 10, y: 20 });
    const result2 = computed(() => {
      return state2.x + state2.y;
    });

    //4. watch
    const x2 = ref(0);
    const result3 = ref(0);
    const diff = ref(0);
    watch(x2, (current, old) => {
      console.log(`${old} -> ${current}`);
      diff.value = current - old;
      result3.value = current * 2;
    });

    //5. watchEffect
    const state3 = reactive({ x: 0, result: 0 });
    watch(
      () => state3.x, //---> 객체 리터럴 중 일부를 따로 구해주어야 반응성 적용됨.
      //   x, //---> 객체 리터럴 중 일부만 지정하면 반응성 적용되지 않음.
      (current, old) => {
        console.log(`${old} -> ${current}`);
        state3.result = current * 2;
      },
    );

    ///////////// 함수내에 지정하지 않아도, ref, reactive로 정의된 모든 변수가 자동으로 대상이 됨.
    const x3 = ref(10);
    const y3 = ref(20);
    const result4 = ref(0);

    watchEffect(() => {
      result4.value = x3.value + y3.value;
      console.log(`${x3.value} + ${y3.value} = ${result4.value}`);
    });

    return {
      x,
      y,
      result,
      calcAdd,
      state,
      calcAdd2,
      state2,
      result2,
      x2,
      result3,
      diff,
      state3,
      x3,
      y3,
      result4,
    };
  },
};
</script>
