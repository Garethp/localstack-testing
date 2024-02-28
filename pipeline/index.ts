import { App } from "aws-cdk-lib";
import { GatewayStack } from "./GatewayStack";

const app = new App();
new GatewayStack(app, "gateway-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
