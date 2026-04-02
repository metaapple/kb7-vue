<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>
<script setup>
import { reactive, computed, provide } from 'vue';
import Header from '@/components/Header.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

//해당 컴포넌트가 시작할 때 이 데이터를 axios로 받아와 채워놓자.
//json데이터를 가지고 있는 백엔드 서버에서 받아와 todoList에 넣어야하므로 처음에는 비워둔다.
const states = reactive({
  todoList: [],
});

const BASEURI = '/api/todos';
const router = useRouter();

//컴포넌트 시작시 axios로 받아와 todoList를 채워넣는 메서드
//TodoList 목록을 조회합니다

const fetchTodoList = async () => {
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
};

fetchTodoList();

const addTodo = async ({ todo, desc }) => {
  try {
    let payload = {
      id: new Date().getTime(),
      todo,
      desc,
      done: false,
    };
    const response = await axios.post(BASEURI, payload);
    if (response.status === 201) {
      states.todoList.push(payload);
      router.push('/todos');
    } else {
      alert('Todo 추가 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
};

const updateTodo = ({ id, todo, desc, done }) => {
  let index = states.todoList.findIndex((todo) => todo.id === id);
  states.todoList[index] = { id, todo, desc, done };
};
const deleteTodo = (id) => {
  let index = states.todoList.findIndex((todo) => todo.id === id);
  states.todoList.splice(index, 1);
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
