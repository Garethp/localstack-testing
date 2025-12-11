import { Stack, StackProps } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { PublicHostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    if (!!process.env.SECOND_DEPLOY) return;

    // const hostedZone = new PublicHostedZone(this, "HostedZone", {
    //   zoneName: "localhost.localstack.cloud",
    // });

    const certificate = new Certificate(this, "Certificate", {
      domainName: "example.localhost.localstack.cloud",
      // validation: CertificateValidation.fromDns(hostedZone),
    });

    const api = new RestApi(this, "RestApi", {
      restApiName: "test-api",
      domainName: {
        domainName: "example.localhost.localstack.cloud",
        certificate,
      },
    });
    api.root.addMethod("GET");
  }
}
