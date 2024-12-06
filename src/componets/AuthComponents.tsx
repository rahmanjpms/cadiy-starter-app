const authComponent = {
    Header() {
        // 箱の上に画像をヘッダーとして設定
        return <div style={{ textAlign: "center" }}></div>;
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
