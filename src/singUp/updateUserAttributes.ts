import { AdminUpdateUserAttributesCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { ACCOUNT_REGION, TEMP_EMAIL_ID, USER_POOL } from "./constants";

const provider = new CognitoIdentityProviderClient({
    region: ACCOUNT_REGION,
});
const updateUserAttributesCommand = async () => {
    try {
        await provider.send(
            new AdminUpdateUserAttributesCommand({
                UserAttributes: [
                    {
                        Name: "email",
                        Value: TEMP_EMAIL_ID,
                    },
                    {
                        Name: "email_verified",
                        Value: "true",
                    },
                ],
                UserPoolId: USER_POOL,
                Username: TEMP_EMAIL_ID,
            })
        );
        return "OK";
    } catch (errorUpdate) {
        console.log("Error Update : " + errorUpdate);
        return "NG";
    }
};

export { updateUserAttributesCommand };
