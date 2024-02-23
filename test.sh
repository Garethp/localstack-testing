#!/bin/bash

yarn ts-node test.ts

echo "The following files are in the S3 Bucket"
awslocal s3 ls test-bucket
