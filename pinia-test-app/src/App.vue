<template>
<div>
<h2>TodoList 테스트(Composition API)</h2> <hr />
할일 추가:<input type="text" v-model="todo" />

<button @click="addTodoHandler">추가</button> <hr />
<ul>
<li v-for="todoItem in todoListStore.todoList">
<!-- <li v-for="todoItem in todoList"> -->

<!-- 권장(헷갈림이 제일 없음) -->
<!-- <li v-for="todoItem in todoListStore.stats.todoList"> -->
<span style="cursor: pointer" @click="toggleDone(todoItem.id)">
{{ todoItem.todo }} {{ todoItem.done ? '(완료)' : '' }}
</span> &nbsp;&nbsp;&nbsp;

<button @click="deleteTodo(todoItem.id)">삭제</button>
</li>
</ul>
<div>완료된 할일 수 : {{ todoListStore.doneCount }}</div><div>완료된 할일 수 : {{ doneCount2 }}</div>
</div>
</template>
<script setup>
  import { useTodoListStore } from '@/stores/todoList.js';
  import { ref, computed } from 'vue';
  const todo = ref('');
  const todoListStore = useTodoListStore();
  const { todoList, addTodo, deleteTodo, toggleDone, doneCount } = todoListStore;

  //변수에 넣었다가 출력하는 경우에는 computed()해줌. --> 바로 출력하는 경우 필요없음.
  const doneCount2 = computed(() => todoListStore.doneCount); //todoListStore.doneCount;

  const addTodoHandler = () => {
    addTodo(todo.value);
    // todoListStore.addTodo(todo.value);
    todo.value = '';
  };
</script>