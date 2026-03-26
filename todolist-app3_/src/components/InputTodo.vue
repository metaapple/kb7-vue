<template>
  <div class="row mb-3">
    <div class="col">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="할일을 여기에 입력!"
          v-model.trim="todo"
          @keyup.enter="addTodoHandler"
        />
        <span class="btn btn-primary input-group-addon" @click="addTodoHandler"
          >추가</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const todo = ref('');
const emit = defineEmits(['add-todo']);

const addTodoHandler = () => {
  console.log('addTodoHandler 호출됨.--> ' + todo.value);
  if (todo.value.length >= 3) {
    emit('add-todo', todo.value);
    todo.value = '';
  }
};

// export default {
//   name: 'InputTodo',
//   setup(props, context) {
//     const todo = ref('');
//     const addTodoHandler = () => {
//       console.log('addTodoHandler 호출됨.');
//       if (todo.value.length >= 3) {
//         context.$emit('add-todo', todo.value);
//         todo.value = '';
//       } //if end
//     }; //addTodoHandler end
//     return { todo, addTodoHandler };
//   }, //setup
// };
</script>
