import { App } from "aws-cdk-lib";
import { ApiGatewayDomainNameAlias } from "./ApiGatewayDomainNameAlias";

const app = new App();
new ApiGatewayDomainNameAlias(app, "dns-alias-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
