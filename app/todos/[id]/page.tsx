import { fetchTodoById } from "@/app/lib/todoes";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = parseInt(params.id);
    if (isNaN(id)) {
        throw new Error("Invalid ID");
    }
    const todo = await fetchTodoById(Number(id));
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
                <div className="p-4 border rounded w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-2">{todo.todo}</h2>
                    <p className="mb-2">ID: {todo.id}</p>
                    <p className="mb-2">
                        Status:{" "}
                        <span className={todo.completed ? "text-green-600" : "text-red-600"}>
                            {todo.completed ? "Completed" : "Not Completed"}
                        </span>
                    </p>
                    <div className="flex justify-end">
                        <Link href={`/todos/${todo.id}/edit`} className="p-2 bg-yellow-500 text-white rounded">Edit Todo</Link>
                    </div>
                </div>
                <Link href="/todos" className="p-2 bg-blue-500 text-white rounded mt-3">Back to Todos</Link>
            </div>
        </>
    );
}