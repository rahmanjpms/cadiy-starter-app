import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    // email: true,
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "WelCome to Cad App",
      verificationEmailBody: (createCode) => `Use this code to confirm your account: ${createCode()}`,
      //  invaitation mail
      userInvitation: {
        emailSubject: "WelCome to Cad App",
        emailBody: (user, code) =>
          `We're happy to have you! You can now login with username ${user()} and temporary password ${code()}`,
        },
      },
  },
});