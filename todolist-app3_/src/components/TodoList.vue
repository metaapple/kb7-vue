<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <!-- <li v-for="todoItem in todoList" :key="todoItem.id">
          {{ todoItem.todo }}
        </li> -->
        <TodoListItem
          v-for="todoItem in todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
          @delete-todo="emit('delete-todo', $event)"
          @toggle-completed="emit('toggle-completed', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import TodoListItem from './TodoListItem.vue';

const props = defineProps({ todoList: { type: Array, required: true } });
const emit = defineEmits(['delete-todo', 'toggle-complete']);
// export default {
//   name: 'TodoList',
//   components: { TodoListItem },
//   props: { todoList: { type: Array, required: true } },
// };
</script>

<style></style>
