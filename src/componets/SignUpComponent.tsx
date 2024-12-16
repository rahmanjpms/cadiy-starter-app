import React, { useState } from "react";
import { CreateAppUser } from "../singUp/createUsers";
import { TEMP_EMAIL_ID } from "../singUp/constants";
import { generatePassword } from "../utilities/utility";
import { Authenticator } from "@aws-amplify/ui-react";

/*
import { USER_POOL, CLIENT_ID } from "../singUp/constants";

// Cognito User Pool Configuration
const poolData = {
    UserPoolId: USER_POOL,
    ClientId: CLIENT_ID,
};
*/

// Interface for form state
interface SignUpFormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

// Interface for form errors
interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const SignUpComponent: React.FC = () => {
    const pass = generatePassword();
    // Initial form state
    const [formState, setFormState] = useState<SignUpFormState>({
        username: TEMP_EMAIL_ID,
        email: TEMP_EMAIL_ID,
        password: pass,
        confirmPassword: pass,
        firstName: "Rahman",
        lastName: "Mahbubar",
    });

    // Form validation errors
    const [errors, setErrors] = useState<FormErrors>({});

    // Loading state for submit button
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear specific field error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof FormErrors];
                return newErrors;
            });
        }
    };

    // Validate form inputs
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Username validation
        if (!formState.username.trim()) {
            newErrors.username = "Username is required";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formState.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formState.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!formState.password) {
            newErrors.password = "Password is required";
        } else if (formState.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        // Confirm password validation
        if (formState.password !== formState.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const objCreateUser = new CreateAppUser();

            const result = await objCreateUser.createInviteUserMutation(formState.email, "Rahman", "tulu");
            new Promise((resolve) => {
                resolve(result);
            })
                .then((msg) => {
                    setIsLoading(false);
                    const msgValue = msg as string;
                    if (msgValue === "CREATE: OK") {
                        console.log("OK:User ......");
                    }
                })
                .catch((resonError) => {
                    setIsLoading(false);
                    setErrors({
                        general: resonError instanceof Error ? "Promess Error" : "An unexpected error occurred",
                    });
                });
        } catch (error) {
            setIsLoading(false);
            setErrors({
                general: error instanceof Error ? error.message : "An unexpected error occurred",
            });
        }
        /*
        try {
            // Create Cognito User Pool
            const userPool = new CognitoUserPool(poolData);
            // Prepare user attributes
            const attributeList: CognitoUserAttribute[] = [
                new CognitoUserAttribute({ Name: "email", Value: formState.email }),
                new CognitoUserAttribute({ Name: "given_name", Value: formState.firstName }),
                new CognitoUserAttribute({ Name: "family_name", Value: formState.lastName }),
            ];

            // Sign up user
            userPool.signUp(formState.username, formState.password, attributeList, [], (err, result) => {
                setIsLoading(false);

                if (err) {
                    setErrors({
                        general: err.message || "An error occurred during sign up",
                    });
                    return;
                }

                // Successfully signed up
                alert("Sign up successful! Please check your email to confirm your account.");
            });
        } catch (error) {
            setIsLoading(false);
            setErrors({
                general: error instanceof Error ? error.message : "An unexpected error occurred",
            });
        }
        */
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {errors.general && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formState.username}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.username ? "border-red-500" : ""
                            }`}
                            placeholder="Choose a username"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.password ? "border-red-500" : ""
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formState.confirmPassword}
                            onChange={handleInputChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors.confirmPassword ? "border-red-500" : ""
                            }`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>

            <Authenticator.SignUp.FormFields />
        </>
    );
};

export default SignUpComponent;

// Additional notes for implementation:
// 1. Install required dependencies:
// npm install amazon-cognito-identity-js
// 2. Replace 'YOUR_USER_POOL_ID' and 'YOUR_CLIENT_ID' with your actual AWS Cognito User Pool details
// 3. This component uses Tailwind CSS for styling. Ensure Tailwind is configured in your project
