<script lang="ts" setup>
import { useStoreTodoForm } from '@/stores/todo-form';
const { handleAddTodo } = useStoreTodoForm();
</script>
<template>
    <section class="container px-4 pb-10 mx-auto">
        <div class="py-10 flex items-center justify-between">
            <h1>Todo List</h1>
            <ElButton type="success" @click="handleAddTodo">Add task</ElButton>
        </div>
        <TodosList />
    </section>
    <TodoModal />
</template>
