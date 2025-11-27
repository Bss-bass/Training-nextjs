import { fetchTodos } from "@/app/lib/todoes";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export async function Delete(formData: FormData) {
    'use server';

    const id = formData.get("id");
    const response = await fetch(`https://691333e6f34a2ff1170b114a.mockapi.io/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }

    revalidatePath('/todos');
}

export default async function Page() {
    const todos = await fetchTodos();
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div>
                    <Link href="/todos/add" className="p-2 bg-green-500 text-white rounded mb-4 inline-block">Add Todo</Link>
                    {todos.map((todo) => (
                        <div key={todo.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                readOnly
                                className="mr-2"
                            />
                            <span className={`mx-3 ${todo.completed ? "line-through" : ""}`}>
                                {todo.todo}
                            </span>
                            <Link href={`/todos/${todo.id}`} className="p-2 bg-blue-500 text-white rounded">Details</Link>
                            <form action={Delete}>
                                <input type="hidden" name="id" value={todo.id} />
                                <button type="submit" className="p-2 bg-red-500 text-white rounded ml-2">Delete</button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
