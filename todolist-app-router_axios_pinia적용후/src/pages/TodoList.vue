<template>
  <div class="row">
    <div class="col p-3">
      <router-link class="btn btn-primary" to="/todos/add">
        할일 추가
      </router-link>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <ul class="list-group">
      <!-- v-for="todoItem in todoListStore.states.todoList" -->
        <TodoItem
          v-for="todoItem in todoListStore.states.todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import TodoItem from '@/pages/TodoItem.vue';

///////////////////////////////////
import { useTodoListStore } from '@/stores/todoList.js';
import { computed } from 'vue';


const todoListStore = useTodoListStore();

//store에서 computed()해주지 않으면, 변경된 것 반영되지 않음.
//다른 컴포넌트에서 변수에 넣어주기 때문, 바로 출력하지 않고, 변수에 넣은 것을 다시 출력함.
//변경된 것을 다시 변수에 넣어야함
// <<<< 주의 >>>>
//reactive(), ref()는 변경된 값이 출력(template)에 자동 반영해주지만
//변수에 넣은 값에 변경된 값이 자동 반영되는 것은 아님.
//computed()를 이용해서 변경된 값을 자동으로 체크해 변수에 넣어주는 처리해야함.

//const todoList = computed(() => todoListStore.states.todoList); //todoListStore.todoList
//v-for="todoItem in todoList"

//처음에 전체 영역 읽어오기
todoListStore.fetchTodoList();
///////////////////////////////////
</script>
