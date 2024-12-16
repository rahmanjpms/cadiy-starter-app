import { CognitoIdentityProviderClient, ListUsersCommand, ListUsersCommandInput, UserType } from "@aws-sdk/client-cognito-identity-provider";
import { ACCOUNT_REGION } from "./constants";
/**
 * Lists users in an AWS Cognito User Pool
 * @param userPoolId - The ID of the Cognito User Pool
 * @param limit - Optional: Maximum number of users to retrieve (default: 60)
 * @returns Promise resolving to an array of user objects
 */
export async function listCognitoUsers(userPoolId: string, limit: number = 60): Promise<UserType[]> {
    // Configure the Cognito Identity Provider Client
    const client = new CognitoIdentityProviderClient({
        region: process.env.AWS_REGION || ACCOUNT_REGION,
    });

    // Prepare the input parameters for listing users
    const input: ListUsersCommandInput = {
        UserPoolId: userPoolId,
        Limit: limit,
    };

    try {
        // Execute the list users command
        const command = new ListUsersCommand(input);
        const response = await client.send(command);

        // Return the list of users, or an empty array if no users found
        return response.Users || [];
    } catch (error) {
        // Handle and log any errors
        console.error("Error listing Cognito users:", error);
        throw error;
    }
}

/**
 * Example usage
 */
// async function exampleUsage() {
//     try {
//         const userPoolId = "us-east-1_exampleUserPoolId";
//         const users = await listCognitoUsers(userPoolId);

//         // Process and log user information
//         users.forEach((user) => {
//             console.log("User Sub:", user.Username);
//             console.log("User Attributes:", user.Attributes);
//             console.log("User Status:", user.UserStatus);
//         });
//     } catch (error) {
//         console.error("Failed to list users:", error);
//     }
// }
