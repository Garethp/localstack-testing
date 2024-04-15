import { App } from "aws-cdk-lib";
import { ProviderStack, ConsumerStack } from "./Stacks";

const app = new App();

new ProviderStack(app, "provider", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});

new ConsumerStack(app, "consumer", {
  env: {
    account: "000000000000",
    region: "eu-west-2",
  },
});
