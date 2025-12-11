import { Stack, StackProps } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    if (!!process.env.SECOND_DEPLOY) return;

    const certificate = new Certificate(this, "Certificate", {
      domainName: "example.localhost.localstack.cloud",
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
