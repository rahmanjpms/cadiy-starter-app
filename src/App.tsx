import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
//import { GetListUser } from "./singUp/listUsers";
import { CreateAppUser } from "./singUp/createUsers";
import { ACCOUNT_REGION } from "./singUp/constants";
//import { USER_POOL, CLIENT_ID } from "./singUp/constants";
import { confirmSignUp } from "./singUp/confirmSignUp";
import CognitoUserManager from "./singUp/cogntioUserCreateManager";
//import CognitoAuthService from "./singUp/cognitoAuthService";
import { TEMP_EMAIL_ID } from "./singUp/constants";
//import { generatePassword } from "./utilities/utility";
//import { resendConfirmationCode } from "./singUp/resendConfirmationCode";

//import { helloDynamoDB } from "./dynamoDB/helloDynamoDB";
//import { helloLambda } from "./lambda/helloLabda";

/*
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./loginPage";
import HomePage from "./homePage";
import ConfirmUserPage from "./confirmUserPage";
*/

import { adminGetUserHandler } from "./users/getUserInfo";
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
    }, [user, todos]);

    async function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });

        /*
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

        try {
            const users = await listCognitoUsers(USER_POOL);
            // Process and log user information
            users.forEach((user) => {
                console.log("User Sub:", user.Username);
                console.log("User Attributes:", user.Attributes);
                console.log("User Status:", user.UserStatus);
            });
        } catch (error) {
            console.error("Failed to list users:", error);
        }
        */
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    /**
     *
     */
    const createUser = async () => {
        try {
            const objCreateUser = new CreateAppUser();
            const createUser = await objCreateUser.createInviteUserMutation(TEMP_EMAIL_ID, "Rahman", "tulu");
            new Promise((resolve) => {
                resolve(createUser);
            })
                .then((msg) => {
                    const msgValue = msg as string;
                    if (msgValue === "CREATE: OK") {
                        console.log("OK:User ......");
                    }
                })
                .catch((resonError) => {
                    console.log(resonError);
                });
        } catch {
            console.log("Error:User");
        }

        /*
         const userManager = new CognitoUserManager(ACCOUNT_REGION);
         await userManager.exampleUserCreation();

        try {
            // Replace with your actual Pool ID and Client ID
            const authService = new CognitoAuthService(USER_POOL, CLIENT_ID);

            // Signup a new user
            const signupResult = await authService.signUp({
                username: "Rahman1",
                password: generatePassword(),
                email: TEMP_EMAIL_ID,
                phoneNumber: "",
                additionalAttributes: {
                    "custom:role": "customer",
                },
            });
            console.log("Signup successful:", signupResult);
            // If you want to confirm the user (e.g., after receiving verification code)
            // await authService.confirmSignUp('newuser123', 'verification-code');
        } catch (error) {
            console.error("Signup error:", error);
        }
        */
    };

    const confirmUser = async () => {
        try {
            await confirmSignUp("842065");
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

    const createUserByAdmin = async () => {
        try {
            const userManager = new CognitoUserManager(ACCOUNT_REGION);
            await userManager.exampleUserCreation();
        } catch {
            console.log("Error: admin create User");
        }
    };

    const getUserInfo = async () => {
        try {
            await adminGetUserHandler();
        } catch {
            console.log("Error: admin create User");
        }
    };

    return (
        <main>
            <>
                <h1>{name}</h1>
                <button onClick={signOut}>Sign out</button>
            </>

            {name && name.length > 0 && (
                <div>
                    <div>
                        <br></br>
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
                    </div>

                    <div>
                        <ul>
                            <li>
                                <button onClick={createUser}>Create User</button>
                            </li>
                            <li>
                                <button onClick={confirmUser}>Confirm User</button>
                            </li>
                            <li>
                                <button onClick={resendCode}>Resend Code</button>
                            </li>

                            <li>
                                <button onClick={createUserByAdmin}>Create User By Admin</button>
                            </li>

                            <li>
                                <button onClick={getUserInfo}>User Info</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </main>
    );

    /*
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated() ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/confirm" element={<ConfirmUserPage />} />
                <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate replace to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
    */
}
