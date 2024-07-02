#!/bin/bash

output=$(curl "https://example.localhost.localstack.cloud/?test=test")

echo $output

if [ "$output" == "null" ]; then
  echo "Expected queryStringParameters of test=test to be passed back. Received nothing"
fi
