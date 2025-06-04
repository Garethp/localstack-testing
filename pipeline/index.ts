import { App } from "aws-cdk-lib";
import { TestStack } from "./TestStack";

const app = new App();
new TestStack(app, "test-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
