import { LambdaClient, paginateListFunctions } from "@aws-sdk/client-lambda";
import { ACCOUNT_REGION } from "../singUp/constants";

const client = new LambdaClient({ region: ACCOUNT_REGION });

export const helloLambda = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const functions: any[] = [];
    try {
        const paginator = paginateListFunctions({ client }, {});

        for await (const page of paginator) {
            console.log("ST");
            if (page) {
                if (page.Functions) {
                    const funcNames = page.Functions.map((f) => f.FunctionName);
                    if (funcNames) functions.push(...funcNames);
                }
            }
        }
        console.log("Functions:");
        console.log(functions.join("\n"));
    } catch (errorLambda) {
        console.log("Error ➡ : paginateListFunctions ");
    }
    return functions;
};
