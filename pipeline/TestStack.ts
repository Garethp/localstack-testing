import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PublicHostedZone } from "aws-cdk-lib/aws-route53";

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new PublicHostedZone(this, "HostedZone", {
      zoneName: "test.com",
    });
  }
}
