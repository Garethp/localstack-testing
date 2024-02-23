import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AuroraPostgresEngineVersion,
  DatabaseCluster,
  DatabaseClusterEngine,
} from "aws-cdk-lib/aws-rds";
import { InstanceType, Vpc } from "aws-cdk-lib/aws-ec2";

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new DatabaseCluster(this, "DatabaseCluster", {
      engine: DatabaseClusterEngine.auroraPostgres({
        version: AuroraPostgresEngineVersion.VER_16_1,
      }),
      credentials: {
        username: "administrator",
      },
      iamAuthentication: true,
      instanceProps: {
        instanceType: new InstanceType("t3.medium"),
        vpc: new Vpc(this, "VPC"),
      },
    });
  }
}
