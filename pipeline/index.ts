import { App } from "aws-cdk-lib";
import { LambdaPermissionStack } from "./LambdaPermissionStack";

const app = new App();
new LambdaPermissionStack(app, "gateway-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
