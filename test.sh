#!/bin/bash

curl -H "authorization: Bearer test" "https://$(awslocal apigateway get-rest-apis | jq .items[0].id -r).execute-api.localhost.localstack.cloud:4566/prod/"
