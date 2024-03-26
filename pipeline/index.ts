import { App } from "aws-cdk-lib";
import { DnsInjectionStack } from "./DnsInjectionStack";

const app = new App();
new DnsInjectionStack(app, "dns-injection-stack", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
