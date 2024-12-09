// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

export class GetListUser{
    private userPool: string = "";
    constructor(upool: string) {
        this.userPool = upool;
    }

    public async getList() {
      const client = new CognitoIdentityProviderClient({});
        const command = new ListUsersCommand({
        UserPoolId: this.userPool,
        });

        return client.send(command);
    }
}





