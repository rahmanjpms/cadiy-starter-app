import type { CustomMessageTriggerHandler } from "aws-lambda";

export const handler: CustomMessageTriggerHandler = async (event) => {
    if (!event.triggerSource) {
        console.log("missing triggerSource parameter");
        return;
    }

    switch (event.triggerSource) {
        case "CustomMessage_ForgotPassword":
            event.response.emailMessage = `Your new one-time code is ${event.request.codeParameter}`;
            event.response.emailSubject = "Reset my password";
            break;
        case "CustomMessage_SignUp":
            event.response.emailMessage = `
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
            管理者から招待されました<br>
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br>
            以下の情報でログインを実施し、パスワードの再設定をお願いします。<br>
            <br>
            メールアドレス: ${event.request.usernameParameter}<br>
            仮パスワード: ${event.request.codeParameter}<br>
            <br>
            URL: https://main.d1aagcw7bf6a2t.amplifyapp.com/ <br>
            <br>
            認証コードの有効期限は7日間になります。<br>
            期限を過ぎると記載のURLから登録できなくなるのでご注意ください。<br>
            <br>
            `;
            event.response.emailSubject = "アカウント招待のお知らせ";
            break;

        default:
            break;
    }
    return event;
};
