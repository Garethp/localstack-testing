import { App } from "aws-cdk-lib/core";
import { ApiGatewayStack } from "./ApiGatewayStack";

const app = new App();

new ApiGatewayStack(app, "api-gateway", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
