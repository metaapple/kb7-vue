import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// export const useTodoListStore = defineStore('todoList', () => {
//   //외부에서 가져다쓰고 싶은 변수, 메서드를 정의하고 return
//   //모든 컴포넌트에서 가져다 쓸 수 있음.
//   return {};
// });

export const useTodoListStore = defineStore("todoList", () => {
  //해당 컴포넌트가 시작할 때 이 데이터를 axios로 받아와 채워놓자.
  //json데이터를 가지고 있는 백엔드 서버에서 받아와 todoList에 넣어야하므로 처음에는 비워둔다.
  const states = reactive({
    todoList: [],
    isLoading: false,
  });

  const BASEURI = "/api/todos";
  const router = useRouter();

  //컴포넌트 시작시 axios로 받아와 todoList를 채워넣는 메서드
  //TodoList 목록을 조회합니다

  //1. 컴포넌트 초기화될 때 json-server로 연결해서 전체 목록 가지고 와야함.
  //2. 백엔드 서버로 부터 가지고 온 목록을 todoList에 넣어주야함.
  //3. 화면에 todoList목록을 보일 것임.

  const fetchTodoList = async () => {
    //axios필요함. --> import필요함.
    try {
      let response = await axios.get(BASEURI); //http통신(요청) --> http응답
      if (response.status == 200) {
        console.log(response.data); //콘솔에 찍어서 받은 데이터를 확인해주는 습관이 좋음.
        //states.todoList에 데이터를 넣어주어야 화면에 나타남.
        states.todoList = response.data;
      } else {
        console.log("데이터 전체 조회 실패");
      }
    } catch (e) {
      console.log("예상치 못한 에러가 발생함. 에러 정보는 " + e);
    }
  };

  //fetchTodoList(); //시작하자 함수를 호출하고 싶으면 바로 써주세요.!

  const addTodo = async ({ todo, desc }) => {
    states.isLoading = true;

    try {
      let payload = {
        id: String(new Date().getTime()),
        todo,
        desc,
        done: false,
      };
      const response = await axios.post(BASEURI, payload);
      //created ok일 때, 201 status값 받음.
      if (response.status === 201) {
        await fetchTodoList();
      } else {
        alert("Todo 추가 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
    states.isLoading = false;
  };

  const updateTodo = async ({ id, todo, desc, done }) => {
    states.isLoading = true;

    try {
      let payload = { id, todo, desc, done };
      const response = await axios.put(BASEURI + "/" + id, payload);
      if (response.status === 200) {
        await fetchTodoList();
      } else {
        alert("Todo 수정 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
    states.isLoading = false;
  };

  const deleteTodo = async (id) => {
    states.isLoading = true;
    try {
      const response = await axios.delete(BASEURI + "/" + id);
      if (response.status === 200) {
        await fetchTodoList();
        router.push("/todos");
      } else {
        alert("Todo 삭제 실패");
      }
    } catch (error) {
      alert("에러발생 :" + error);
    }
    states.isLoading = false;
  };

  ////////////////////////////////////////////
  const toggleDone = async (id) => {
    try {
      let todo = states.todoList.find((todo) => todo.id === id);
      todo.done = !todo.done;
      const payload = todo;
      const response = await axios.put(BASEURI + "/" + id, payload);
      if (response.status == 200) {
        await fetchTodoList();
      } else {
        alert("토글 변경 수행 중 에러 발생함.");
      }
    } catch (e) {
      alert("토글 변경 수행 중 예상치 못했던 에러 발생함. ");
    }
  };
  ////////////////////////////////////////////

  return {
    states,
    fetchTodoList,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleDone,
  };
});
