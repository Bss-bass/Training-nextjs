import { fetchTodoById } from "@/app/lib/todoes";
import { redirect } from "next/navigation";

export async function Edit(formData: FormData) {
    'use server';
    
    const id = formData.get("id");
    const todoText = formData.get("todo");
    const completed = formData.get("completed") === "on";
    
    const response = await fetch(`https://691333e6f34a2ff1170b114a.mockapi.io/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: todoText,
            completed: completed
        })
    });
    if (!response.ok) {
        throw new Error('Failed to edit todo');
    }

    redirect('/todos');
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
        throw new Error("Invalid ID");
    }

    const todo = await fetchTodoById(Number(id));
    return (
        <>
            <div className="min-h-screen flex justify-center items-center flex-col">
                <h1 className="text-2xl font-bold mb-4">Edit Todo Page</h1>
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={Edit}>
                        <input type="hidden" name="id" value={todo.id} />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="todo">
                                Todo
                            </label>
                            <input
                                id="todo"
                                type="text"
                                defaultValue={todo.todo}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="todo"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="completed">
                                Completed
                            </label>
                            <input
                                id="completed"
                                type="checkbox"
                                defaultChecked={todo.completed}
                                className="mr-2 leading-tight"
                                name="completed"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}