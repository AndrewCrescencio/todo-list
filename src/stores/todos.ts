import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { TodoService } from "@/services/todoService";
import type { Todo } from "@/models/todo";

export const useStoreTodos = defineStore("todos", () => {
  const todoService = TodoService();

  const todos = ref<Todo[]>();
  let isLoading = ref(false);

  async function fetchTodos() {
    isLoading.value = true;
    try {
      const { error, data } = await todoService.fetchTodos();

      if (error) {
        return;
      }
      if (data === null) {
        todos.value = [];
        return;
      }
      todos.value = data;
    } catch (err) {
      console.error("Error retrieving data from db", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function postTodo(todoBody: { title: string; description: string }) {
    try {
      const response = await todoService.postTodo(todoBody);
      if (response) {
        if (response.error) {
          alert(response.error.message);
          console.error("There was an error inserting", response.error);
          return null;
        }

        //TODO: depois implementar sem puxar todos os items novamente
        await fetchTodos();
        //
        return response.data;
      }
    } catch (err) {
      alert("Error");
      console.error("Unknown problem inserting to db", err);
      return null;
    }
  }

  async function updateTodo(
    todo: { title: string; description: string; status: boolean },
    id: number
  ) {
    try {
      const { error } = await todoService.updateTodo(
        {
          title: todo.title,
          description: todo.description,
          status: todo.status,
        },
        id
      );

      if (error) {
        alert(error.message);
        console.error("There was an error updating", error);
        return;
      }

      //TODO: depois implementar sem puxar todos os items novamente
      await fetchTodos();
      //
    } catch (err) {
      alert("Error");
      console.error("Unknown problem updating record", err);
    }
  }

  async function updateTodoStatus(id: number, todoStatus: boolean) {
    try {
      const { error } = await todoService.updateTodoStatus(id, todoStatus);

      if (error) {
        alert(error.message);
        console.error("There was an error updating", error);
        return;
      }

      //TODO: depois implementar sem puxar todos os items novamente
      await fetchTodos();
      //
    } catch (err) {
      alert("Error");
      console.error("Unknown problem updating record", err);
    }
  }

  async function deleteTodo(id: number) {
    try {
      await todoService.deleteTodo(id);

      //TODO: depois implementar sem puxar todos os items novamente
      await fetchTodos();
      //
    } catch (error) {
      console.error("error", error);
    }
  }

  return {
    isLoading,
    todos,
    fetchTodos,
    postTodo,
    updateTodoStatus,
    deleteTodo,
    updateTodo,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStoreTodos, import.meta.hot));
