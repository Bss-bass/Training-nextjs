export async function addTodoAction(formData: FormData) {
    console.log('Received new todo:');
    console.log(formData.get('todo'));

    const response = await fetch('https://691333e6f34a2ff1170b114a.mockapi.io/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: formData.get('todo') as string,
            completed: false,
        })
    });

    if (!response.ok) {
        return new Response('Failed to add todo', { status: 500 });
    }

    const newTodo = await response.json();
    return new Response(JSON.stringify(newTodo), { status: 201 });
}