#!/bin/bash

GATEWAY_ID=$(awslocal apigateway get-rest-apis --query "items[0].id" --output text)
curl https://$GATEWAY_ID.execute-api.localhost.localstack.cloud:4566/prod/
