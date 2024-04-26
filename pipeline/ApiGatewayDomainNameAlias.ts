import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PublicHostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

export class ApiGatewayDomainNameAlias extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = new PublicHostedZone(this, "HostedZone", {
      zoneName: "test.com",
    });

    const certificate = new Certificate(this, "Example", {
      domainName: "example.test.com",
      validation: CertificateValidation.fromDns(hostedZone),
    });

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
      domainName: {
        domainName: "example.test.com",
        certificate,
      },
    });

    const responseLambda = new Function(this, "hello-world", {
      runtime: Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: Code.fromInline(
        "exports.handler = async (event) => ({statusCode: 201, body: JSON.stringify({ Hello: 'World' }) })",
      ),
    });

    api.root.addMethod("GET", new LambdaIntegration(responseLambda));

    new CfnOutput(this, "RestApiDomainNameAlias", {
      value: api.domainName!.domainNameAliasDomainName,
    });
  }
}
