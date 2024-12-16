import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import authComponent from "./componets/AuthComponents.tsx";
import formFields from "./componets/FormFields.tsx";
import { DEBUG_MODE } from "./systemConstants.ts";
const rootElement = document.getElementById("root");
if (rootElement !== null) {
    Amplify.configure(outputs);
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <StrictMode>
            <Authenticator components={authComponent} formFields={formFields} hideSignUp={DEBUG_MODE}>
                <App />
            </Authenticator>
        </StrictMode>
    );
} else {
    console.error("Failed to find the root element.");
}
