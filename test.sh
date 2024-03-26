#!/bin/bash

CLOUDFRONT_URL=$(awslocal cloudfront list-distributions | jq -r .DistributionList.Items[0].DomainName)
curl "https://$CLOUDFRONT_URL/"

docker-compose down
docker-compose up -d

while [ ! "$(curl -s http://localhost:4566/_localstack/health | jq -c '.services | .[] | test("running|available") | not' | grep "false")" ]; do
  sleep 1
done

sleep 2

CLOUDFRONT_URL=$(awslocal cloudfront list-distributions | jq -r .DistributionList.Items[0].DomainName)
curl "https://$CLOUDFRONT_URL/"
