import { defineFunction } from "@aws-amplify/backend";
    
export const triggerFunction = defineFunction({
  name: "trigger-function",
  entry: "./handler.ts"
});