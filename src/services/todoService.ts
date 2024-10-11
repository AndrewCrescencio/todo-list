import { supabase } from "./supabase";
import { authService } from "./authService";

export function TodoService() {
  async function fetchTodos() {
    return await supabase.from("todos").select("*").order("id");
  }

  async function postTodo(todoBody: { title: string; description: string }) {
    const { getUserId } = authService();
    const userId = await getUserId();
    if (!userId) {
      console.error("No user session found");
      return null;
    }
    const todo = {
      ...todoBody,
      status: false,
      user_id: userId,
    };
    return await supabase.from("todos").insert(todo).single();
  }

  async function updateTodo(
    todo: { title: string; description: string; status: boolean },
    id: number
  ) {
    return await supabase
      .from("todos")
      .update({
        title: todo.title,
        description: todo.description,
        status: todo.status,
      })
      .eq("id", id)
      .single();
  }

  async function updateTodoStatus(id: number, status: boolean) {
    return await supabase
      .from("todos")
      .update({ status })
      .eq("id", id)
      .single();
  }

  async function deleteTodo(id: number) {
    return await supabase.from("todos").delete().eq("id", id);
  }

  return {
    fetchTodos,
    postTodo,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
  };
}
