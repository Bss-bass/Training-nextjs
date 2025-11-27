export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://691333e6f34a2ff1170b114a.mockapi.io/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return (await response.json());
}

export async function fetchTodoById(id: number): Promise<Todo> {
  const response = await fetch(`https://691333e6f34a2ff1170b114a.mockapi.io/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todo with id ${id}`);
  }
  return await response.json();
}