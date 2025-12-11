import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Effect, PolicyDocument, PolicyStatement } from "aws-cdk-lib/aws-iam";

export class ApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "RestApi", {
      policy: new PolicyDocument({
        statements: !process.env.SECOND_DEPLOY
          ? []
          : [
              new PolicyStatement({
                effect: Effect.ALLOW,
                resources: ["*"],
                actions: ["*"],
              }),
            ],
      }),
    });

    api.root.addMethod("GET");
  }
}
