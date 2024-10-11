<script lang="ts" setup>
import { useStoreTodoForm } from '@/stores/todo-form';
import { storeToRefs } from 'pinia';

const storeTodoForm = useStoreTodoForm()
const { form } = storeToRefs(storeTodoForm)
</script>
<template>
    <el-form :model="form" label-width="auto" style="max-width: 600px" @submit.prevent="">
        <el-form-item label="task name" label-position="top">
            <el-input v-model="form.title" minlength="3" maxlength="64" />
        </el-form-item>
        <el-form-item label="Task description" label-position="top">
            <el-input v-model="form.description" type="textarea" :rows="4" maxlength="300" />
        </el-form-item>
        <!-- <el-form-item>
            <el-button tag="a" href="/">Cancel</el-button>
            <el-button type="primary" @click="createTodo" :disabled="isDisabled">Create</el-button>
        </el-form-item> -->
    </el-form>
</template>