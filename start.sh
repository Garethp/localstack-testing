#!/bin/bash

docker compose down
docker compose up -d

while [ ! "$(curl -s http://localhost:4566/_localstack/health | jq -c '.services | .[] | test("running|available") | not' | grep "false")" ]; do
  sleep 1
done

yarn cdklocal bootstrap
yarn cdklocal deploy dns-stack --require-approval never
yarn cdklocal deploy api-gateway-stack --require-approval never

./test.sh
