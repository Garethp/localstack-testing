import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  ARecord,
  PublicHostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  OriginProtocolPolicy,
  OriginRequestPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

export class CloudfrontApiGateway extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = new PublicHostedZone(this, "HostedZone", {
      zoneName: "example.localhost.localstack.cloud",
    });

    const certificate = new Certificate(this, "Example", {
      domainName: "example.localhost.localstack.cloud",
    });

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
      domainName: {
        domainName: "localstack-api-example.localhost.localstack.cloud",
        certificate,
      },
    });

    const distribution = new Distribution(this, "ApiCloudfront", {
      defaultBehavior: {
        origin: new HttpOrigin(
          "localstack-api-example.localhost.localstack.cloud",
          {
            protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
          },
        ),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
      },
      domainNames: ["example.localhost.localstack.cloud"],
      certificate: certificate,
    });

    new ARecord(this, "ARecord", {
      zone: hostedZone,
      recordName: "example.localhost.localstack.cloud.",
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    const responseLambda = new Function(this, "hello-world", {
      runtime: Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: Code.fromInline(
        "exports.handler = async (event) => ({statusCode: 201, body: JSON.stringify(event.queryStringParameters)})",
      ),
    });

    api.root.addMethod("GET", new LambdaIntegration(responseLambda));
  }
}
