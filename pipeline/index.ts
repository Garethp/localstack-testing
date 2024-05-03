import { App } from "aws-cdk-lib";
import { EC2Stack } from "./EC2Stack";

const app = new App();
new EC2Stack(app, "ec2-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
