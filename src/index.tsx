import { Amplify } from "aws-amplify";
import { createRoot } from "react-dom/client";
import { StoreContext } from "store/StoreContext";
import { userStore } from "store/User";
import App from "./App";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StoreContext.Provider value={userStore}>
    <App />
  </StoreContext.Provider>
);
