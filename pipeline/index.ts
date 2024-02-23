import { App } from "aws-cdk-lib";
import { BucketStack } from "./BucketStack";

const app = new App();
new BucketStack(app, "test-bucket-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
