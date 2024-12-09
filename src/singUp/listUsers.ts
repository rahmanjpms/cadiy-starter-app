
import * as AWS from "@aws-sdk/client-cognito-identity-provider";

export class GetListUser{
  private userPool: string = "";
  private region: string = "";
  
    constructor(upool: string) {
      this.userPool = upool;
      this.region = "ap-southeast-2"; 
    }

  
  public async getList() {
      
    const client = new AWS.CognitoIdentityProviderClient({ region: this.region });
        
    const command = new AWS.ListUsersCommand({
      UserPoolId: this.userPool,
      });
      
    try {
      await client.send(command);
      return {
        message: `Listed ${this.userPool}`,
      };
    } catch (err) {
      console.log("Listed.. : " + err);
    }
  }
}





