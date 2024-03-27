#!/bin/bash

CLOUDFRONT_URL=$(awslocal cloudfront list-distributions | jq -r .DistributionList.Items[0].DomainName)
curl "https://$CLOUDFRONT_URL/"
