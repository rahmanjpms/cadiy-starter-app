//  ES Modules import
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ACCOUNT_REGION } from "../singUp/constants";

const client = new DynamoDBClient({ region: ACCOUNT_REGION });

export const helloDynamoDB = async () => {
    let msg = "";

    const check = async () => {
        const command = new ListTablesCommand({});
        try {
            const response = await client.send(command);
            if (response) {
                if (response.TableNames) {
                    msg = response.TableNames.join("\n");
                    console.log("Success : " + msg);
                    return msg;
                } else msg = "Response TableNames Error";
            } else msg = "Response Error";
        } catch (errorDynamoDB) {
            msg = "Error : " + errorDynamoDB;
        }
        return msg;
    };

    return await check();
};
