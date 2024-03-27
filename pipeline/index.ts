import { App } from "aws-cdk-lib";
import { DnsAliasStack } from "./DnsAliasStack";

const app = new App();
new DnsAliasStack(app, "dns-alias-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
