<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { useStoreTodoForm } from '@/stores/todo-form';
import { storeToRefs } from 'pinia';

const storeTodoForm = useStoreTodoForm()
const { isOpen, isDisabled, isEdit } = storeToRefs(storeTodoForm)
const { onConfirm } = storeTodoForm;

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
</script>
<template>
    <el-dialog v-model="isOpen" :title="isEdit ? 'Edit task' : 'Create task'" :before-close="handleClose"
        style="width: 90%;max-width: 600px">
        <TodoForm />
        <template #footer>
            <div class="flex w-full gap-3">
                <el-button @click="isOpen = false" class="w-50% max-sm:!px-3">Cancel</el-button>
                <el-button type="primary" @click="onConfirm" :disabled="isDisabled" class="w-50% !ml-0 max-sm:!px-3">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>