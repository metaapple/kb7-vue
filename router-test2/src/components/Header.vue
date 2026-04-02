<template>
  <nav class="navbar navbar-expand-md bg-dark navbar-dark mt-2">
    <span class="navbar-brand">이날치(LeeNalChi)</span>

    <!-- 햄버거 버튼 -->
    <button class="navbar-toggler" type="button" @click="changeIsNavShow">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="navClass">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">소개</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/members">멤버</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/songs">영상</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  setup() {
    //setup()함수를 쓰는 순간 무조건 맨 끝에는 return이 와야함.
    //반응형 체크할 변수(ref, reactive), 메서드(화살표 함수), 컴퓨티드(자동계산) 등을 모두 리턴해야함.
    //리턴할 것이 많으므로, 객체리터럴{}로 반환해야함.

    //1.
    //오른쪽에 삼선무늬를 클릭 했을 때 하위 메뉴를 보이게 할지 말지를 결정
    //삼선무늬의 상태값을 저장할 수 있는 변수 하나 선언

    // const state = ref(false);
    const state = reactive({ isNavShow: false });

    //2.
    //상태값 변화되었을 때 자동으로 처리하고 싶은 부분(computed())
    //computed()는 무조건 반환값이 있어야함.
    //삼선무늬의 상태값이 true/false인지에 따라서 설정할 css를 선택해주자.
    //(삼항연산자) 조건?true일때 실행되는 코드:false일 때 실행되는 코드

    // 화살표 함수 사용시
    // 한 줄이면 { } 필요없음. 리턴 명시하지 않아도 됨.
    // 한 줄일때 { } 쓰면 return명시해야함.
    // const navClass = computed(() => {
    //   return state.isNavShow
    //     ? 'collapse navbar-collapse show'
    //     : 'collapse navbar-collapse';
    // });
    // () => {} : {}는 실행하는 코드가 1줄일때는 안써도 됨.
    // return이 있는 경우는 {}일때는 반드시 명시해야하고, {}생략한 경우 return 생략 가능

    const navClass = computed(() =>
      state.isNavShow
        ? 'collapse navbar-collapse show'
        : 'collapse navbar-collapse',
    );

    //3.
    //삼선무늬를 눌렀을 때 상태값을 변경해주는 메서드를 하나 만들자.
    const changeIsNavShow = () => {
      state.isNavShow = !state.isNavShow;
      //누를 때마다 두 개의값이 변경하는 경우 (toggle기능)
      //! --> not의 의미(반대의 의미)
    };
    return { state, navClass, changeIsNavShow };
  },
};
</script>

<style></style>
