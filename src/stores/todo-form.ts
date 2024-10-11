import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import { Todo } from "@/models/todo";
import { useStoreTodos } from "@/stores/todos";

export const useStoreTodoForm = defineStore("todoForm", () => {
  const { postTodo, updateTodo } = useStoreTodos();

  const formInitialValue = {
    title: "",
    description: "",
    status: false,
  };

  const form = reactive({ ...formInitialValue });

  const isDisabled = ref(false);
  let isEdit = ref(false);
  let currentTaskId = ref<null | number>();
  let isOpen = ref(false);

  const handleAddTodo = () => {
    isEdit.value = false;
    currentTaskId.value = null;
    resetForm();
    nextTick(() => {
      isOpen.value = true;
    });
  };

  const handleEditTodo = (todo: Todo) => {
    isEdit.value = true;
    currentTaskId.value = todo.id;
    form.title = todo.title;
    form.description = todo.description;
    form.status = !!todo.status;
    isOpen.value = true;
  };

  const resetForm = () => {
    Object.assign(form, { ...formInitialValue });
  };

  const createTodo = async () => {
    isDisabled.value = true;
    try {
      await postTodo({
        title: form.title,
        description: form.description,
      });
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      isDisabled.value = false;
      isOpen.value = false;
    }
  };

  const editTodo = async () => {
    try {
      if (currentTaskId.value) {
        await updateTodo(
          {
            title: form.title,
            description: form.description,
            status: form.status,
          },
          currentTaskId.value
        );
      }
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirm = async () => {
    isDisabled.value = true;
    try {
      isEdit.value ? await editTodo() : await createTodo();
    } catch (e) {
      console.error(e);
    } finally {
      currentTaskId.value = null;
      isEdit.value = false;
      isDisabled.value = false;
      isOpen.value = false;
    }
  };

  const onCancel = () => {
    isOpen.value = false;
  };

  return {
    form,
    isDisabled,
    isEdit,
    isOpen,
    handleAddTodo,
    handleEditTodo,
    createTodo,
    resetForm,
    onConfirm,
    onCancel,
  };
});
