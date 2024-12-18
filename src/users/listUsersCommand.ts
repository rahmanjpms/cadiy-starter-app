import { UserType, ListUsersCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { ACCOUNT_REGION, USER_POOL } from "../singUp/constants";

const listUsers = () => {
    const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });

    const command = new ListUsersCommand({
        UserPoolId: USER_POOL,
    });

    return client.send(command);
};

const getUsers = async () => {
    return await listUsers();
};

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').UserType[]} users
 */
const formatUsers = (users: UserType[]) => {
    return users.map((user: UserType) => `• ${user.Username}`).join("\n");
};

const listUsersHandler = async () => {
    console.log("START - ListUsersCommand");
    try {
        const response = await getUsers();
        if (response) {
            if (response.Users) {
                console.log(formatUsers(response.Users));
                console.log("Has Users");
            } else {
                console.log("No Users");
            }
        } else {
            console.log("No Users");
        }
    } catch (err) {
        console.log("ERROR ListUsersCommand \n" + err);
    }
    console.log("END - ListUsersCommand");
};

export { listUsersHandler };
