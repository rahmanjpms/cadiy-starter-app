import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    // email: true,
    email: {
      //verificationEmailStyle: "CODE",
      //verificationEmailSubject: "アカウント招待のお知らせ",
      //verificationEmailBody: (createCode) => `Use this code to confirm your account: ${createCode()}`,
      //  invaitation mail
      userInvitation: {
        emailSubject: "アカウント招待のお知らせ",
        emailBody: (user, code) =>`
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
          管理者から招待されました<br>
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
          以下の情報でログインを実施し、パスワードの再設定をお願いします。<br>
          <br>
          メールアドレス: ${user()} <br>
          仮パスワード: ${code()}<br>
          <br>
          URL： https://main.d1aagcw7bf6a2t.amplifyapp.com/ <br>
          <br>
          認証コードの有効期限は7日間になります。<br>
          期限を過ぎると記載のURLから登録できなくなるのでご注意ください。<br>
         `,          
        },
      },
  },
});
