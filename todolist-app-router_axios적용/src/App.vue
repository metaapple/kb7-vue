<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="states.isLoading" />
  </div>
</template>
<script setup>
import { reactive, computed, provide } from 'vue';
import Header from '@/components/Header.vue';
import axios from 'axios';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';

//해당 컴포넌트가 시작할 때 이 데이터를 axios로 받아와 채워놓자.
//json데이터를 가지고 있는 백엔드 서버에서 받아와 todoList에 넣어야하므로 처음에는 비워둔다.
const states = reactive({
  todoList: [],
  isLoading: false,
});

const BASEURI = '/api/todos';
const router = useRouter();

//컴포넌트 시작시 axios로 받아와 todoList를 채워넣는 메서드
//TodoList 목록을 조회합니다

const fetchTodoList = async () => {
  states.isLoading = true;

  try {
    const response = await axios.get(BASEURI);
    if (response.status === 200) {
      states.todoList = response.data;
    } else {
      alert('데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

fetchTodoList();

const addTodo = async ({ todo, desc }) => {
  states.isLoading = true;

  try {
    let payload = {
      id: new Date().getTime(),
      todo,
      desc,
      done: false,
    };
    const response = await axios.post(BASEURI, payload);
    //created ok일 때, 201 status값 받음.
    if (response.status === 201) {
      await fetchTodoList();
    } else {
      alert('Todo 추가 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

const updateTodo = async ({ id, todo, desc, done }) => {
  states.isLoading = true;

  try {
    let payload = { id, todo, desc, done };
    const response = await axios.put(BASEURI + '/' + id, payload);
    if (response.status === 200) {
      await fetchTodoList();
    } else {
      alert('Todo 수정 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

const deleteTodo = async (id) => {
  states.isLoading = true;
  try {
    const response = await axios.delete(BASEURI + '/' + id);
    if (response.status === 200) {
      await fetchTodoList();
      router.push('/todos');
    } else {
      alert('Todo 삭제 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

const toggleDone = (id) => {
  let index = states.todoList.findIndex((todo) => todo.id === id);
  states.todoList[index].done = !states.todoList[index].done;
};
provide(
  'todoList',
  computed(() => states.todoList),
);
provide('actions', { addTodo, deleteTodo, toggleDone, updateTodo });
</script>
