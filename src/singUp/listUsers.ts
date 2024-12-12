import * as AWS from "@aws-sdk/client-cognito-identity-provider";

import { USER_POOL, ACCOUNT_REGION } from "./constants";

export class GetListUser {
    private userPool: string = "";
    private region: string = "";

    constructor() {
        this.userPool = USER_POOL;
        this.region = ACCOUNT_REGION;
    }

    public async getList() {
        const client = new AWS.CognitoIdentityProviderClient({ region: this.region });

        const command = new AWS.ListUsersCommand({
            UserPoolId: this.userPool,
        });

        const formatUsers = (users: AWS.UserType[]) => {
            return users.map((user) => `• ${user.Username}`).join("\n");
        };

        try {
            const response = await client.send(command);
            if (response) {
                if (response.Users) {
                    console.log(formatUsers(response.Users));
                    return {
                        message: `Listed ${this.userPool}`,
                    };
                }
            }
        } catch (err) {
            console.log("ListUsersCommand.. : " + err);
        }
    }
}
