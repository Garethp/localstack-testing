import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Vpc } from "aws-cdk-lib/aws-ec2";

export class GatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, "VPC", {
      vpcName: "predefined_vpc",
    });

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
    });

    const getByIdLambda = new Function(this, "get-by-id-handler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline(
        "exports.handler = async () => ({ statusCode: 200, body: 'Get By Id' });",
      ),
      handler: "index.handler",
      vpc,
    });

    api.root.addMethod("GET", new LambdaIntegration(getByIdLambda));
  }
}
