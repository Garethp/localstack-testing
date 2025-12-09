import { App } from "aws-cdk-lib/core";
import { ApiGatewayStack } from "./ApiGatewayStack";
import { DnsStack } from "./DnsStack";

const app = new App();
new DnsStack(app, "dns-stack", {
  env: {
    account: "000000000000",
    region: "us-east-1",
  },
});

new ApiGatewayStack(app, "api-gateway-stack", {
  env: {
    account: "000000000000",
    region: "us-east-1",
  },
});
