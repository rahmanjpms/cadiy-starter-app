import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminCreateUserCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import { TEMP_EMAIL_ID, TEMP_EMAIL_PASSWORD, USER_POOL } from "./constants";
import { generatePassword } from "../utilities/utility";

// User creation configuration interface
interface UserCreationConfig {
    userPoolId: string;
    username: string;
    email: string;
    temporaryPassword: string;
    givenName?: string;
    familyName?: string;
}

class CognitoUserManager {
    private client: CognitoIdentityProviderClient;

    constructor(region: string) {
        this.client = new CognitoIdentityProviderClient({ region });
    }

    /**
     * Create a new user in AWS Cognito User Pool
     * @param config User creation configuration
     * @returns Promise resolving to the created user
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createUser(config: UserCreationConfig): Promise<any> {
        try {
            // Prepare user attributes
            const userAttributes = [
                { Name: "email", Value: config.email },
                { Name: "given_name", Value: config.givenName || "" },
                { Name: "family_name", Value: config.familyName || "" },
            ];

            // Prepare the create user command input
            const input: AdminCreateUserCommandInput = {
                UserPoolId: config.userPoolId,
                Username: config.username,
                TemporaryPassword: config.temporaryPassword,
                UserAttributes: userAttributes,

                // Optional: Force user to reset password on first login
                MessageAction: "SUPPRESS", // Suppresses the welcome email
                DesiredDeliveryMediums: ["EMAIL"],
            };

            // Execute user creation command
            const command = new AdminCreateUserCommand(input);
            const response = await this.client.send(command);
            return response;
        } catch (error) {
            console.log("Error creating user in Cognito: \n" + error);
            return null;
        }
    }

    /**
     * Example usage method
     */
    async exampleUserCreation() {
        try {
            const result = await this.createUser({
                userPoolId: USER_POOL,
                username: TEMP_EMAIL_ID,
                email: TEMP_EMAIL_ID,
                temporaryPassword: TEMP_EMAIL_PASSWORD,
                givenName: "Mahbubar",
                familyName: "Rahman",
            });

            if (result) console.log("User created successfully:");
            else console.log("Failed to create user:");
        } catch (error) {
            console.log("Failed to create user:");
        }
    }
}

// // Example of how to use the class
// async function main() {
//     // Initialize the Cognito User Manager with your AWS region
//     const userManager = new CognitoUserManager("us-east-1");

//     // Call the example user creation method
//     await userManager.exampleUserCreation();
// }

// Export the class for potential reuse
export default CognitoUserManager;
