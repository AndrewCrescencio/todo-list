export type Todo = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: string;
}
