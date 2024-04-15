import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Vpc } from "aws-cdk-lib/aws-ec2";

export class ProviderStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const queue = new Queue(this, "Queue");

    new StringParameter(this, "QueueArn", {
      stringValue: queue.queueArn,
      parameterName: "queue-arn",
    });
  }
}

export class ConsumerStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new Vpc(this, "Vpc");

    const queueArn = StringParameter.valueForStringParameter(this, "queue-arn");
    Queue.fromQueueArn(this, "Queue", queueArn);
  }
}
