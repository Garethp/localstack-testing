import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "test", {
      functionName: "my-function",
      runtime: Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: Code.fromInline(
        "exports.handler = async (event) => { console.log('========= THIS SHOULD NOT RUN ===========')}",
      ),
    });

    new Rule(this, "ScheduleRule", {
      schedule: Schedule.cron({ hour: "5", minute: "0" }),
      targets: [new targets.LambdaFunction(lambda)],
    });

    new StringParameter(this, "Parameter", {
      parameterName: "my-ssm",
      stringValue: "test1",
    });
  }
}
