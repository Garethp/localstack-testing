import { App } from "aws-cdk-lib";
import { DatabaseStack } from "./DatabaseStack";

const app = new App();
new DatabaseStack(app, "database-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
