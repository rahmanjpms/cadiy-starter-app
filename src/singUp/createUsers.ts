//import * as AWS from "@aws-sdk/client-cognito-identity-provider";

import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

import config from "../../amplify_outputs.json"

export class CreateAppUser{
  private userPool: string = "";
  //private region: string = "";
  
    constructor(upool: string) {
      this.userPool = upool;
     // this.region = "ap-southeast-2"; 
    }
 
  
  // public async createInviteUserMutation(email: string, familyName: string, givenName: string) {
  //   const client = new AWS.CognitoIdentityProviderClient({ region: this.region });
  //   const input: AWS.AdminCreateUserCommandInput = {
  //     UserPoolId: this.userPool,
  //     Username: email,
  //     UserAttributes: [
  //       {
  //          Name: "email",
  //          Value: email,
  //       },
  //     ],
  //   };
     
  //   try {
  //     await client.send(new AWS.AdminCreateUserCommand(input));
  //     return {
  //       message: null,
  //     };
  //   } catch (err) {
  //     console.log(`Failed :  ${familyName} + ${givenName} ` )
  //     console.log("Error : " + err);
  //     return {
  //       message: "Creation : Failed",
  //     };
  //   }
  // }

  public async createInviteUserMutation2(email: string, familyName: string, givenName: string) {
    const client = new CognitoIdentityProviderClient(config);
    const input = {
      ClientId: "6oi5g1pem9hmqh3bs7o24nhphh",
      UserPoolId: this.userPool,
      Username: email,
      Password:"Ankon$1968$Akhi",
      UserAttributes: [
        {
           Name: "email",
           Value: email,
        },
      ],
    };
     
    try {
    const command = new SignUpCommand(input);
    const response = await client.send(command);
    console.log(" Confirmed ? : " +  response.UserConfirmed)
    return {
        message: null,
    };
    } catch (err) {
      console.log(`Failed :  ${familyName} + ${givenName} ` )
      console.log("Error : " + err);
      return {
        message: "Creation : Failed",
      };
    }
  }
}

