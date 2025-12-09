import { Stack, StackProps } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { PublicHostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class DnsStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = new PublicHostedZone(this, "HostedZone", {
      zoneName: "localhost.localstack.cloud",
    });

    const certificate = new Certificate(this, "Example", {
      domainName: "example.localhost.localstack.cloud",
      validation: CertificateValidation.fromDns(hostedZone),
    });

    new StringParameter(this, "ZoneIdParameter", {
      parameterName: "HostedZoneId",
      stringValue: hostedZone.hostedZoneId,
    });

    new StringParameter(this, "CertificateArnParameter", {
      parameterName: "CertificateArn",
      stringValue: certificate.certificateArn,
    });
  }
}
