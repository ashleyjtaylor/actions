#! /bin/bash

DIST=./dist

# if [[ "$GITHUB_ACTIONS" == "true" ]]; then
#   DIST=apps/client/dist
# fi

if [ ! -d "$DIST" ]; then
  echo "'$DIST' does not exist. Exiting script."
  exit 1
fi

aws s3 sync --delete $DIST s3://dev-ash-actions-monorepo
aws cloudfront create-invalidation --distribution-id E1EMJ7IEHO56RP --paths /*
