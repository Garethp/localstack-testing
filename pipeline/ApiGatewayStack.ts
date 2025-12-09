import { Construct } from "constructs";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Stack, StackProps } from "aws-cdk-lib/core";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZoneId = StringParameter.fromStringParameterName(
      this,
      "HostedZoneId",
      "HostedZoneId",
    );

    const certificateArn = StringParameter.fromStringParameterName(
      this,
      "certificateArn",
      "CertificateArn",
    );

    const certificate = Certificate.fromCertificateArn(
      this,
      "Certificate",
      certificateArn.stringValue,
    );

    const hostedZone = HostedZone.fromHostedZoneAttributes(
      this,
      "RetrievedZone",
      {
        hostedZoneId: hostedZoneId.stringValue,
        zoneName: "localhost.localstack.cloud",
      },
    );

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
      domainName: {
        domainName: "example.localhost.localstack.cloud",
        certificate,
      },
    });

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new HttpOrigin("example.localhost.localstack.cloud", {}),
      },
      domainNames: ["example.localhost.localstack.cloud"],
      certificate,
    });

    new ARecord(this, "ARecord", {
      recordName: "example.localhost.localstack.cloud.",
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    const responseLambda = new Function(this, "hello-world", {
      runtime: Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: Code.fromInline(
        "exports.handler = async (event) => ({statusCode: 201, body: JSON.stringify({ Hello: 'World' }) })",
      ),
    });

    api.root.addMethod("GET", new LambdaIntegration(responseLambda));
  }
}
