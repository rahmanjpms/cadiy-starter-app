import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import authComponent from "./componets/AuthComponents.tsx";
import formFields from "./componets/FormFields.tsx";

Amplify.configure(outputs);

const debug = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Authenticator components={authComponent} formFields={formFields} hideSignUp={debug}>
            <App />
        </Authenticator>
    </React.StrictMode>
);
