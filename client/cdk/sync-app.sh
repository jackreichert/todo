#!/bin/sh
bucket_link=$(jq -r '.TodoDemoApp.BucketLink' cdk-outputs.json)
bucket_name=$(echo "${bucket_link}" | sed 's/\.s3\.amazonaws\.com$//')
sync_command="aws s3 sync ../dist/ s3://${bucket_name}"
echo "Running sync command: ${sync_command}"
$sync_command
