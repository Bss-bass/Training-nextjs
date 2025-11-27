'use client';

import Link from "next/link";
import { useState } from "react";
import Form from "next/form";
import { addTodoAction } from "./actions";

export default function AddTodoPage() {
    const [todo, setTodo] = useState("");

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const response = await fetch('/api/add-todo', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ todo })
    //     });
    //     if (!response.ok) {
    //         alert('Failed to add todo');
    //         return;
    //     }
    //     console.log('Todo added successfully');
    //     console.log("New Todo:", todo);
    //     setTodo("");
    // }
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
                <Form className="flex flex-col space-y-4 w-96" action={async (formData: FormData) => {
                    await addTodoAction(formData);
                    setTodo("");
                }}>
                    <input
                        type="text"
                        placeholder="Todo Title"
                        className="p-2 border border-gray-300 rounded"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        name="todo"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Add Todo
                    </button>
                    <Link href="/todos" className="p-2 bg-blue-500 text-white rounded mt-3 text-center">Back to Todos</Link>
                </Form>
            </div>
        </>
    )
}