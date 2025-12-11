import { App } from "aws-cdk-lib/core";
import { BucketStack } from "./BucketStack";

const app = new App();

new BucketStack(app, "BucketStack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
