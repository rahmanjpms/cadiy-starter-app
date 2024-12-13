import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { GetListUser } from "./singUp/listUsers";
//import { CreateAppUser } from "./singUp/createUsers";
import { ACCOUNT_REGION } from "./singUp/constants";
import { confirmSignUp } from "./singUp/confirmSignUp";
import CognitoUserManager from "./singUp/cogntioUserCreateManager";
//import { resendConfirmationCode } from "./singUp/resendConfirmationCode";

//import { helloDynamoDB } from "./dynamoDB/helloDynamoDB";
//import { helloLambda } from "./lambda/helloLabda";

const client = generateClient<Schema>();

export default function App() {
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

    async function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });

        console.log("List User ");

        try {
            const objList = new GetListUser();
            const lst = async () => {
                const data = objList.getList();
                data.then(() => {
                    console.log("OK:list ......");
                }).catch((resonError) => {
                    console.log(resonError + " : List");
                });

                return data;
            };

            await lst();
        } catch {
            console.log("Error :  GetListUser");
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    /**
     *
     */
    const createUser = async () => {
        // try {
        //     const objCreateUser = new CreateAppUser();
        //     const createUser = async () => {
        //         return objCreateUser.createInviteUserMutation(TEMP_EMAIL_ID, "Rahman", "tulu");
        //     };
        //     const msg = createUser();
        //     msg.then(() => {
        //         console.log("OK:User ......");
        //     }).catch((resonError) => {
        //         console.log(resonError);
        //     });
        // } catch {
        //     console.log("Error:User");
        // }

        const userManager = new CognitoUserManager(ACCOUNT_REGION);
        await userManager.exampleUserCreation();
    };

    const confirmUser = async () => {
        try {
            await confirmSignUp("816926");
        } catch {
            console.log("Error:confirmSignUp");
        }
    };

    const resendCode = async () => {
        // try {
        //     const result = await resendConfirmationCode();
        //     console.log(result);
        // } catch {
        //     console.log("Error: resendConfirmationCode");
        // }

        //helloLambda
        // try {
        //     await helloLambda();
        // } catch {
        //     console.log("Error: Hello Lamda");
        // }

        await client.models.Todo.create({ content: "test456" });

        const { data: todos } = await client.models.Todo.list();
        todos.map((todo) => {
            console.log(todo.content);
        });
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
            <div>{name && name.length > 0 && <button onClick={confirmUser}>Confirm User</button>}</div>
            <div>{name && name.length > 0 && <button onClick={resendCode}>Resend Code</button>}</div>
        </main>
    );
}
