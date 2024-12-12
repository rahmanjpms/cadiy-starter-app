import { ResendConfirmationCodeCommand, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

import { ACCOUNT_REGION, CLIENT_ID, TEMP_EMAIL_ID } from "./constants";

//const resendConfirmationCode = (clientId: string, username: string) => {
export const resendConfirmationCode = async () => {
    const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });

    const command = new ResendConfirmationCodeCommand({
        ClientId: CLIENT_ID,
        Username: TEMP_EMAIL_ID,
    });

    try {
        const resendResponse = await client.send(command);
        let returnMsg = "ResendConfirmationCodeCommand : ";

        if (resendResponse) {
            if (resendResponse.CodeDeliveryDetails) {
                returnMsg += " OK";
            } else {
                returnMsg += " NG";
            }
        } else {
            returnMsg += " NG";
        }

        return returnMsg;
    } catch (errorResend) {
        return " Error(ResendConfirmationCodeCommand) : " + errorResend;
    }
};
