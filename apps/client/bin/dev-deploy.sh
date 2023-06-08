#! /bin/bash

DIST=./dist

if [ ! -d "$DIST" ]; then
  echo "'$DIST' does not exist. Exiting script."
  exit 1
fi

BUCKET=$(aaws ssm get-parameter --name /dev/actions/client/bucketName)
CLOUD_FRONT_DISTRIBUTION_ID=$(aws ssm get-parameter --name /dev/actions/client/cloudFrontDistributionId ||  && exit 1)
aws s3 sync --delete $DIST s3://$BUCKET
aws cloudfront create-invalidation --distribution-id $CLOUD_FRONT_DISTRIBUTION_ID --paths /*
