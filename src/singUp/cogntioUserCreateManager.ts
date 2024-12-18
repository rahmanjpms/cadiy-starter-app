import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminCreateUserCommandInput, AdminCreateUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { TEMP_EMAIL_ID, TEMP_EMAIL_PASSWORD, USER_POOL } from "./constants";
// import { generatePassword } from "../utilities/utility";

// User creation configuration interface
interface UserCreationConfig {
    userPoolId: string;
    username: string;
    email: string;
    temporaryPassword: string;
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

    async createUser(config: UserCreationConfig): Promise<AdminCreateUserCommandOutput | null> {
        try {
            const userAttributes = [
                { Name: "email", Value: config.email },
                { Name: "email_verified", Value: "true" },
            ];

            const input: AdminCreateUserCommandInput = {
                UserPoolId: config.userPoolId,
                Username: config.username,
                TemporaryPassword: config.temporaryPassword,
                UserAttributes: userAttributes,
                MessageAction: "SUPPRESS", // Suppresses the welcome email
                DesiredDeliveryMediums: ["EMAIL"],
            };

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
