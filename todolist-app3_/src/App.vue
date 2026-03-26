<template>
  <div class="container">
    <div class="card card-body bg-light">
      <div class="title">:: Todolist App</div>
    </div>
    <div class="card card-default card-borderless">
      <div class="card-body">
        <InputTodo @add-todo="addTodo" />
        <TodoList
          :todoList="todoList"
          @delete-todo="deleteTodo"
          @toggle-completed="toggleCompleted"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import TodoList from './components/TodoList.vue';
import InputTodo from './components/InputTodo.vue';

let ts = new Date().getTime();

const todoList = reactive([
  { id: ts, todo: '자전거 타기', completed: false },
  { id: ts + 1, todo: '딸과 공원 산책', completed: true },
  { id: ts + 2, todo: '일요일 애견 카페', completed: false },
  { id: ts + 3, todo: 'Vue 원고 집필', completed: false },
]);

const addTodo = (todo) => {
  console.log('addTodo 호출됨.---> ' + todo);

  if (todo.length >= 2) {
    todoList.push({
      id: new Date().getTime(),
      todo: todo,
      completed: false,
    });
  }
}; //addTodo end

const deleteTodo = (id) => {
  let index = todoList.findIndex((item) => id === item.id);
  todoList.splice(index, 1);
}; //deleteTodo end

const toggleCompleted = (id) => {
  let index = todoList.findIndex((item) => id === item.id);
  todoList[index].completed = !todoList[index].completed;
}; //toggleCompleted end

// return { todoList, addTodo, deleteTodo, toggleCompleted };
// },
// };
</script>
