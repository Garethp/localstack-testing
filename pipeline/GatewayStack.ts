import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

export class GatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
    });

    const lambda = new Function(this, "lambda-handler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline(
        "exports.handler = async () => ({ statusCode: 201 });",
      ),
      handler: "index.handler",
    });

    api.root.addMethod(
      process.env.DEPLOY_POST ? "GET" : "POST",
      new LambdaIntegration(lambda),
    );
  }
}
