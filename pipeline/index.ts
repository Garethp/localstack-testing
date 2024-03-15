import { App } from "aws-cdk-lib";
import { SSMStack } from "./SSMStack";

const app = new App();
new SSMStack(app, "ssm-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
