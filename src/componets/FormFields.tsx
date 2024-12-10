const formFields = {
    signIn: {
        username: {
            label: "メール",
            placeholder: "emailをいれてください",
            isRequired: true,
        },
        password: {
            label: "パスワード",
            placeholder: "パスワードをいれてください",
        },
    },
    forgotPassword: {
        username: {
            label: "パスワードをリセットしたいメール",
            placeholder: "emailをいれてください",
        },
    },

    forceNewPassword: {
        password: {
            label: "新パスワード",
            placeholder: "パスワードをいれてください",
        },
        confirm_password: {
            label: "コンファームパスワード",
            placeholder: "パスワードをいれてください",
        },
    },
};

export default formFields;
