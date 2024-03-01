#!/bin/bash

curl -H "Authorization: Bearer test" "https://$(awslocal cloudfront list-distributions | jq .DistributionList.Items[0].DomainName -r)"
