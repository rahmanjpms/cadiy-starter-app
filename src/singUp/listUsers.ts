
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

    // return client.send(command);
      
    try {
      await client.send(command);
      return {
        message: `Listed ${this.userPool}`,
      };
    } catch (err) {
      console.log("Listed.. : " + err);
    }
   
  }
  
  public async createInviteUserMutation(email: string, familyName: string, givenName: string) {
    const client = new AWS.CognitoIdentityProviderClient({ region: this.region });
    const input: AWS.AdminCreateUserCommandInput = {
      UserPoolId: this.userPool,
      Username: email,
      UserAttributes: [
        {
          Name: "family_name",
          Value: familyName,
        },
        {
          Name: "given_name",
          Value: givenName,
        },
      ],
    };
     
    try {
      await client.send(new AWS.AdminCreateUserCommand(input));
      return {
        message: `Created ${familyName}`,
      };
    } catch (err) {
      console.log("User Create : " + err);
    }
  }
  
}





