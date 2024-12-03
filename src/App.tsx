import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
    //const { signOut } = useAuthenticator();
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    const [name, setName] = useState<string>("");

    const { user, signOut } = useAuthenticator();

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });

        const loginID = user?.signInDetails?.loginId;
        if (loginID) {
            const index = loginID.indexOf("@");
            if (index > -1) {
                const name = loginID.substring(0, index);
                setName(name);
            }
        }
    }, [user]);

    function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }
    return (
        <main>
            <h1>{name}</h1>
            <button onClick={signOut}>Sign out</button>
            <h1>My todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <>
                        {todo.content && todo.content.length > 0 && (
                            <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                                {todo.content}
                            </li>
                        )}
                    </>
                ))}
            </ul>
        </main>
    );
}

export default App;
