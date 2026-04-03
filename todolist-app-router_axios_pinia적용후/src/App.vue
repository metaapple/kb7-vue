<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="isLoading" />
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import { useTodoListStore } from '@/stores/todoList.js';

const todoListStore = useTodoListStore();
const isLoading = todoListStore.states.isLoading;
</script>
