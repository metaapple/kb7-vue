import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

export const useTodoListStore = defineStore("todoList", () => {
  const state = reactive({
    todoList: [
      { id: 1, todo: "ES6학습", done: false },
      { id: 2, todo: "React학습", done: false },
      { id: 3, todo: "ContextAPI 학습", done: true },
      { id: 4, todo: "야구경기 관람", done: false },
    ],
  });
  // action
  const addTodo = (todo) => {
    state.todoList.push({ id: new Date().getTime(), todo, done: false });
  };
  const deleteTodo = (id) => {
    let index = state.todoList.findIndex((todo) => todo.id === id);
    state.todoList.splice(index, 1);
  };
  const toggleDone = (id) => {
    let index = state.todoList.findIndex((todo) => todo.id === id);
    state.todoList[index].done = !state.todoList[index].done;
  };

  // 계산된 속성 --> 계산이 필요하거나 일부분을 외부에서 가져다 쓰고 싶은 경우, computed()로 만들어서 return해주면 됨.
  //reactive, ref로 만들어진 변수는 변경된 것을 자동으로 체크해서 template에 반영해주지만, 변수에 넣은 값은 변경된 것을 자동으로 체크해서 반영해주지 않음.
  //변경된 것을 자동으로 체크해서 반영해주려면 computed()로 만들어야함.
  //reactive, ref 전체를 그대로 외부 컴포넌트에서 사용하는 경우에는 리턴만 해주면 됨.
  const doneCount = computed(() => {
    return state.todoList.filter((todoItem) => todoItem.done === true).length;
  });

  const todoList = computed(() => state.todoList);

  return { state, todoList, doneCount, addTodo, deleteTodo, toggleDone };
});
