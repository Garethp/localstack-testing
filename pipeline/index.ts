import { App } from "aws-cdk-lib";
import { GatewayStack } from "./GatewayStack";
import { VpcStack } from "./VpcStack";

const app = new App();

const vpcStack = new VpcStack(app, "vpc-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});

const gatewayStack = new GatewayStack(app, "gateway-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});

gatewayStack.addDependency(vpcStack);
