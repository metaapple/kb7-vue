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
        <TodoItem
          v-for="todoItem in todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import TodoItem from '@/pages/TodoItem.vue';
import { useTodoListStore } from '@/stores/todoList.js';
import { computed } from 'vue';

const todoListStore = useTodoListStore();

//computed()해주지 않으면, 변경된 것 반영되지 않음.
const todoList = computed(() => todoListStore.states.todoList);
</script>
