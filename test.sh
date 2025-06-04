#!/bin/bash

awslocal ssm put-parameter --name my-ssm --value test2 --overwrite

sleep 5

LOGS_OUTPUT=$(docker-compose logs | grep "SHOULD NOT RUN")
if [[ -n "$LOGS_OUTPUT" ]]; then
  echo "Scheduled function was executed"
  echo $LOGS_OUTPUT
  exit 1;
fi
