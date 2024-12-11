import { paginateListUserPools, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

//const client = new CognitoIdentityProviderClient({});

const client = new CognitoIdentityProviderClient({ region: "ap-southeast-2" });

export const helloCognito = async () => {
    const paginator = paginateListUserPools(
        { client },
        {
            MaxResults: undefined,
        },
        []
    );

    const userPoolNames = [];

    for await (const page of paginator) {
        const names = page.UserPools?.map((pool) => pool.Name);
        if (names) {
            userPoolNames.push(...names);
        }
    }
    console.log("User pool names: ");
    console.log(userPoolNames.join("\n"));
    return userPoolNames;
};
