#! /bin/bash

aws s3 sync --delete ./dist s3://dev-ash-actions-monorepo
aws cloudfront create-invalidation --distribution-id E1EMJ7IEHO56RP --paths /index.html
