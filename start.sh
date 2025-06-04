#!/bin/bash

LOCALSTACK_VERSION=$(cat docker-compose.yml | sed -nE 's/image: localstack\/localstack-pro:([0-9.]+)/\1/p' | xargs)

docker-compose down
docker pull localstack/localstack-pro:$LOCALSTACK_VERSION
docker-compose up -d

sleep 5

yarn cdklocal bootstrap
yarn cdklocal deploy --all --require-approval never

./test.sh
