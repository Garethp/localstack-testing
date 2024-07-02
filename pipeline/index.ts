import { App } from "aws-cdk-lib";
import { CloudfrontApiGateway } from "./CloudfrontApiGateway";

const app = new App();
new CloudfrontApiGateway(app, "cloudfront-api-gateway", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
