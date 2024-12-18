import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
//import { addPreSignUpHandler } from "./updateUserPool";
import { USER_POOL, ACCOUNT_REGION, CLIENT_ID, TEMP_EMAIL_PASSWORD } from "./constants";
//import { generatePassword } from "../utilities/utility";
import { updateUserAttributesCommand } from "./updateUserAttributes";
export class CreateAppUser {
    constructor() {}

    public async createInviteUserMutation(email: string) {
        const client = new CognitoIdentityProviderClient({ region: ACCOUNT_REGION });
        const input = {
            ClientId: CLIENT_ID,
            UserPoolId: USER_POOL,
            Username: email,
            Password: TEMP_EMAIL_PASSWORD,
            UserAttributes: [
                {
                    Name: "email",
                    Value: email,
                },
                // {
                //     Name: "email_verified",
                //     Value: "false",
                // },
            ],
        };

        try {
            const command = new SignUpCommand(input);
            const response = await client.send(command);
            if (response) {
                console.log("email_verified :" + response.UserConfirmed);
                try {
                    const resultUserUpdaate = updateUserAttributesCommand();
                    new Promise((resolve) => {
                        resolve(resultUserUpdaate);
                    })
                        .then((msg) => {
                            const msgValue = msg as string;
                            if (msgValue === "OK") {
                                console.log("OK:User Update ......");
                            }
                        })
                        .catch((resonError) => {
                            console.log(resonError);
                        });
                } catch (errUpdUserAttributes) {
                    console.log("ERROR IN UPDATE USER ATTRIBUTES");
                }

                // try {
                //     response.UserConfirmed = true;
                // } catch {
                //     console.log("Error in Confirmaiton");
                // }

                // try {
                //     const responseUpdate = await addPreSignUpHandler();
                //     if (responseUpdate) {
                //         console.log("update pool : 成功");
                //     }
                // } catch (errUpdate) {
                //     console.log("Error update pool : " + errUpdate);
                // }

                // try {
                //     if (response.CodeDeliveryDetails) {
                //         const attribute = response.CodeDeliveryDetails.AttributeName;
                //         if (attribute) {
                //             console.log("AttributeName : " + attribute);
                //         }
                //     }
                // } catch (errorCodeDelelivery) {
                //     console.log("Error - AttributeName : " + errorCodeDelelivery);
                // }
                return "CREATE: OK";
            } else {
                return "CREATE: NG";
            }
        } catch (err) {
            console.log("ERROR SignUpCommand \n" + err);
            return "CREATE: NG";
        }
    }
}
