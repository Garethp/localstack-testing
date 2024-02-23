import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

export class GatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "test-api", {
      restApiName: "test-api",
    });

    const getByIdLambda = new Function(this, "get-by-id-handler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline(
        "exports.handler = async () => ({ statusCode: 200, body: 'Get By Id' });",
      ),
      handler: "index.handler",
    });

    const searchLambda = new Function(this, "search-lambda-handler", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromInline(
        "exports.handler = async () => ({ statusCode: 200, body: 'Search Results' });",
      ),
      handler: "index.handler",
    });

    const documents = api.root.addResource("document");
    const getById = documents.addResource("{documentId+}");
    const search = documents.addResource("search");

    getById.addMethod("GET", new LambdaIntegration(getByIdLambda));
    search.addMethod("GET", new LambdaIntegration(searchLambda));
  }
}
