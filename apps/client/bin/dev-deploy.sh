#! /bin/bash

DIST=./dist

if [ ! -d "$DIST" ]; then
  echo "'$DIST' does not exist. Exiting script."
  exit 1
fi

BUCKET=$(aws ssm get-parameter --name /dev/actions/client/bucketName --output text --query 'Parameter.Value' || echo "Could not retrieve Bucket Name" && exit 1)
CLOUD_FRONT_DISTRIBUTION_ID=$(aws ssm get-parameter --name /dev/actions/client/cloudFrontDistributionId --output text --query 'Parameter.Value' || echo "Could not retrieve CloudFront Distribution Id" && exit 1)
aws s3 sync --delete $DIST s3://$BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUD_FRONT_DISTRIBUTION_ID --paths /*
