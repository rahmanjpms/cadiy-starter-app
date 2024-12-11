import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { GetListUser } from "./singUp/listUsers";
import { CreateAppUser } from "./singUp/createUsers";
import { helloCognito } from "./singUp/helloCognito";

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

        try {
            const objList = new GetListUser("ap-southeast-2_6Dp8uDJA8");
            const lst = async () => {
                const data = objList.getList();
                data.then(() => {
                    console.log("OK:list ......");
                }).catch((resonError) => {
                    console.log(resonError + " : List");
                });
            };
            lst();
            console.log("OK......");
        } catch {
            console.log("Error");
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    /**
     *
     */
    const createUser = async () => {
        try {
            const result = await helloCognito();
            if (result) {
                console.log(result.join("\n"));
            }
        } catch {
            console.log("Error:helloCognito");
        }

        try {
            const objCreateUser = new CreateAppUser("ap-southeast-2_6Dp8uDJA8");
            const createUser = async () => {
                return objCreateUser.createInviteUserMutation2("tulumrah@hotmail.com", "Rahman", "tulu");
            };
            const msg = createUser();
            msg.then(() => {
                console.log("OK:User ......");
            }).catch((resonError) => {
                console.log(resonError);
            });
        } catch {
            console.log("Error:User");
        }
    };

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
            <>{name && name.length > 0 && <button onClick={createUser}>Create User</button>}</>
        </main>
    );
}

export default App;
