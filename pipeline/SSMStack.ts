import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class SSMStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    if (!process.env.CHANGE) {
      new StringParameter(this, "test", {
        stringValue: "some-test",
        parameterName: "some-test-parameter",
      });
    } else {
      new StringParameter(this, "test2", {
        stringValue: "some-test2",
        parameterName: "some-test-parameter2",
      });
    }
  }
}
