<template>
  <div class="container">
    <Header />
    <router-view />
    <!-- 이동시 잠깐 보이는 화면 만들기 -->
     <!-- /////////////////////////////////// -->
    <Loading v-if="todoListStore.states.isLoading" />
    <!-- /////////////////////////////////// -->
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';

///////////////////////////////////
import { useTodoListStore } from '@/stores/todoList.js';

const todoListStore = useTodoListStore();
///////////////////////////////////
</script>
