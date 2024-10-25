<template>
  <el-card>
    <template #header>
      <div class="md:(flex items-center justify-between)">
        <p class="truncate md(my-0)">
          {{ todo.title }}
        </p>
        <div class="flex">
          <el-button @click="onEdit" type="warning" size="small">
            Edit
          </el-button>
          <el-button @click="confirmDelete" type="danger" size="small">
            Delete
          </el-button>
        </div>
      </div>
    </template>
    <p v-if="todo.description">Description</p>
    <p>{{ todo.description }}</p>
    <p>Created day - {{ createdAt }}</p>
    <p>Updated at - {{ updatedAt }}</p>
    <el-checkbox v-model="todo['status']" @click="updateTodoStatus(todo.id, !todo['status'])" size="large"
      label="Completed" />
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStoreTodos } from '@/stores/todos';
import { useDateFormatter } from '@/composables/useDateFormatter';

import { Todo } from '@/models/todo';

import { ElMessage, ElMessageBox } from 'element-plus'
import { useStoreTodoForm } from '@/stores/todo-form';

const { todo } = defineProps<{ todo: Todo }>();

const { updateTodoStatus, deleteTodo } = useStoreTodos();

const { handleEditTodo } = useStoreTodoForm()

const { formatTimestamp } = useDateFormatter();

const onEdit = async () => {
  handleEditTodo(todo)
}

const onDelete = async () => {
  try {
    await deleteTodo(todo.id)
  } catch (e) {
    console.error(e)
  }
}

const confirmDelete = () => {
  ElMessageBox.confirm(
    'Do you want to delete the task permanently? Continue?',
    'Delete Task',
    {
      confirmButtonText: 'Delete Task',
      confirmButtonClass: 'ep-button--danger',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
      await onDelete()
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const createdAt = computed(() => todo?.created_at ? formatTimestamp(todo?.created_at) : '')
const updatedAt = computed(() => todo?.updated_at ? formatTimestamp(todo?.updated_at) : '')
</script>