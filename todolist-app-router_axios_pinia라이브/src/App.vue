<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="todoListStore.states.isLoading" />
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import { useTodoListStore } from './stores/todoList';

const todoListStore = useTodoListStore();

// App.vue 하위 컴포넌트 중 아무곳에서나 가지고 가서(inject, 주입해서) 사용할 수 있게 제공함.
// provide(
//   'todoList',
//   computed(() => states.todoList),
// );
// provide('actions', { addTodo, deleteTodo, toggleDone, updateTodo });
</script>
