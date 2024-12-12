import { ConfirmSignUpCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { ACCOUNT_REGION, CLIENT_ID, TEMP_EMAIL_ID } from "./constants";

const confirmSignUp = async (code: string) => {
    const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });

    const command = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: TEMP_EMAIL_ID,
        ConfirmationCode: code,
    });
    try {
        const response = await client.send(command);
        if (response) {
            console.log("ConfirmSignUpCommand : OK");
            return "OK";
        } else {
            console.log("ConfirmSignUpCommand : NG");
            return "NG";
        }
    } catch (err) {
        return " Error(ConfirmSignUpCommand) : " + err;
    }
};

export { confirmSignUp };
