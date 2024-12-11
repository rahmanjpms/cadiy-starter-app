import { ThemeProvider, Button, Image, useTheme, View, Theme, Heading, useAuthenticator } from "@aws-amplify/ui-react";

const authComponent = {
    Header() {
        // 箱の上に画像をヘッダーとして設定
        // return <div style={{ textAlign: "center" }}></div>;
        const { tokens } = useTheme();
        const theme: Theme = {
            name: "Auth Example Theme",
            tokens: {
                components: {
                    authenticator: {
                        router: {
                            boxShadow: `0 0 16px ${tokens.colors.overlay["10"]}`,
                            borderWidth: "0",
                        },
                        form: {
                            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
                        },
                    },
                    button: {
                        primary: {
                            backgroundColor: tokens.colors.neutral["100"],
                        },
                        link: {
                            color: tokens.colors.purple["80"],
                        },
                    },
                    fieldcontrol: {
                        _focus: {
                            boxShadow: `0 0 0 2px ${tokens.colors.purple["60"]}`,
                        },
                    },
                    tabs: {
                        item: {
                            color: tokens.colors.neutral["80"],
                            _active: {
                                borderColor: tokens.colors.neutral["100"],
                                color: tokens.colors.purple["100"],
                            },
                        },
                    },
                },
            },
        };
        return (
            <ThemeProvider theme={theme}>
                <View textAlign="center" padding="xxl">
                    <Image alt="Amplify logo" src="https://docs.amplify.aws/assets/logo-dark.svg" />
                </View>
            </ThemeProvider>
        );
    },
    SignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    サインイン
                </Heading>
            );
        },

        Footer() {
            const { toForgotPassword } = useAuthenticator();

            return (
                <View textAlign="center">
                    <Button fontWeight="normal" onClick={toForgotPassword} size="small" variation="link">
                        リセットパスワード
                    </Button>
                </View>
            );
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    Enter Information:
                </Heading>
            );
        },
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    新しいユーザー作成
                </Heading>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    Enter Information:
                </Heading>
            );
        },
    },

    forceNewPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
                    新しいパスワード:
                </Heading>
            );
        },
    },
};

export default authComponent;
