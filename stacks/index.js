import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import FrontendStack from "./FrontendStack";

export default function main(app) {
  // Set default runtime for all functions:
  app.setDefaultFunctionProps({
    runtime: "python3.8",
  });

  const storageStack = new StorageStack(app, "storage")

  const apiStack = new ApiStack(app, "api", {
    bucket: storageStack.bucket,
  });

  // new FrontendStack(app, "frontend", {
  //   api: apiStack.api,
  // });
}
