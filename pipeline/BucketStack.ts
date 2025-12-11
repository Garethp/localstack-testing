import { Stack, StackProps } from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

export class BucketStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket");

    if (!!process.env.SECOND_DEPLOYMENT) return;

    new BucketDeployment(this, "Deployment", {
      sources: [Source.asset("./pipeline")],
      destinationBucket: bucket,
    });
  }
}
