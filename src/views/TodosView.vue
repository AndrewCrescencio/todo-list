<script lang="ts" setup>
import { useStoreTodoForm } from "@/stores/todo-form";
const { handleAddTodo } = useStoreTodoForm();
</script>
<template>
  <main>
    <section class="container px-4 pb-10 mx-auto">
      <div class="py-10 flex items-center justify-between">
        <h1>Todo List</h1>
        <el-button type="success" @click="handleAddTodo" class="max-sm:!px-4"
          >Add task</el-button
        >
      </div>
      <TodosList />
    </section>
  </main>
  <TodoModal />
</template>
