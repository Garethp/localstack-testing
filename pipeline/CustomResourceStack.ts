import { CustomResource, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function, Runtime, RuntimeFamily } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export class CustomResourceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "CustomResourceLambda", {
      code: Code.fromInline(`
        const { CloudFormationClient, UpdateTerminationProtectionCommand } = require("@aws-sdk/client-cloudformation");
      
        exports.handler = async (event) => {
            if (event.RequestType == "Delete") return;
            
            const client = new CloudFormationClient({ region: "eu-west-2" });
          const command = new UpdateTerminationProtectionCommand({
            EnableTerminationProtection: true,
            StackName: event.StackId,
          });
          
          await client.send(command);
          
          return {};
        }
      `),
      handler: "index.handler",
      runtime: new Runtime("nodejs18.x", RuntimeFamily.NODEJS, {
        supportsInlineCode: true,
      }),
    });

    lambda.addToRolePolicy(
      new PolicyStatement({
        resources: [
          `arn:aws:cloudformation:${props.env!.region}:${props.env!.account}:stack/custom-resource-stack/*`,
        ],
        actions: ["cloudformation:UpdateTerminationProtection"],
        effect: Effect.ALLOW,
      }),
    );

    const provider = new Provider(this, "CustomResourceProvider", {
      onEventHandler: lambda,
    });

    new CustomResource(this, "CustomResource", {
      serviceToken: provider.serviceToken,
      properties: {},
    });
  }
}
