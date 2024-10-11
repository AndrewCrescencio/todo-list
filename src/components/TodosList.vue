<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStoreTodos } from '@/stores/todos';

const storeTodos = useStoreTodos();
const { todos } = storeToRefs(storeTodos)
</script>

<template>
  <div class="container grid gap-y-4">
    <TodoItem v-for="(todo, index) in todos" :todo="todo" :key="index" />
    <h2 v-if="!todos?.length" class="w-full text-center">The task list is empty</h2>
  </div>
</template>
