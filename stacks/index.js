import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  // Set default runtime for all functions:
  app.setDefaultFunctionProps({
    runtime: "python3.8",
  });

  const apiStack = new ApiStack(app, "api");

  const authStack = new AuthStack(app, "auth", {
    api: apiStack.api,
  });

  new FrontendStack(app, "frontend", {
    api: apiStack.api,
    auth: authStack.auth,
  });
}
