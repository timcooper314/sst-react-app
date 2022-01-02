import InfrastructureStack from "./InfrastructureStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  // Set default runtime for all functions:
  app.setDefaultFunctionProps({
    runtime: "python3.8",
  });

  const infraStack = new InfrastructureStack(app, "infrastructure");

  new FrontendStack(app, "frontend", {
    api: infraStack.api,
  });
}
