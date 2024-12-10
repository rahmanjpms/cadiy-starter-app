import { Image, useTheme, View } from "@aws-amplify/ui-react";

const authComponent = {
    Header() {
        // 箱の上に画像をヘッダーとして設定
        // return <div style={{ textAlign: "center" }}></div>;
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image alt="Amplify logo" src="https://docs.amplify.aws/assets/logo-dark.svg" />
            </View>
        );
    },
    SignIn: {
        Header() {
            // SignInの箱の中のヘッダーを初期化
            return <div></div>;
        },
    },
    ForgotPassword: {
        Header() {
            // ForgotPasswordの箱の中のヘッダーを初期化
            return <div></div>;
        },
    },
};

export default authComponent;
