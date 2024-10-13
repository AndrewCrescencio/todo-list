<script setup lang="ts">
import { useStoreTodos } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const storeTodos = useStoreTodos();
const { fetchTodos } = storeTodos;
const { isLoading, todos } = storeToRefs(storeTodos)

let isMounted = ref(false)
fetchTodos().then(() => {
  isMounted.value = true
})
</script>

<template>
  <div class="container grid gap-y-4" v-loading="isLoading">
    <TodoItem v-for="(todo, index) in todos" :todo="todo" :key="index" />
    <h2 v-if="!todos?.length && isMounted" class="w-full text-center">The task list is empty</h2>
  </div>
</template>
