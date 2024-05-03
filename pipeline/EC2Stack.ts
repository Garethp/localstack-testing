import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  BlockDeviceVolume,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  SecurityGroup,
  Vpc,
} from "aws-cdk-lib/aws-ec2";

export class EC2Stack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "VPC");
    const securityGroup = new SecurityGroup(this, "security-group", { vpc });

    new Instance(this, "EC2", {
      vpc,
      securityGroup,
      machineImage: MachineImage.latestAmazonLinux2023(),
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      blockDevices: [
        {
          deviceName: "/ebs-dev/sda1",
          volume: BlockDeviceVolume.ebs(10),
        },
      ],
    });
  }
}
