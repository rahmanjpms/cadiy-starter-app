import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { customMessage } from "./auth/custom-message/resource";

defineBackend({
    auth,
    data,
    customMessage,
});
