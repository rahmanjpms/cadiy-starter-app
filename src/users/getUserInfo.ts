import { AdminGetUserCommand, AdminGetUserCommandOutput, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { ACCOUNT_REGION, TEMP_EMAIL_ID, USER_POOL } from "../singUp/constants";

const adminGetUser = async () => {
    const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });
    const command = new AdminGetUserCommand({
        UserPoolId: USER_POOL,
        Username: TEMP_EMAIL_ID,
    });

    try {
        return await client.send(command);
    } catch (error) {
        console.log("ERROR AdminGetUserCommand \n" + error);
        return null;
    }
};

const getUser = async () => {
    const response = await adminGetUser();

    new Promise((resolve) => {
        resolve(response);
    })
        .then((output) => {
            const outputAttributes = output as AdminGetUserCommandOutput;
            if (outputAttributes) {
                if (outputAttributes.UserAttributes) {
                    const attribute = outputAttributes.UserAttributes;
                    console.log(attribute);
                }
                return outputAttributes;
            }
            return null;
        })
        .catch((resonError) => {
            console.log(resonError);
            return null;
        });
};

/**
 * @param {import('@aws-sdk/client-cognito-identity-provider').AdminGetUserCommandOutput} user
 */
const formatUser = (user: AdminGetUserCommandOutput) => {
    const user1 = user.UserAttributes ? user.UserAttributes[2].Value : "";
    return `${user.Username} {
    "email": "${user1}",
    "status": "${user.UserStatus}"
  }`.trim();
};
const adminGetUserHandler = async () => {
    const user = await getUser();
    if (user != null) {
        const userattribute = user as AdminGetUserCommandOutput;
        console.log(formatUser(userattribute));
    }
};

export { adminGetUser, adminGetUserHandler };
