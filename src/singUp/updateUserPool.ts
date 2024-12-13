import * as AWS from "@aws-sdk/client-cognito-identity-provider";
import { USER_POOL, ACCOUNT_REGION } from "./constants";

/**
 * Connect a Lambda function to the PreSignUp trigger for a Cognito user pool
 * @returns {Promise<[import("@aws-sdk/client-cognito-identity-provider").UpdateUserPoolCommandOutput | null, unknown]>}
 */
export const addPreSignUpHandler = async () => {
    try {
        const cognitoClient = new AWS.CognitoIdentityProviderClient({
            region: ACCOUNT_REGION,
        });

        const command = new AWS.UpdateUserPoolCommand({
            UserPoolId: USER_POOL,
            AutoVerifiedAttributes: ["email"],
            UserAttributeUpdateSettings: {
                AttributesRequireVerificationBeforeUpdate: ["email"],
            },
        });

        const response = await cognitoClient.send(command);
        return [response, null];
    } catch (err) {
        return [null, err];
    }
};
