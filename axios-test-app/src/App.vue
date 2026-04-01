<template>
  <div>
    <h2>콘솔을 확인합니다.</h2>
    <br />
    <br />
    <button @click="requestAPI" style="background: yellow">
      전체 목록 + 하나씩 불러오기(get, 에러X)
    </button>
    <br />
    <button @click="requestAPI2" style="background: pink">
      전체 목록 + 하나씩 불러오기(get, 에러O)
    </button>
    <br />
    <button @click="requestAPI3" style="background: lightblue">
      전체 목록 + 하나씩 불러오기(get, async + await)
    </button>
    <br />
    <button @click="requestAPI4" style="background: lime">
      전체 목록 + 하나씩 불러오기(post, async + await)
    </button>
    <br />

    <button @click="requestAPI5" style="background: lightgreen">
      에러처리
    </button>
    <br />
  </div>
</template>

<script setup>
import axios from 'axios';

const listUrl = '/api/todos';
const todoUrlPrefix = '/api/todos/';

// 에러 X
const requestAPI = async () => {
  let todoList;
  let response = await axios.get(listUrl);
  todoList = response.data;
  console.log('# TodoList : ', todoList);
  for (let i = 0; i < todoList.length; i++) {
    response = await axios.get(todoUrlPrefix + todoList[i].id);
    console.log(`# ${i + 1}번째 Todo : `, response.data);
  }
};

// 에러 O
const requestAPI2 = () => {
  // let todoList;
  // let response = axios.get(listUrl);
  // todoList = response.data;
  // console.log('# TodoList : ', todoList);
  // for (let i = 0; i < todoList.length; i++) {
  //   response = axios.get(todoUrlPrefix + todoList[i].id);
  //   console.log(`# ${i + 1}번째 Todo : `, response.data);
  // }
};

const requestAPI3 = async () => {
  const url = '/api/todos';
  const response = await axios.get(url);
  console.log('# 응답객체3 : ', response);
};

const requestAPI4 = async () => {
  const url = '/api/todos';
  let data = { todo: '윗몸일으키기 3세트', desc: '너무 빠르지 않게...' };
  const resp1 = await axios.post(url, data);
  console.log(resp1.data);
};

const requestAPI5 = async () => {
  const url = '/api/todos';
  // const url = '/api/todos2';
  try {
    const response = await axios.get(url, { timeout: 900 });
    console.log('# 응답객체 : ', response);
  } catch (e) {
    console.log('## 다음 오류가 발생했습니다.');
    if (e instanceof Error) console.log(e.message);
    else console.log(e);
  }
};

// requestAPI();
// requestAPI2();
// requestAPI4();
// requestAPI3();
// requestAPI5();
</script>

<style scoped>
* {
  font-size: medium;
}
h2 {
  color: red;
  border: 10px dotted blue;
}
</style>
