import { aws_events_targets, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";

export class LambdaPermissionStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "lambda-handler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline("exports.handler = async () => ({ });"),
      handler: "index.handler",
    });

    new Rule(this, "ScheduleRule", {
      schedule: Schedule.cron({
        hour: process.env.SECOND_RUN ? "7" : "6",
        minute: "0",
        weekDay: "MON-FRI",
      }),
      targets: [new aws_events_targets.LambdaFunction(lambda)],
    });
  }
}
