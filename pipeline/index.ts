import { App } from "aws-cdk-lib";
import { CustomResourceStack } from "./CustomResourceStack";

const app = new App();
new CustomResourceStack(app, "custom-resource-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
