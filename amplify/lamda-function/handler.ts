
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (event:any) => {
    if (event.triggerSource === "CustomMessage_SignUp") {
        return "ユーザー作成成功、メッセージ送信!";
    }
  
    return "failed....";
};