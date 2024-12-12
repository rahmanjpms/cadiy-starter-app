//import * as AWS from "@aws-sdk/client-cognito-identity-provider";

import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { addPreSignUpHandler } from "./updateUserPool";
import { USER_POOL, ACCOUNT_REGION, CLIENT_ID } from "./constants";

export class CreateAppUser {
    constructor() {}

    public async createInviteUserMutation(email: string, familyName: string, givenName: string) {
        const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });
        const input = {
            ClientId: CLIENT_ID,
            UserPoolId: USER_POOL,
            Username: email,
            Password: "Ankon$1968$Akhi",
            UserAttributes: [
                {
                    Name: "email",
                    Value: email,
                },
                // {
                //     Name: "email_verified",
                //     Value: "true",
                // },
            ],
        };

        try {
            const command = new SignUpCommand(input);
            const response = await client.send(command);

            if (response) {
                try {
                    const responseUpdate = await addPreSignUpHandler();
                    if (responseUpdate) {
                        console.log("update pool : 成功");
                    }
                } catch (errUpdate) {
                    console.log("Error update pool : " + errUpdate);
                }

                try {
                    if (response.CodeDeliveryDetails) {
                        const attribute = response.CodeDeliveryDetails.AttributeName;
                        if (attribute) {
                            console.log("AttributeName : " + attribute);
                        }
                    }
                } catch (errorCodeDelelivery) {
                    console.log("Error - AttributeName : " + errorCodeDelelivery);
                }
            }

            return {
                message: null,
            };
        } catch (err) {
            console.log(`Failed :  ${familyName} + ${givenName} `);
            console.log("Error : " + err);
            return {
                message: "Creation : Failed",
            };
        }
    }
}
